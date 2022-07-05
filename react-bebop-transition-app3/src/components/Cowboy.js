import {useEffect, useState} from 'react';
import {css} from '@emotion/css';
import {keyframes} from '@emotion/react';

import {Image as Pane1} from './Image';

const a = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width:100%;
  }
`;

const b = keyframes`
  0% {
    width:100%;
  }
  100% {
    width: 0%;
  }
`;

const Cowboy = () => {
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

  const title =
    'CowboyBebopCowboyBebopCowboyBebopCowboyBebopCowboyBebopCowboyBebop';

  return (

      <div
        className={css`
          position: relative;
          /* width: 100%;
          height: 100%; */
          width: 300px;
          height: 300px;
          border: 1px solid rgb(6, 46, 82);
        `}
      >
        {[...title].map((c, index) => {
          return (
            <Pane1
              key={index}
              keyframes={b}
              hide={hide}
              duration={4200}
              delay={200 * index}
              // src={`https://media.giphy.com/media/3XUbDJ3rPBK1y/giphy.gif`}
              title={title}
              className={css`
                position: absolute;
                top: ${index * (100 / title.length)}%;
                left: 0%;
                height: ${100 / title.length}%;
                background: linear-gradient(
                  135deg,
                  rgba(252, 190, 27, 1) 40%,
                  rgba(255, 237, 130, 1) 92%
                );
              `}
            />
          );
        })}

        {[...title].map((c, index) => {
          return (
            <Pane1
              key={index}
              keyframes={a}
              hide={hide}
              duration={4200}
              delay={200 * index}
              // src={`https://media.giphy.com/media/3XUbDJ3rPBK1y/giphy.gif`}
              title={title}
              className={css`
                position: absolute;
                top: ${index * (100 / title.length)}%;
                right: 0%;
                height: ${100 / title.length}%;
                background: linear-gradient(
                  135deg,
                  rgba(48, 109, 176, 1) 40%,
                  rgba(80, 200, 238, 1) 92%
                );
              `}
            />
          );
        })}
      </div>
  );
};

export {Cowboy};
