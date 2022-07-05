import {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import {css, cx} from '@emotion/css';

const StyledImageContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`;

const Image = ({
  src,
  delay,
  title,
  duration,
  hide,
  keyframes,
  className = css``,
}) => {
  const [direction, setDirection] = useState(``);

  useEffect(() => {
    if (hide) {
      setDirection(`normal`);
    } else {
      setDirection(`reverse`);
    }
  }, [hide]);
  return (
    <StyledImageContent
      className={cx(
        css`
          animation-delay: ${delay}ms;
          animation-timing-function: linear;
          animation-duration: ${duration}ms;
          animation-iteration-count: infinite;
          background-image: url(${src});
          animation-name: ${keyframes};
          animation-direction: ${direction};
        `,
        className
      )}
    />
  );
};

export {Image};
