enum EAuthUserAuthState {
  LOGGED_OUT = 'LOGGED_OUT',
  LOGGING_OUT = 'LOGGING_OUT',
  UNVERIFIED = 'UNVERIFIED',
  LOGGED_IN = 'LOGGED_IN',
}

interface IAuthUserState {
  email: string;
  authToken: string;
  authState: EAuthUserAuthState;
}

export {
  IAuthUserState,
  EAuthUserAuthState,
};
