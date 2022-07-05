import {createRoot} from 'react-dom/client';
import './index.css';
import {css} from '@emotion/css';
import {Box} from './components/Box';

const App = () => {
  return <Box width={280} height={280} />;
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
