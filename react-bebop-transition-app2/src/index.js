import {createRoot} from 'react-dom/client';
import './index.css';
import {Bebop} from './components/Bebop';

const App = () => {
  return <Bebop />;
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
