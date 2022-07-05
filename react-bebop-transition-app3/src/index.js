import {createRoot} from 'react-dom/client';
import './index.css';
import {Cowboy} from './components/Cowboy';
import {Bebop} from './components/Bebop';
import {css} from '@emotion/css';

const App = () => {
  return (
    <div
      className={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
      {[...Array(10)].map((n, index) => {
        return <Cowboy key={index} />;
      })}
      {[...Array(10)].map((n, index) => {
        return <Bebop key={index} />;
      })}
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
