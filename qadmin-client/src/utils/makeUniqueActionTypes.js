import { randomString } from './randomString';

function makeUniqueActionTypes(actionTypes) {
  const uniqueActionTypes = {};

  Object.keys(actionTypes).forEach((key) => {
    const value = actionTypes[key];
    const prefix = randomString(12);

    uniqueActionTypes[key] = `${prefix}_${value}`;
  });

  return uniqueActionTypes;
}

export { makeUniqueActionTypes };
