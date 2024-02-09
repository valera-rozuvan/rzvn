import { Action } from 'redux';

import EActionTypes from './types';

class CounterReducerAction implements Action {
  readonly type = EActionTypes.SET_NUMBER;

  constructor(public data: number) {} // eslint-disable-line
}

class TextFieldReducerAction implements Action {
  readonly type = EActionTypes.SET_TEXT;

  constructor(public data: string) {} // eslint-disable-line
}

export {
  CounterReducerAction,
  TextFieldReducerAction,

  EActionTypes,
};
