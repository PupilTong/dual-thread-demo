import { useState } from 'react';
import './App.css';
import { Button } from './Button.jsx';
import { createHEICImage } from 'heic-image';
import { createLottieGrid } from 'lottie-grid';
import { getImageUrls } from '../../../images/images.js';
const GRID_SIZE = 5;
const isLynxWeb = SystemInfo.platform === 'web';
const App = () => {
  const [_, reload] = useState([]);
  function handleRestart() {
    reload([]);
  }
  return (
    <view className='App'>
      <LottieGrid
        size={GRID_SIZE}
        render={({ i }) =>
          isLynxWeb
            ? <HEICImage src={getImageUrls(i)} />
            : <image className='image' src={getImageUrls(i)} />}
      />
      <Button onClick={handleRestart}>
        RESTART
      </Button>
    </view>
  );
};

export default App;

const Container = ({ children, ...props }) => <view {...props}>{children}
</view>;
const ImageRender = (props) => <image {...props} />;
const HEICImage = createHEICImage(Container, ImageRender);
const LottieGrid = createLottieGrid(Container);
