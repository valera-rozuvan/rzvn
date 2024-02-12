import { Action } from 'redux';

import { EActionTypes } from '../../types';

class TriggerVerificationAction implements Action {
  readonly type = EActionTypes.TRIGGER_VERIFICATION;

  constructor(public data: null) {} // eslint-disable-line
}

class LoginAction implements Action {
  readonly type = EActionTypes.LOGIN;

  constructor(public data: { email: string; authToken: string; }) {} // eslint-disable-line
}

class InitLogoutAction implements Action {
  readonly type = EActionTypes.INIT_LOGOUT;

  constructor(public data: null) {} // eslint-disable-line
}

class LoginVerifiedAction implements Action {
  readonly type = EActionTypes.LOGIN_VERIFIED;

  constructor(public data: null) {} // eslint-disable-line
}

class LogoutAction implements Action {
  readonly type = EActionTypes.LOGOUT;

  constructor(public data: null) {} // eslint-disable-line
}

export {
  TriggerVerificationAction,
  LoginAction,
  InitLogoutAction,
  LoginVerifiedAction,
  LogoutAction,
};
