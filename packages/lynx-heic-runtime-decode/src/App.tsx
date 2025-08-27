import { useState, useCallback, useMainThreadRef } from '@lynx-js/react';
import type { MainThread } from '@lynx-js/types';
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
  const imageGridRef = useMainThreadRef<MainThread.Element>(null);
  const animationFrameId = useMainThreadRef<number | null>(null);
  const zoomInputRef = useMainThreadRef<MainThread.Element>(null);
  const scale = useMainThreadRef(1);
  const offsetX = useMainThreadRef(0);
  const offsetY = useMainThreadRef(0);

  const imageUrls = Array.from({ length: GRID_SIZE * GRID_SIZE }).map(
    (_, i) => baseImageUrls[i % baseImageUrls.length]
  );

  function updateTransform() {
    'main thread';
    if (imageGridRef.current) {
      imageGridRef.current.setStyleProperty('transform', `scale(${scale.current}) translate(${offsetX.current}px, ${offsetY.current}px)`);
    }
  }

  function animate() {
    'main thread';
    scale.current -= 0.001;
    updateTransform();
    zoomInputRef.current && zoomInputRef.current.setAttribute('value', scale.current.toString());

    if (scale.current > 0.15) {
      animationFrameId.current = requestAnimationFrame(animate);
    } else {
      scale.current = 0.15;
      updateTransform();
    }
  }

  function handleAnimateClick() {
    'main thread';
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
    <view className='App'>
      <view
        main-thread:ref={imageGridRef}
        className='image-grid'
      >
        {imageUrls.map((url, index) => (
          <view className='image-container' key={index}>
            <HeicImage src={url} />
          </view>
        ))}
      </view>
      <input
        type="range"
        min="0.1"
        max="2"
        step="0.01"
        main-thread:ref={zoomInputRef}
        main-thread:bindinput={(e) => {
          'main thread';
          const value = e.detail?.value;
          if (value) {
            scale.current = value;
            updateTransform();
          }
        }}
        className="slider horizontal"
      />
      <input
        type="range"
        min="-2000"
        max="2000"      
        main-thread:bindinput={(e) => {
          'main thread';
          const value = e.detail?.value;
          if (value) {
            offsetX.current = parseInt(value, 10);
            updateTransform();
          }
        }}
        className="slider horizontal"
      />
      <input
        type="range"
        min="-2000"
        max="20500"
        main-thread:bindinput={(e) => {
          'main thread';
          const value = e.detail?.value;
          if (value) {
            offsetY.current = parseInt(value, 10);
            updateTransform();
          }
        }}
        className="slider vertical"
      />
      <view main-thread:bindtap={handleAnimateClick} className="animate-button" style={{justifyContent:'center'}}>
        <text >
          Animate
        </text>
      </view>
    </view>
  );
};

export default App;
