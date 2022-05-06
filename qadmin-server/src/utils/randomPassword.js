const { largeWordList } = require('../constants');

const getRandomSubSet = (arr, N) => {
  const result = new Array(N);
  let len = arr.length;
  const taken = new Array(len);
  if (N > len) {
    throw new RangeError('getRandom: more elements taken than available');
  }
  let n = N;
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

const randomPassword = (N = 5) => getRandomSubSet(largeWordList, N).join(' ');

module.exports = {
  randomPassword,
};
