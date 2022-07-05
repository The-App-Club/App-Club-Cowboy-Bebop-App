import {useEffect, useState} from 'react';
import {Image} from './Image';
import {css} from '@emotion/css';

const Pane4 = () => {
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
  // const title = 'CowboyBebop is Awesome Anime';
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        className={css`
          display: flex;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-basis: 50%;
            align-items: ${hide ? 'flex-start' : 'flex-end'};
            flex-direction: column;
          `}
        >
          {[...title].map((c, index) => {
            return (
              <Image
                key={index}
                index={index}
                hide={hide}
                duration={1200}
                src={`https://media.giphy.com/media/3XUbDJ3rPBK1y/giphy.gif`}
                delay={100 * (index + 1)}
                title={title}
                reverse={false}
                size={2}
              />
            );
          })}
        </div>
        <div
          className={css`
            display: flex;
            flex-basis: 50%;
            align-items: ${hide ? 'flex-end' : 'flex-start'};
            flex-direction: column;
          `}
        >
          {[...title].map((c, index) => {
            return (
              <Image
                key={index}
                index={index}
                hide={hide}
                duration={1200}
                src={`https://media.giphy.com/media/3XUbDJ3rPBK1y/giphy.gif`}
                delay={100 * (index + 1)}
                title={title}
                reverse={false}
                size={2}
              />
            );
          })}
        </div>
      </div>
      <div
        className={css`
          display: flex;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-basis: 50%;
            align-items: ${hide ? 'flex-start' : 'flex-end'};
            flex-direction: column-reverse;
          `}
        >
          {[...title].map((c, index) => {
            return (
              <Image
                key={index}
                index={index}
                hide={hide}
                duration={1200}
                src={`https://media.giphy.com/media/3XUbDJ3rPBK1y/giphy.gif`}
                delay={100 * (index + 1)}
                title={title}
                reverse={true}
                size={2}
              />
            );
          })}
        </div>
        <div
          className={css`
            display: flex;
            flex-basis: 50%;
            align-items: ${hide ? 'flex-end' : 'flex-start'};
            flex-direction: column-reverse;
          `}
        >
          {[...title].map((c, index) => {
            return (
              <Image
                key={index}
                index={index}
                hide={hide}
                duration={1200}
                src={`https://media.giphy.com/media/3XUbDJ3rPBK1y/giphy.gif`}
                delay={100 * (index + 1)}
                title={title}
                reverse={true}
                size={2}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export {Pane4};
