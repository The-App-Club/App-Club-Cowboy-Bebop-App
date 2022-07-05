import {useEffect, useState} from 'react';
import {Image} from './Image';
import {css} from '@emotion/css';

const Right2Left = () => {
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
            size={1}
          />
        );
      })}
    </div>
  );
};

export {Right2Left};
