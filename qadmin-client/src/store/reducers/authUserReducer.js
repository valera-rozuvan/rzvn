import {AuthUserAuthStates} from '../../constants';
import {AuthUserActionTypes} from '../../constants/actions/AuthUserActionTypes';

const copyAuthUserItem = ({ email, authToken, authState }) => ({
  email,
  authToken,
  authState,
});

const defaultAuthUser = {
  email: "",
  authToken: "",
  authState: AuthUserAuthStates.loggedOut,
};

if (localStorage && localStorage.getItem) {
  const cachedKeys = ['email', 'authToken'];
  cachedKeys.forEach((key) => {
    const value = localStorage.getItem(key);
    if (typeof value === 'string' && value.length !== 0) {
      defaultAuthUser[key] = value;
    }
  });
}

if (typeof defaultAuthUser.authToken === 'string' && defaultAuthUser.authToken.length > 0) {
  defaultAuthUser.authState = AuthUserAuthStates.unverified;
}

const authUserReducer = (state = defaultAuthUser, action) => {
  let newState = state;

  switch (action.type) {
    case AuthUserActionTypes.login:
      if (typeof action.data === 'undefined') {
        break;
      }

      newState = {
        email: (typeof action.data.email === 'string') ? action.data.email : '',
        authToken: (typeof action.data.authToken === 'string') ? action.data.authToken : '',
        authState: AuthUserAuthStates.loggedIn,
      };

      if (localStorage && localStorage.setItem) {
        localStorage.setItem('email', newState.email);
        localStorage.setItem('authToken', newState.authToken);
      }

      break;

    case AuthUserActionTypes.initLogout:
      newState = copyAuthUserItem(state);
      newState.authState = AuthUserAuthStates.loggingOut;

      break;

    case AuthUserActionTypes.loginVerified:
      newState = copyAuthUserItem(state);
      newState.authState = AuthUserAuthStates.loggedIn;

      break;

    case AuthUserActionTypes.logout:
      newState = {
        email: "",
        authToken: "",
        authState: AuthUserAuthStates.loggedOut,
      };

      if (localStorage && localStorage.setItem) {
        localStorage.setItem('email', "");
        localStorage.setItem('authToken', "");
      }

      break;

    default:
      break;
  }

  return newState;
};

export { authUserReducer };
