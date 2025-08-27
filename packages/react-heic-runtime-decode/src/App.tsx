import React, { useRef } from 'react';
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
import { HeicImage } from './HeicImage.jsx';

const GRID_SIZE = 5;

const baseImageUrls = [
  Image1Heic,
  Image2Heic,
  Image3Heic,
  Image4Heic,
  Image5Heic,
  Image6Heic,
  Image7Heic,
  Image8Heic,
];
const App: React.FC = () => {
  const imageGridRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const zoomInputRef = useRef<HTMLInputElement>(null);
  const scale = useRef(1);
  const offsetX = useRef(0);
  const offsetY = useRef(0);

  const imageUrls = Array.from({ length: GRID_SIZE * GRID_SIZE }).map(
    (_, i) => baseImageUrls[i % baseImageUrls.length]
  );

  function updateTransform() {
    if (imageGridRef.current) {
      imageGridRef.current.style.transform = `scale(${scale.current}) translate(${offsetX.current}px, ${offsetY.current}px)`;
    }
  }

  function animate() {
    scale.current -= 0.001;
    zoomInputRef.current && (zoomInputRef.current.value = scale.current.toString());
    updateTransform();

    if (scale.current > 0.15) {
      animationFrameId.current = requestAnimationFrame(animate);
    } else {
      scale.current = 0.15;
      updateTransform();
    }
  }

  function handleAnimateClick() {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    scale.current = 1;
    offsetX.current = 0;
    offsetY.current = 0;
    updateTransform();
    animationFrameId.current = requestAnimationFrame(animate);
  }

  return (
    <div className='App'>
      <div
        ref={imageGridRef}
        className='image-grid'
      >
        {imageUrls.map((url, index) => (
          <div className='image-container' key={index}>
            <HeicImage src={url} />
          </div>
        ))}
      </div>
      <input
        type="range"
        min="0.1"
        max="2"
        step="0.01"
        defaultValue={scale.current}
        onChange={(e) => {
          scale.current = parseFloat(e.target.value);
          updateTransform();
        }}
        className="slider horizontal"
        ref={zoomInputRef}
      />
      <input
        type="range"
        min="-2000"
        max="2000"
        defaultValue={offsetX.current}
        onChange={(e) => {
          offsetX.current = parseInt(e.target.value, 10);
          updateTransform();
        }}
        className="slider horizontal"
      />
      <input
        type="range"
        min="-2000"
        max="20500"
        defaultValue={offsetY.current}
        onChange={(e) => {
          offsetY.current = parseInt(e.target.value, 10);
          updateTransform();
        }}
        className="slider vertical"
      />
      <button onClick={handleAnimateClick} className="animate-button">
        Animate
      </button>
    </div>
  );
};

export default App;
