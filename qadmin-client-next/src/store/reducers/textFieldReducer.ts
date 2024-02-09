import { Reducer, Action } from 'redux';

import { TextFieldReducerAction, EActionTypes } from '../actions';

interface ITextFieldState {
  text: string;
}

const initialTextFieldState: ITextFieldState = {
  text: '',
};

const textFieldReducer: Reducer<ITextFieldState, Action> = (
  state: ITextFieldState | undefined = initialTextFieldState,
  unkAction: Action,
): ITextFieldState => {
  let newState = state;
  let action;

  switch (unkAction.type) {
    case EActionTypes.SET_TEXT:
      action = unkAction as TextFieldReducerAction;

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
