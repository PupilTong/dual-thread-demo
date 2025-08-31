import ReactDOM from 'react-dom/client';
import App from './App.jsx';
const rootDom = document.getElementById('root');
const root = ReactDOM.createRoot(rootDom);
import "fps-meter";
document.body.style.backgroundColor = '#191d24';
document.body.style.display = 'flex';
document.body.style.justifyContent = 'center';
rootDom.style.height = '80vh';
rootDom.style.width = '90vw';
rootDom.style.display = 'flex';

root.render(
  <App />,
);