import { Reducer, Action } from 'redux';

import IActionTypes from '../actions/types';
import { ITextFieldReducerAction } from '../actions';

interface ITextFieldState {
  text: string;
}

const initialTextFieldState: ITextFieldState = { text: '' };

const textFieldReducer: Reducer<ITextFieldState, Action> = (
  state: ITextFieldState | undefined = initialTextFieldState,
  unkAction: Action,
): ITextFieldState => {
  let newState = state;
  let action;

  switch (unkAction.type) {
    case IActionTypes.SET_TEXT:
      action = unkAction as ITextFieldReducerAction;

      if (typeof action.data !== 'string') {
        break;
      }

      newState = { text: action.data };

      break;
    default:
      break;
  }

  return newState;
};

export {
  textFieldReducer,
  ITextFieldState,
};
