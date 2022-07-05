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
  return [shuffled.slice(min)[0], index];
}

function reflectDom() {
  let appendToDom = document.querySelector(`.gallery`);
  gridInfoList = [];
  for (let i = 1; i <= sectionCount; i++) {
    const sectionDom = document.createElement('div');
    sectionDom.setAttribute('data-section-id', i);
    sectionDom.classList.add('item');
    const [publicURL, index] = [...getRandomSample(publicURLList, 1)];
    if (index % 4 === 0) {
      sectionDom.style.gridRow = `span 2`;
      sectionDom.style.gridColumn = `span 2`;
    }
    if (index % 4 === 1) {
      sectionDom.style.gridColumn = `span 2`;
    }
    if (index % 4 === 2) {
      sectionDom.style.gridRow = `span 2`;
    }

    // debug
    // sectionDom.innerHTML = i;
    sectionDom.style.backgroundImage = `url(${publicURL})`;
    appendToDom.appendChild(sectionDom);

    const {top, left, width, height} = sectionDom.getBoundingClientRect();

    gridInfoList.push(Object.assign({id: i}, {top, left, width, height}));
  }
}

function isArea(clientX, clientY, top, left, width, height) {
  return left <= clientX && clientX <= left + width && top <= clientY && clientY <= top + height;
}

function reCalcGridInfoList() {
  const newGridInfoList = [];
  for (let index = 0; index < gridInfoList.length; index++) {
    const gridInfo = gridInfoList[index];
    const {id} = {...gridInfo};
    const targetDom = document.querySelector(`[data-section-id="${id}"]`);
    const {top, left, width, height} = targetDom.getBoundingClientRect();
    newGridInfoList.push(Object.assign({id, top, left, width, height}));
  }
  gridInfoList = newGridInfoList;
}

function adjustSectionDom() {
  if (currentSectionId) {
    const targetDom = document.querySelector(`[data-section-id="${currentSectionId}"]`);
    targetDom.style.gridRow = `span ${parameter.rowSize}`;
    targetDom.style.gridColumn = `span ${parameter.colSize}`;
  }
}

function removeActive() {
  const activeDomList = [...document.querySelectorAll('.is-active')];
  for (let index = 0; index < activeDomList.length; index++) {
    const activeDom = activeDomList[index];
    activeDom.classList.remove('is-active');
  }
}

function handleWindowClick(event) {
  if (
    event.target.classList.contains('slider-fg') ||
    event.target.classList.contains('close-button') ||
    event.target.classList.contains('slider') ||
    event.target.nodeName === 'INPUT'
  ) {
    return;
  }
  currentSectionId = null;
  removeActive();
  const {pageX, pageY, clientX, clientY} = event;
  for (let index = 0; index < gridInfoList.length; index++) {
    const gridInfo = gridInfoList[index];
    const {id, top, left, width, height} = {...gridInfo};
    if (isArea(clientX, clientY, top, left, width, height)) {
      removeActive();
      currentSectionId = id;
      const targetDom = document.querySelector(`[data-section-id="${id}"]`);
      targetDom.classList.add('is-active');
    }
  }
}

window.addEventListener('click', handleWindowClick);

let currentSectionId;
let sectionCount = 10;
let lastSectionId = sectionCount;
let gridInfoList = [];

let stats;
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = 0;
stats.domElement.style.top = 0;
document.body.appendChild(stats.domElement);

let parameter = {
  rowSize: 2,
  colSize: 2,
};

let controllerInfo = {
  'Row Size': 2,
  'Col Size': 2,
};

const gui = new dat.GUI();
gui.width = 300;
gui.add(controllerInfo, 'Row Size', 1, 5, 1).onChange((event) => {
  detectChangeParameter(event, 'Row Size');
});
gui.add(controllerInfo, 'Col Size', 1, 5, 1).onChange((event) => {
  detectChangeParameter(event, 'Col Size');
});

function detectChangeParameter(event, keyName) {
  if (keyName === 'Row Size') {
    parameter.rowSize = event;
  }
  if (keyName === 'Col Size') {
    parameter.colSize = event;
  }
  window.removeEventListener('click', handleWindowClick);
  adjustSectionDom();
  reCalcGridInfoList();
  window.addEventListener('click', handleWindowClick);
}

function loop() {
  requestAnimationFrame(loop);
  stats.begin();
  stats.end();
}

loop();
reflectDom();
