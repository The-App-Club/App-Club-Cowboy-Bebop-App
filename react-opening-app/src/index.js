import React, {
  useId,
  useRef,
  useEffect,
  useMemo,
  useLayoutEffect,
  createRef,
  useState,
} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {spiral} from './plugins/spiral';
import {default as chance} from 'chance';
import styled from '@emotion/styled';
import {Image} from './components/Image';
import {gsap} from 'gsap/all';
import {Flip} from 'gsap/Flip';
import {css} from '@emotion/css';
gsap.registerPlugin(Flip);

const App = ({data}) => {
  const activeRef = useRef(null);
  const itemsRef = useMemo(() => {
    return [...Array(4)].map((n, index) => {
      return createRef();
    });
  }, []);
  useLayoutEffect(() => {
    const domList = itemsRef.map((itemRef) => {
      return itemRef.current;
    });
    activeRef.current = domList[0];
  }, []);

  const handleFlip = (e, index) => {
    const domList = itemsRef.map((itemRef) => {
      return itemRef.current;
    });
    if (domList[index] === activeRef.current) {
      return;
    }
    // console.log(domList[index], activeRef.current, gridArea);
    let state = Flip.getState(domList);
    activeRef.current.dataset.grid = domList[index].dataset.grid;
    domList[index].dataset.grid = 'img-1';
    activeRef.current = domList[index];
    Flip.from(state, {
      duration: 0.3,
      absolute: true,
      ease: 'power1.inOut',
    });
  };

  return (
    <>
      <div
        className={css`
          display: flex;
          justify-content: space-between;
          max-width: 1200px;
          width: 100%;
          margin: 10vh auto 0;
        `}
      >
        <div
          className={css`
            display: flex;
            max-width: 80%;
            width: 100%;
          `}
        >
          <p>aaaaaaaaa</p>
        </div>
        <div className="image-container">
          <div className="images">
            {[...Array(4)].map((n, index) => {
              return (
                <div
                  ref={itemsRef[index]}
                  key={index}
                  className={`product product-${index + 1}`}
                  data-grid={`img-${index + 1}`}
                  onClick={(e) => {
                    handleFlip(e, index);
                  }}
                >
                  <StyledImage
                    src={`https://picsum.photos/seed/${index + 1}/200/300`}
                    alt={index}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const StyledImage = styled.img`
  max-width: 100%;
  width: 100%;
  display: block;
`;

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App data={spiral(5)} />);
