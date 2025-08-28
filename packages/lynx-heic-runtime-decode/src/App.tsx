import { useState } from '@lynx-js/react';
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

const GRID_SIZE = 4;
const offsetStep = 1 / 12;
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
  [0, 1, 2, 3,],
  [11, 0, 0, 4,],
  [10, 0, 0, 5],
  [9, 8, 7, 6]
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
    <view className='App'>
      <view
        className='image-grid'
      >
        {images.map((url, index) => {
          const row = Math.floor(index / GRID_SIZE);
          const col = index % GRID_SIZE;
          const isEdge = row === 0 || row === GRID_SIZE - 1 || col === 0 || col === GRID_SIZE - 1;
          const delay = animationDelayMatrix[row]![col]! * offsetStep;
          return isEdge ?
            <view className='image-container' key={index} style={{ animation: isEdge ? undefined : 'none', animationDelay: `${isEdge ? delay : 0}s` }}>
              <HeicImage src={isEdge ? url : undefined}/>
            </view>
            :
            <view className='image-container' style={{animation: 'none'}}></view>
        })}
      </view>
      <view bindtap={handleAnimateClick} className="animate-button" style={{justifyContent:'center',flexDirection: 'row',display:'flex', alignItems: 'center'}}>
        <text >
          Restart
        </text>
      </view>
    </view>
  );
};

export default App;
