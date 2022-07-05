import fetch from 'node-fetch';

function fetchGifList(searchTerms) {
  return new Promise(async (resolve) => {
    const resultInfo = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${searchTerms}&limit=50&offset=0&rating=g&lang=en`);
    const json = await resultInfo.json();
    const gifIdList = json.data.map((item) => {
      return item.id;
    });
    resolve(gifIdList);
  });
}

function makeReferenceURLList(gifIdList) {
  return gifIdList.map((gifId) => {
    return `https://media.giphy.com/media/${gifId}/giphy.gif`;
  });
}

(async () => {
  const gifIdList = await fetchGifList(`cowboy+bebop`);

  const publicURL = makeReferenceURLList(gifIdList);

  console.log(JSON.stringify(publicURL));
})();
