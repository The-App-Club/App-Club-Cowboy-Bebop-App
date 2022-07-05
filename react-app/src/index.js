import React, {useId, useEffect, useMemo, createRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {spiral} from './plugins/spiral';
import {default as chance} from 'chance';
import styled from '@emotion/styled';
import {Image} from './components/Image';
import {gsap} from 'gsap/all';

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 5px;
  max-width: 525px;
  margin: 10vh auto;
  border: 1px solid #000;
  overflow: hidden;
`;

const StyledBox = styled.div`
  width: 100px;
  height: 100px;
  transform-origin: center center;
`;

const App = ({data}) => {
  const imageURLList = data
    .flat()
    .sort((a, b) => {
      return a - b;
    })
    .map((n, _) => {
      return `https://picsum.photos/seed/${n}/200/300`;
    });

  const boxsRef = useMemo(() => {
    let a = [...Array(data.length)];
    data.map((row, i) => {
      a[i] = [...Array(row.length)];
      row.map((col, j) => {
        a[i][j] = createRef();
      });
    });
    return a;
  }, [data]);

  const master = useMemo(() => {
    return gsap.timeline({paused: true});
  }, []);

  useEffect(() => {
    const boxDomList = boxsRef
      .flat()
      .map((boxRef, i) => {
        return boxRef.current;
      })
      .map((dom) => {
        return {id: Number(dom.getAttribute('data-id')), dom};
      })
      .sort((a, b) => {
        return a.id - b.id;
      })
      .map((info) => {
        return info.dom;
      });
    // pattern1
    // const tl = gsap.timeline().from(boxDomList, {
    //   scale: 0,
    //   opacity: 0,
    //   ease: 'power1.inOut',
    //   stagger: 0.4,
    // });
    // const tl2 = gsap.timeline().to(boxDomList, {
    //   scale: 1,
    //   rotate: 360,
    //   ease: 'power1.inOut',
    //   stagger: 0.4,
    // });
    // const tl3 = gsap.timeline().to(boxDomList, {
    //   scale: 0,
    //   opacity: 0,
    //   ease: 'power1.inOut',
    //   stagger: 0.4,
    // });
    // master.add(tl).add(tl2).add(tl3);

    // pattern2
    const tl = gsap
      .timeline()
      .from(boxDomList, {
        scale: 0,
        opacity: 0,
        ease: 'power1.inOut',
        stagger: 0.1,
      })
      .to(
        boxDomList,
        {
          scale: 1,
          rotate: 360,
          ease: 'power1.inOut',
          stagger: 0.1,
        },
        0.1
      )
      .to(
        boxDomList,
        {
          scale: 0,
          opacity: 0,
          ease: 'power1.inOut',
          stagger: 0.2,
        },
        2.3
      );
    // pattern3
    // const tl = gsap
    //   .timeline()
    //   .from(boxDomList, {
    //     scale: 0,
    //     opacity: 0,
    //     ease: 'power1.inOut',
    //     stagger: 0.4,
    //   })
    //   .to(
    //     boxDomList,
    //     {
    //       scale: 1,
    //       rotate: 360,
    //       ease: 'power1.inOut',
    //       stagger: 0.4,
    //     },
    //     0.3
    //   )
    //   .call(
    //     (a) => {
    //       tl.to(a, {
    //         scale: 0.4,
    //         ease: 'power1.inOut',
    //         stagger: 0.3,
    //       });
    //       console.log(a, tl);
    //     },
    //     [boxDomList],
    //     1
    //   );
    master.add(tl);

    master.play();
  }, []);

  return (
    <>
      <button
        onClick={() => {
          if (master.reversed()) {
            master.play();
          } else {
            master.reverse();
          }
        }}
      >
        toggle
      </button>
      <StyledContainer>
        {data.map((row, i) => {
          return row.map((col, j) => {
            const imageURL = imageURLList.pop();
            return (
              <StyledBox
                ref={boxsRef[i][j]}
                key={chance(i * j).cf()}
                data-id={data[i][j]}
              >
                <Image src={imageURL} alt={chance(i * j).cf()} />
              </StyledBox>
            );
          });
        })}
      </StyledContainer>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App data={spiral(5)} />);
