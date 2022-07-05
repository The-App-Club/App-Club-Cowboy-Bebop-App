import styled from '@emotion/styled';
import Reveal from 'react-awesome-reveal';
import {keyframes, css} from '@emotion/react';
import {css as style} from '@emotion/css';

const customAnimation = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

const customAnimation2 = keyframes`
  0% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
`;

const StyledImageContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
`;

const Image = ({
  src,
  delay,
  title,
  index,
  duration,
  hide,
  reverse = false,
  size = 1,
}) => {
  return (
    <Reveal
      css={css`
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-name: ${customAnimation};
        &.is-hide {
          animation-name: ${customAnimation2};
        }
      `}
      duration={duration}
      delay={delay}
      className={hide ? '' : 'is-hide'}
      keyframes={customAnimation}
      triggerOnce={true}
    >
      <StyledImageContent
        className={style`
          background-image: url(${src});
          min-height: calc(100vh / ${title.length * size});
          background-position: 0% ${index * (100 / title.length)}%;
          transform: ${reverse ? `scale(-1)` : `scale(1)`};
        `}
        style={
          {
            // width: `calc(${index} * 100% / ${title.length})`
            // width: `calc(${title.length - index} * 100% / ${title.length})`
          }
        }
      />
    </Reveal>
  );
};

export {Image};
