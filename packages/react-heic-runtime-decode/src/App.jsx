import { useState } from 'react';
import './App.css';
import { Button } from './Button.jsx';
import { createHEICImage } from 'heic-image';
import { createLottieGrid } from 'lottie-grid';
import { getImageUrls } from '../../../images/images.js';
const GRID_SIZE = 5;

const App = () => {
  const [_, reload] = useState([]);
  function handleRestart() {
    reload([]);
  }
  return (
    <div className='App'>
      <LottieGrid
        size={GRID_SIZE}
        render={({ i }) => <HEICImage src={getImageUrls(i)} />}
      />
      <Button onClick={handleRestart}>RESTART</Button>
    </div>
  );
};

export default App;

const Container = ({ children, ...props }) => <div {...props}>{children}</div>;
const ImageRender = (props) => <img {...props} />;
const HEICImage = createHEICImage(Container, ImageRender);
const LottieGrid = createLottieGrid(Container);
