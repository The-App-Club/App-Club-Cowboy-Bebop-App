import {useEffect, useState} from 'react';
import {css} from '@emotion/css';
import {keyframes} from '@emotion/react';

import {Image as Pane1} from './Image';
import {Image as Pane2} from './Image';
import {Image as Pane3} from './Image';
import {Image as Pane4} from './Image';

const a = keyframes`
  0% {
    width: 100%;
    height:0%;
  }
  100% {
    width: 0%;
    height:100%;
  }
`;

const b = keyframes`
    0% {
    width: 0%;
    height:100%;
  }
  100% {
    width: 100%;
    height: 0%;
  }
`;

const c = keyframes`
  0% {
    width: 100%;
    height: 0%;
  }
  100% {
    width: 0%;
    height:100%;
  }
`;

const d = keyframes`
  0% {
    width: 0%;
    height:100%;
  }
  100% {
    width: 100%;
    height: 0%;
  }
`;

const Bebop = () => {
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
          width: 100%;
          height: 100%;
          /* width: 300px;
          height: 300px; */
          border: 1px solid rgb(6, 46, 82);
          background-image: url(https://media.giphy.com/media/ZEKviB6cPmM5a/giphy.gif);
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center center;
        `}
      >
        <Pane1
          keyframes={a}
          hide={hide}
          duration={3200}
          src={`https://media.giphy.com/media/3XUbDJ3rPBK1y/giphy.gif`}
          title={title}
          className={css`
            position: absolute;
            top: 0;
            left: 0;
            border-bottom: 1px solid rgb(6, 46, 82);
            border-right: 1px solid rgb(6, 46, 82);
          `}
        />
        <Pane2
          keyframes={b}
          hide={hide}
          duration={3200}
          src={`https://media.giphy.com/media/4ilFRqgbzbx4c/giphy.gif`}
          title={title}
          className={css`
            position: absolute;
            top: 0;
            right: 0;
            border-left: 1px solid rgb(6, 46, 82);
            border-bottom: 1px solid rgb(6, 46, 82);
          `}
        />
        <Pane3
          keyframes={c}
          hide={hide}
          duration={3200}
          src={`https://media.giphy.com/media/10VjiVoa9rWC4M/giphy.gif`}
          title={title}
          className={css`
            position: absolute;
            bottom: 0;
            right: 0;
            border-top: 1px solid rgb(6, 46, 82);
            border-left: 1px solid rgb(6, 46, 82);
          `}
        />
        <Pane4
          keyframes={d}
          hide={hide}
          duration={3200}
          src={`https://media.giphy.com/media/keQzShjfEbddu/giphy.gif`}
          title={title}
          className={css`
            position: absolute;
            bottom: 0;
            left: 0;
            border-top: 1px solid rgb(6, 46, 82);
            border-right: 1px solid rgb(6, 46, 82);
          `}
        />
      </div>
    </div>
  );
};

export {Bebop};
