import React, { useState, useEffect, useRef } from 'react';
import './App.css';
// @ts-expect-error
import Image1Heic from '../images/1.heic';
// @ts-expect-error
import Image2Heic from '../images/2.heic';
// @ts-expect-error
import Image3Heic from '../images/3.heic';
// @ts-expect-error
import Image4Heic from '../images/4.heic';
// @ts-expect-error
import Image5Heic from '../images/5.heic';
// @ts-expect-error
import Image6Heic from '../images/6.heic';
// @ts-expect-error
import Image7Heic from '../images/7.heic';
// @ts-expect-error
import Image8Heic from '../images/8.heic';
// @ts-expect-error
import libheif from 'libheif-js';

const imageCount = 8;

const App: React.FC = () => {
  const [imageSrcs, setImageSrcs] = useState<(string | null)[]>(
    Array(imageCount).fill(null),
  );
  const [bgColor] = useState('#ffffff');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentScrollY = useRef(0);
  const prevTime = useRef(0);

  function animator(time: number) {
    if (prevTime.current === 0) {
      prevTime.current = time;
      requestAnimationFrame(animator);
    } else {
      const deltaTime = time - prevTime.current;
      prevTime.current = time;
      if (scrollContainerRef.current) {
        if (currentScrollY.current > -500) {
          currentScrollY.current -= deltaTime * 0.05;
          scrollContainerRef.current.style.transform =
            `translateY(${currentScrollY.current}px)`;
          requestAnimationFrame(animator);
        }
      }
    }
  }

  useEffect(() => {
    requestAnimationFrame(animator);
  }, []);

  useEffect(() => {
    const decodeImages = async () => {
      const imageUrls = [
        Image1Heic,
        Image2Heic,
        Image3Heic,
        Image4Heic,
        Image5Heic,
        Image6Heic,
        Image7Heic,
        Image8Heic,
      ];
      for (let index = 0; index < imageUrls.length; index++) {
        const url = imageUrls[index];
        const decoder = new libheif.HeifDecoder();
        const buffer = await fetch(url).then((response) =>
          response.arrayBuffer()
        );
        const [image] = decoder.decode(buffer);
        const width = image.get_width();
        const height = image.get_height();
        const data = new Uint8ClampedArray(width * height * 4);
        const { promise, resolve } = Promise.withResolvers();
        image.display({ data, width, height }, async () => {
          const newImage = new ImageData(data, width, height);
          const offscreenCanvas = new OffscreenCanvas(width, height);
          const ctx = offscreenCanvas.getContext('2d');
          ctx?.putImageData(newImage, 0, 0);
          const blob = await offscreenCanvas.convertToBlob();
          const imageUrl = URL.createObjectURL(blob);
          image.free();
          imageSrcs[index] = imageUrl;
          setImageSrcs([...imageSrcs]);
          resolve(null);
        });
        await promise;
      }
    };

    decodeImages();
    return () => {
      imageSrcs.forEach((src) => {
        src && URL.revokeObjectURL(src as string);
      });
    };
  }, []);

  return (
    <div className='App' style={{ backgroundColor: bgColor }}>
      <div className='image-grid' ref={scrollContainerRef}>
        {imageSrcs.map((_, index) => (
          <div key={index} className='image-container'>
            {imageSrcs[index]
              ? (
                <img
                  className='skeleton'
                  src={imageSrcs[index] as string}
                  alt={`heic-image-${index}`}
                />
              )
              : <div className='skeleton'></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
