import { Action } from 'redux';

import { IUserKeyData } from '../../types';
import IActionTypes from './types';

class ITextFieldReducerAction implements Action {
  readonly type = IActionTypes.SET_TEXT;

  constructor(public data: string) {} // eslint-disable-line
}

class IUserReducerActionSetKeyData implements Action {
  readonly type = IActionTypes.SET_KEY_DATA;

  constructor(public data: IUserKeyData) {} // eslint-disable-line
}

class IUserReducerActionSetSessionToken implements Action {
  readonly type = IActionTypes.SET_SESSION_TOKEN;

  constructor(public data: string) {} // eslint-disable-line
}

export {
  ITextFieldReducerAction,

  IUserReducerActionSetKeyData,
  IUserReducerActionSetSessionToken,
};
