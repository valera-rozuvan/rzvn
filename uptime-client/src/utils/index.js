function rndStr(length) {
  if (Number.isNaN(length)) {
    return '';
  }

  length = Math.round(length);
  if (length < 1) {
    return '';
  }

  let result = '';

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(
      Math.floor(Math.random() * charactersLength),
    );
  }
  return result;
}

export {
  rndStr,
};
