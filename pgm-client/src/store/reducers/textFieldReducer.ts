import { Reducer } from 'redux';

interface ITextFieldReducerAction {
  type: string;
  data: string;
}

interface ITextFieldState {
  text: string;
}

const textFieldReducer: Reducer<ITextFieldState, ITextFieldReducerAction> = (
  state: ITextFieldState | undefined = { text: '' },
  action: ITextFieldReducerAction,
): ITextFieldState => {
  let newState = state;

  switch (action.type) {
    case 'SET_TEXT':
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
  ITextFieldReducerAction,
  ITextFieldState,
};
