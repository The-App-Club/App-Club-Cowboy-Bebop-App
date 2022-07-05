import {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {Pane4} from './components/Pane4';
import {Left2Right} from './components/Left2Right';
import {Right2Left} from './components/Right2Left';
import {Center2Side} from './components/Center2Side';
import {Top2Bottom} from './components/Top2Bottom';
import {Bottom2Top} from './components/Bottom2Top';
import {Image} from './components/Image';
import {css} from '@emotion/css';
import {Image4} from './components/Image4';

const App = () => {
  const [hide, setHide] = useState(false);

  const handleClick = () => {
    setHide((show) => {
      return !show;
    });
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const title = 'CowboyBebop';

  return (
    <div
      className={css`
        width: 100vw;
        height: 100vh;
        display: grid;
        place-items: center;
      `}
    >
      <div
        className={css`
          position: relative;
          width: 300px;
          height: 300px;
          border: 3px solid rgb(6, 46, 82);
        `}
      >
        <Image4
          src={'https://media.giphy.com/media/ZEKviB6cPmM5a/giphy.gif'}
          delay={100}
          duration={3300}
        />
      </div>
    </div>

    // <Top2Bottom />
    // <Bottom2Top />
    // <Left2Right />
    // <Right2Left />
    // <Center2Side />
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
