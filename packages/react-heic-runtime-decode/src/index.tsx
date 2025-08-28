import ReactDOM from 'react-dom/client';
import App from './App.jsx';
const rootDom = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootDom);
rootDom.style.height = '100vh';
rootDom.style.width = '100vw';

root.render(
  <App />,
);
