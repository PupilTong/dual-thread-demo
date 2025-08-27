import { useState, useEffect, useMemo } from 'react';
// @ts-expect-error
import libheif from 'libheif-js';
import type { JSX } from 'react';
import { useInView } from 'react-intersection-observer';

interface HeicImageProps {
  src: string | null;
}

export const HeicImage = ({
  src: srcProps,
}: HeicImageProps): JSX.Element => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: false,
  });
  const src = useMemo(() => {
    if (inView) {
      return srcProps;
    }
    return null;
  }, [inView, srcProps]);

  useEffect(() => {
    if (src) {
      let revoked = false;
      const decodeImage = async () => {
        const decoder = new libheif.HeifDecoder();
        const buffer = await fetch(src).then((response) =>
          response.arrayBuffer(),
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
          if (!revoked) {
            setImageSrc(imageUrl);
          }
          resolve(null);
        });
        await promise;
      };

      decodeImage();

      return () => {
        revoked = true;
        if (imageSrc) {
          URL.revokeObjectURL(imageSrc);
        }
      };
    } else {
      setImageSrc(null);
    }
  }, [src]);
  return <div ref={ref} className='image-container'>
    {
      imageSrc ? <img className={'skeleton'} src={imageSrc} /> : <div className={'skeleton'}></div>
    }
  </div>;
};
