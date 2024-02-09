import { Reducer, Action } from 'redux';

import { CounterReducerAction, EActionTypes } from '../actions';

interface ICounterState {
  number: number;
}

const initialCounterState: ICounterState = {
  number: 0,
};

const counterReducer: Reducer<ICounterState, Action> = (
  state: ICounterState | undefined = initialCounterState,
  unkAction: Action,
): ICounterState => {
  let newState = state;
  let action;

  switch (unkAction.type) {
    case EActionTypes.SET_NUMBER:
      action = unkAction as CounterReducerAction;

      newState = { number: action.data };

      break;
    default:
      break;
  }

  return newState;
};

export {
  counterReducer,
  ICounterState,
};
