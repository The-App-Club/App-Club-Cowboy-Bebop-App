import {useEffect, useState} from 'react';
import {Image3} from './Image3';
import {css} from '@emotion/css';

const Bottom2Top = () => {
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
        display: flex;
        align-items: ${hide ? 'flex-start' : 'flex-end'};
        flex-direction: column;
      `}
    >
      {[...title].map((c, index) => {
        return (
          <Image3
            key={index}
            index={index}
            hide={hide}
            duration={1200}
            src={`https://media.giphy.com/media/3XUbDJ3rPBK1y/giphy.gif`}
            delay={100 * (index + 1)}
            title={title}
            reverse={false}
            size={1}
          />
        );
      })}
    </div>
  );
};

export {Bottom2Top};
