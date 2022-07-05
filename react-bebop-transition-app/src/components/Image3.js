import styled from '@emotion/styled';
import Reveal from 'react-awesome-reveal';
import {keyframes, css} from '@emotion/react';
import {css as style} from '@emotion/css';

const customAnimation = keyframes`
  0% {
    top: 0vh;
  }
  100% {
    top: 100vh;
  }
`;

const customAnimation2 = keyframes`
  0% {
    top: 100vh;
  }
  100% {
    top: 0vh;
  }
`;

const StyledImageContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
`;

const Image3 = ({
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
        position: absolute;
        top: 100vh;
        left: ${index * (100 / title.length)}%;
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
          background-position: ${index * (100 / title.length)}% 0%;
          transform: ${reverse ? `scale(-1)` : `scale(1)`};
        `}
        style={{
          width: `calc(100vw / ${title.length})`,
        }}
      />
    </Reveal>
  );
};

export {Image3};
