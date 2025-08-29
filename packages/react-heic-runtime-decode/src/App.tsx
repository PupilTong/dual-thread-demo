import React, { useState } from 'react';
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
const offsetStep = 1 / 16;
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
const animationDelayMatrix = [
  [0, 1, 2, 3, 4],
  [15, 0, 0, 0, 5],
  [14, 0, 0, 0, 6],
  [13, 0, 0, 0, 7],
  [12, 11, 10, 9, 8]
];

const imageUrls = Array.from({ length: GRID_SIZE * GRID_SIZE }).map(
  (_, i) => baseImageUrls[i % baseImageUrls.length]
);
const App: React.FC = () => {
  const [images, setImages] = useState(new Array(GRID_SIZE * GRID_SIZE).fill(null));
  function handleAnimateClick() {
    setImages(new Array(GRID_SIZE * GRID_SIZE).fill(null));
    setTimeout(() => {
      setImages(imageUrls);
    }, 100);
  }

  return (
    <div className='App'>
      <div
        className='image-grid'
      >
        {images.map((url, index) => {
          const row = Math.floor(index / GRID_SIZE);
          const col = index % GRID_SIZE;
          const isEdge = row === 0 || row === GRID_SIZE - 1 || col === 0 || col === GRID_SIZE - 1;
          const delay = animationDelayMatrix[row]![col]! * offsetStep;
          return isEdge ?
            <div className='image-container' key={index} style={{ animation: isEdge ? undefined : 'none', animationDelay: `${isEdge ? delay : 0}s` }}>
              <HeicImage src={isEdge ? url : undefined}/>
            </div>
            :
            <div className='image-container' style={{animation: 'none'}}></div>
        })}
      </div>
      <button onClick={handleAnimateClick} className="animate-button">
        Restart
      </button>
    </div>
  );
};

export default App;
