import styled from '@emotion/styled';
import Reveal from 'react-awesome-reveal';
import {keyframes} from '@emotion/react';
import {css} from '@emotion/css';

const customAnimation = keyframes`
  0% {
    width: 0%;
    height: 0%;
  }
  50% {
    height: 50%;
  }
  100% {
    height: 0%;
    width: 100%;
  }
`;

const StyledImageContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image4 = ({src, delay, duration}) => {
  return (
    <StyledImageContent
      className={css`
        position: absolute;
        top: 0;
        left: 0;
        border-bottom: 3px solid rgb(6, 46, 82);
        animation: ${customAnimation} 3.3s ease-in-out infinite;
        background-image: url(${src});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
      `}
    />
  );
};

export {Image4};
