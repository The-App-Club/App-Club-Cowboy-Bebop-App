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

function getRandomSample(list, size) {
  let shuffled = list.slice(0);
  let i = list.length;
  let min = i - size;
  let temp;
  let index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

function dressUpGif(targetDom) {
  const [publicURL] = [...getRandomSample(publicURLList, 1)];
  targetDom.style.backgroundImage = `url(${publicURL})`;
  return targetDom;
}

function createSectionDom(x, y, width, height) {
  const sectionDom = document.createElement('div');
  sectionDom.classList.add('section');
  sectionDom.style.top = `${y}px`;
  sectionDom.style.left = `${x}px`;
  sectionDom.style.width = `${width}px`;
  sectionDom.style.height = `${height}px`;
  return dressUpGif(sectionDom);
}

function appendTo(appendToDom, leafInfo) {
  const {x, y, width, height} = {...leafInfo};
  const sectionDom = createSectionDom(x, y, width, height);
  appendToDom.appendChild(sectionDom);
  return sectionDom;
}

function clear() {
  const workspaceDom = document.querySelector(`.workspace`);
  const sectionDomList = [...workspaceDom.querySelectorAll(`*`)];
  for (let index = 0; index < sectionDomList.length; index++) {
    const sectionDom = sectionDomList[index];
    sectionDom.parentElement.removeChild(sectionDom);
  }
}

function initialize() {
  clear();
  leafInfoList = [];
  const root = new Leaf(parameter.x, parameter.y, parameter.width, parameter.height);
  leafInfoList.push(root);
}

function splitSection() {
  let willSplitTry = true;

  // https://gamedevelopment.tutsplus.com/tutorials/how-to-use-bsp-trees-to-generate-game-maps--gamedev-12268

  while (willSplitTry) {
    willSplitTry = false;
    for (let index = 0; index < leafInfoList.length; index++) {
      let leafInfo = leafInfoList[index];
      if (!leafInfo.leftChild && !leafInfo.rightChild) {
        if (leafInfo.width > parameter.maxLeafSize || leafInfo.height > parameter.maxLeafSize || Math.random() > 0.25) {
          const {canSplit, left, right} = {
            ...split(leafInfo.leftChild, leafInfo.rightChild, leafInfo.x, leafInfo.y, leafInfo.width, leafInfo.height),
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
}

function reflectDom() {
  let appendToDom = document.querySelector(`.workspace`);
  for (let index = 0; index < leafInfoList.length; index++) {
    const leafInfo = leafInfoList[index];
    const {leftChild, rightChild} = {...leafInfo};
    if (leftChild && rightChild) {
      appendToDom = appendTo(appendToDom, leafInfo);
      appendTo(appendToDom, leftChild);
      appendTo(appendToDom, rightChild);
    } else {
      appendTo(appendToDom, leafInfo);
    }
    appendToDom = document.querySelector(`.workspace`);
  }
}

const publicURLList = [
  'https://media.giphy.com/media/I2Yb40ZBQr4g8/giphy.gif',
  'https://media.giphy.com/media/5gK1hvwoutPnG/giphy.gif',
  'https://media.giphy.com/media/3o7bue6KjrDUzqhTJ6/giphy.gif',
  'https://media.giphy.com/media/11KzOet1ElBDz2/giphy.gif',
  'https://media.giphy.com/media/iIkP9O94wiFlm/giphy.gif',
  'https://media.giphy.com/media/1CRbewpGZtdEQ/giphy.gif',
  'https://media.giphy.com/media/4MxLhxhOqCqYw/giphy.gif',
  'https://media.giphy.com/media/BrFTdYQmMXduw/giphy.gif',
  'https://media.giphy.com/media/10VjiVoa9rWC4M/giphy.gif',
  'https://media.giphy.com/media/euVwF4P2b0sus/giphy.gif',
  'https://media.giphy.com/media/9FACRWmyUORsQ/giphy.gif',
  'https://media.giphy.com/media/D05oEJk20L09a/giphy.gif',
  'https://media.giphy.com/media/mZHOWmP9Sszm/giphy.gif',
  'https://media.giphy.com/media/13TdMFTIORb9aU/giphy.gif',
  'https://media.giphy.com/media/p7QJSVvU4bMWc/giphy.gif',
  'https://media.giphy.com/media/iFW661Tf7Mp1e/giphy.gif',
  'https://media.giphy.com/media/ffWzKK9eDPlCw/giphy.gif',
  'https://media.giphy.com/media/aZzXDWIjefE5y/giphy.gif',
  'https://media.giphy.com/media/B14W1OnoPl4f6/giphy.gif',
  'https://media.giphy.com/media/vncgdgPWLwGRi/giphy.gif',
  'https://media.giphy.com/media/b21HcSrrBu8pi/giphy.gif',
  'https://media.giphy.com/media/QKFrBz4cLs6IM/giphy.gif',
  'https://media.giphy.com/media/MeFiwDSGDApHy/giphy.gif',
  'https://media.giphy.com/media/xCyXXsBFX2YGA/giphy.gif',
  'https://media.giphy.com/media/lmdWrAZEBB5TO/giphy.gif',
  'https://media.giphy.com/media/qnJ10oHWM4Po4/giphy.gif',
  'https://media.giphy.com/media/b1dXky39p5Zcs/giphy.gif',
  'https://media.giphy.com/media/AVGV9Ii2mpUWY/giphy.gif',
  'https://media.giphy.com/media/gQbVzXQQbGO7C/giphy.gif',
  'https://media.giphy.com/media/NzbcdfP2B6GKk/giphy.gif',
  'https://media.giphy.com/media/QEhmoTK7GPTkA/giphy.gif',
  'https://media.giphy.com/media/irWbG2YwTDXR6/giphy.gif',
  'https://media.giphy.com/media/10TSS6AzOc4uXu/giphy.gif',
  'https://media.giphy.com/media/rX0VO4YJcrjqw/giphy.gif',
  'https://media.giphy.com/media/e9R0ytwguezTO/giphy.gif',
  'https://media.giphy.com/media/rQzk820Dmcc2Q/giphy.gif',
  'https://media.giphy.com/media/qbmjPU9cdaKkM/giphy.gif',
  'https://media.giphy.com/media/okECPQ0lVQeD6/giphy.gif',
  'https://media.giphy.com/media/dKVw0JwmqjtMA/giphy.gif',
  'https://media.giphy.com/media/14mcoxkCUuoqsM/giphy.gif',
  'https://media.giphy.com/media/bi6RQ5x3tqoSI/giphy.gif',
  'https://media.giphy.com/media/1ErpEPbfK9ck0/giphy.gif',
  'https://media.giphy.com/media/rTwxsNsR6iwfK/giphy.gif',
  'https://media.giphy.com/media/14kYBP3sOq3ubm/giphy.gif',
  'https://media.giphy.com/media/h4F1B5OmmoMi4/giphy.gif',
  'https://media.giphy.com/media/z9pV5qD0KEca4/giphy.gif',
  'https://media.giphy.com/media/dG8sD1skMnPwI/giphy.gif',
  'https://media.giphy.com/media/Qoa2lJjbu2yw8/giphy.gif',
  'https://media.giphy.com/media/7sRMjntXYEITu/giphy.gif',
  'https://media.giphy.com/media/LXTQN2kRbaqAw/giphy.gif',
];

let stats;
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = 0;
stats.domElement.style.top = 0;
document.body.appendChild(stats.domElement);

let leafInfoList = [];
let parameter = {
  x: 110,
  y: 110,
  width: 700,
  height: 700,
  leftChild: null,
  rightChild: null,
  minLeafSize: 80,
  maxLeafSize: 100,
};

let controllerInfo = {
  'Start OffsetX': 110,
  'Start OffsetY': 110,
  'Workspace Width': 700,
  'Workspace Height': 700,
  'Min Section Size': 80,
  'Max Section Size': 100,
  'Workspace Clear': initialize,
  'Workspace Split': niceRolling,
};

const gui = new dat.GUI();
gui.width = 300;
gui.add(controllerInfo, 'Start OffsetX', 1, 500, 1).onChange((event) => {
  detectChangeParameter(event, 'Start OffsetX');
});
gui.add(controllerInfo, 'Start OffsetY', 1, 500, 1).onChange((event) => {
  detectChangeParameter(event, 'Start OffsetY');
});
gui.add(controllerInfo, 'Workspace Width', 1, window.innerWidth, 1).onChange((event) => {
  detectChangeParameter(event, 'Workspace Width');
});
gui.add(controllerInfo, 'Workspace Height', 1, window.innerHeight, 1).onChange((event) => {
  detectChangeParameter(event, 'Workspace Height');
});
gui.add(controllerInfo, 'Min Section Size', 1, window.innerHeight, 1).onChange((event) => {
  detectChangeParameter(event, 'Min Section Size');
});
gui.add(controllerInfo, 'Max Section Size', 1, window.innerHeight, 1).onChange((event) => {
  detectChangeParameter(event, 'Max Section Size');
});
gui.add(controllerInfo, 'Workspace Clear');
gui.add(controllerInfo, 'Workspace Split');

function detectChangeParameter(event, keyName) {
  if (keyName === 'Start OffsetX') {
    parameter.x = event;
  }
  if (keyName === 'Start OffsetY') {
    parameter.y = event;
  }
  if (keyName === 'Workspace Width') {
    parameter.width = event;
  }
  if (keyName === 'Workspace Height') {
    parameter.height = event;
  }
  if (keyName === 'Min Section Size') {
    parameter.minLeafSize = event;
  }
  if (keyName === 'Max Section Size') {
    parameter.maxLeafSize = event;
  }
  niceRolling();
}

function niceRolling() {
  initialize();

  splitSection();

  reflectDom();
}

function loop() {
  requestAnimationFrame(loop);
  stats.begin();
  stats.end();
}

loop();
niceRolling();
