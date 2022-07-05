import {
  useId,
  useRef,
  useEffect,
  useMemo,
  createRef,
  useState,
  useLayoutEffect,
} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {css} from '@emotion/css';
import {default as chance} from 'chance';
import styled from '@emotion/styled';
import {Image} from './components/Image';
import {gsap} from 'gsap/all';
import {motion} from 'framer-motion';

import {default as cowboy} from './data/cowboy.json';
import {useInterval} from './hooks/useInterval';
const Item = styled(motion.div)`
  position: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
const ItemFrame = styled(motion.div)`
  position: fixed;
  border: 1px solid #000;
`;

const App = () => {
  const workspaceRef = useRef(null);
  const [data, setData] = useState([]);

  const [tik, setTik] = useState(new Date());

  useInterval(() => {
    setTik(new Date());
  }, 3000);

  useEffect(() => {
    console.log(tik);
    let leafInfoList = [];
    let parameter = {
      x: window.matchMedia('(max-width: 768px)').matches
        ? 0
        : window.innerWidth / 8,
      y: window.matchMedia('(max-width: 768px)').matches
        ? 0
        : window.innerHeight / 8,
      width: window.matchMedia('(max-width: 768px)').matches ? 300 : 800,
      height: window.matchMedia('(max-width: 768px)').matches ? 300 : 800,
      leftChild: null,
      rightChild: null,
      minLeafSize: 50,
      maxLeafSize: 80,
    };
    workspaceRef.current.style.top = `${parameter.y}px`;
    workspaceRef.current.style.left = `${parameter.x}px`;
    workspaceRef.current.style.width = `${parameter.width}px`;
    workspaceRef.current.style.height = `${parameter.height}px`;
    class Leaf {
      constructor(x, y, height, width) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
      }
    }
    function randomRangeNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    function split(leftChild, rightChild, x, y, width, height) {
      if (leftChild || rightChild) {
        return {canSplit: false};
      }

      let isSplitHeight = Math.random() > 0.5;

      if (width > height && width / height >= 1.25) {
        isSplitHeight = false;
      }

      if (height > width && height / width >= 1.25) {
        isSplitHeight = true;
      }

      const max = (isSplitHeight ? height : width) - parameter.minLeafSize;

      if (max <= parameter.minLeafSize) {
        return {canSplit: false};
      }

      const niceSize = randomRangeNumber(parameter.minLeafSize, max);

      if (isSplitHeight) {
        leftChild = new Leaf(x, y, niceSize, width);
        rightChild = new Leaf(x, y + niceSize, height - niceSize, width);
      } else {
        leftChild = new Leaf(x, y, height, niceSize);
        rightChild = new Leaf(x + niceSize, y, height, width - niceSize);
      }

      return {canSplit: true, left: leftChild, right: rightChild};
    }

    function splitSection(leafInfoList) {
      let willSplitTry = true;

      // https://gamedevelopment.tutsplus.com/tutorials/how-to-use-bsp-trees-to-generate-game-maps--gamedev-12268

      while (willSplitTry) {
        willSplitTry = false;
        for (let index = 0; index < leafInfoList.length; index++) {
          let leafInfo = leafInfoList[index];
          if (!leafInfo.leftChild && !leafInfo.rightChild) {
            if (
              leafInfo.width > parameter.maxLeafSize ||
              leafInfo.height > parameter.maxLeafSize ||
              Math.random() > 0.25
            ) {
              const {canSplit, left, right} = {
                ...split(
                  leafInfo.leftChild,
                  leafInfo.rightChild,
                  leafInfo.x,
                  leafInfo.y,
                  leafInfo.width,
                  leafInfo.height
                ),
              };
              if (canSplit) {
                Object.assign(leafInfo, {leftChild: left, rightChild: right});
                leafInfoList.push(leafInfo.leftChild);
                leafInfoList.push(leafInfo.rightChild);
                willSplitTry = true;
              }
            }
          }
        }
      }
      return leafInfoList;
    }

    const root = new Leaf(
      parameter.x,
      parameter.y,
      parameter.width,
      parameter.height
    );
    leafInfoList.push(root);
    const resultInfoList = splitSection(leafInfoList);
    setData(resultInfoList);
  }, [tik]);

  const renderWorkspace = () => {
    return (
      <div
        className={css`
          position: fixed;
        `}
        ref={workspaceRef}
      >
        {data.map((leafInfo, i) => {
          const image =
            cowboy[chance().integer({min: 0, max: cowboy.length - 1})];
          const {leftChild, rightChild} = {...leafInfo};
          if (leftChild && rightChild) {
            [leafInfo, leftChild, rightChild].map((info, j) => {
              return (
                <div key={chance().guid()}>
                  <ItemFrame
                    className={css`
                      top: ${info.y}px;
                      left: ${info.x}px;
                      width: ${info.width}px;
                      height: ${info.height}px;
                      background: url(${image});
                    `}
                  />
                  <Item
                    className={css`
                      top: ${info.y}px;
                      left: ${info.x}px;
                      width: ${info.width}px;
                      height: ${info.height}px;
                      background: url(${image});
                    `}
                    drag={true}
                    dragConstraints={workspaceRef}
                  />
                </div>
              );
            });
          } else {
            return (
              <div key={chance().guid()}>
                <ItemFrame
                  className={css`
                    top: ${leafInfo.y}px;
                    left: ${leafInfo.x}px;
                    width: ${leafInfo.width}px;
                    height: ${leafInfo.height}px;
                  `}
                />
                <Item
                  key={chance().guid()}
                  className={css`
                    top: ${leafInfo.y}px;
                    left: ${leafInfo.x}px;
                    width: ${leafInfo.width}px;
                    height: ${leafInfo.height}px;
                    background: url(${image});
                  `}
                  drag={true}
                  dragConstraints={workspaceRef}
                />
              </div>
            );
          }
        })}
      </div>
    );
  };

  return <>{renderWorkspace()}</>;
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
