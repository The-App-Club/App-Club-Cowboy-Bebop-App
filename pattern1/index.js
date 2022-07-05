function niceSetUp(paneClassName) {
  const paneDom = document.querySelector(`.${paneClassName}`);

  // https://developer.mozilla.org/ja/docs/Web/API/Element/animate
  const minPercentage = 0;
  const centerPercentage = 50;
  const maxPercentage = 100;
  const keyframeInfoList = [];
  for (let index = 0; index <= maxPercentage; index++) {
    let keyframeInfo = {
      width: `${index}%`,
      height: `${index}%`,
    };
    keyframeInfoList.push(keyframeInfo);
  }
  // https://developer.mozilla.org/en-US/docs/Web/API/EffectTiming
  const animatation = paneDom.animate(keyframeInfoList, {
    duration: 6000,
    easing: 'linear',
    iterations: Infinity,
  });
  return animatation;
}

niceSetUp('pane1');
niceSetUp('pane2');
niceSetUp('pane3');
niceSetUp('pane4');
