import { Reducer, Action } from 'redux';

import {
  TriggerVerificationAction,
  LoginAction,
  InitLogoutAction,
  LoginVerifiedAction,
  LogoutAction,
} from '../actions';
import { IAuthUserState, EAuthUserAuthState, EActionTypes } from '../../types';

const copyAuthUserItem = ({
  email,
  authToken,
  authState,
}: IAuthUserState) => ({
  email,
  authToken,
  authState,
});

const defaultAuthUser = {
  email: '',
  authToken: '',
  authState: EAuthUserAuthState.LOGGED_OUT,
};

if (localStorage && localStorage.getItem) {
  ['email', 'authToken'].forEach((key: string) => {
    const value = localStorage.getItem(key);

    if (typeof value === 'string' && value.length > 0) {
      switch (key) {
        case 'email':
          defaultAuthUser.email = value;
          break;
        case 'authToken':
          defaultAuthUser.authToken = value;
          defaultAuthUser.authState = EAuthUserAuthState.UNVERIFIED;
          break;
        default:
          break;
      }
    }
  });
}

const authUserReducer: Reducer<IAuthUserState, Action> = (
  state: IAuthUserState | undefined = defaultAuthUser,
  unkAction: Action,
): IAuthUserState => {
  let newState = state;
  let action;

  switch (unkAction.type) {
    case EActionTypes.TRIGGER_VERIFICATION:
      action = unkAction as TriggerVerificationAction;

      newState = copyAuthUserItem(state);
      newState.authState = EAuthUserAuthState.UNVERIFIED;

      break;

    case EActionTypes.LOGIN:
      action = unkAction as LoginAction;

      newState = {
        email: action.data.email,
        authToken: action.data.authToken,
        authState: EAuthUserAuthState.LOGGED_IN,
      };

      if (localStorage && localStorage.setItem) {
        localStorage.setItem('email', newState.email);
        localStorage.setItem('authToken', newState.authToken);
      }

      break;

    case EActionTypes.INIT_LOGOUT:
      action = unkAction as InitLogoutAction;

      newState = copyAuthUserItem(state);
      newState.authState = EAuthUserAuthState.LOGGING_OUT;

      break;

    case EActionTypes.LOGIN_VERIFIED:
      action = unkAction as LoginVerifiedAction;

      newState = copyAuthUserItem(state);
      newState.authState = EAuthUserAuthState.LOGGED_IN;

      break;

    case EActionTypes.LOGOUT:
      action = unkAction as LogoutAction;

      newState = {
        email: '',
        authToken: '',
        authState: EAuthUserAuthState.LOGGED_OUT,
      };

      if (localStorage && localStorage.setItem) {
        localStorage.setItem('email', '');
        localStorage.setItem('authToken', '');
      }

      break;

    default:
      break;
  }

  return newState;
};

export default authUserReducer;
