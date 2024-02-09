import { Reducer, Action } from 'redux';

import { IUserKeyData } from '../../types';
import IActionTypes from '../actions/types';
import { IUserReducerActionSetKeyData, IUserReducerActionSetSessionToken } from '../actions';

interface IUserState extends IUserKeyData {
  sessionToken: string;
}

const initialUserState: IUserState = {
  publicKeyFingerprint: '',
  privateKeyArmored: '',
  publicKeyArmored: '',
  sessionToken: '',
};

function copyUserState({
  publicKeyFingerprint, privateKeyArmored, publicKeyArmored, sessionToken,
}: IUserState): IUserState {
  return {
    publicKeyFingerprint,
    privateKeyArmored,
    publicKeyArmored,
    sessionToken,
  };
}

const userReducer: Reducer<IUserState, Action> = (
  state: IUserState | undefined = initialUserState,
  unkAction: Action,
): IUserState => {
  let newState = state;
  let action;

  switch (unkAction.type) {
    case IActionTypes.SET_KEY_DATA:
      action = unkAction as IUserReducerActionSetKeyData;

      newState = { ...copyUserState(state), ...action.data };

      break;
    case IActionTypes.SET_SESSION_TOKEN:
      action = unkAction as IUserReducerActionSetSessionToken;

      newState = { ...copyUserState(state), ...{ sessionToken: action.data } };

      break;
    default:
      break;
  }

  return newState;
};

export {
  userReducer,
  IUserState,
};
