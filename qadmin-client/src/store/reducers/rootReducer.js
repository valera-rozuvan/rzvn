import {combineReducers} from 'redux';

import {AuthUserAuthStates} from '../../constants';

const copyUserItem = (item) => ({
  id: item.id,
  email: item.email,
  firstName: item.firstName,
  lastName: item.lastName,
});

const usersReducer = (state = [], action) => {
  let newState = state;

  switch (action.type) {
    case 'SET_USERS':
      if (!Array.isArray(action.data)) {
        break;
      }

      if (action.data.length === 0) {
        newState = [];

        break;
      }

      newState = action.data.map((item) => copyUserItem(item));

      break;

    case 'UPDATE_USER':
      if (!action.data || !action.data.id) {
        break;
      }

      if (state.length === 0) {
        newState = [copyUserItem(action.data)];

        break;
      }

      let updatedExisting = false;
      newState = state.map((item) => {
        if (item.id === action.data.id) {
          updatedExisting = true;
          return copyUserItem(action.data);
        }

        return copyUserItem(item);
      });
      if (!updatedExisting) {
        newState.push(copyUserItem(action.data));
      }

      break;

    case 'CREATE_USER':
      if (!action.data) {
        break;
      }

      newState = state.map((item) => copyUserItem(item));
      newState.push(copyUserItem(action.data));

      break;

    case 'DELETE_USER':
      if (!action.data || !action.data.id) {
        break;
      }

      newState = [];
      state.forEach((item) => {
        if (item.id === action.data.id) {
          return;
        }

        newState.push(copyUserItem(item));
      });

      break;

    default:
      break;
  }

  return newState;
};

const copySuperAdminItem = (item) => ({
  id: item.id,
  email: item.email,
  password: item.password,
  authToken: item.authToken,
});

const superAdminsReducer = (state = [], action) => {
  let newState = state;

  switch (action.type) {
    case 'SET_SUPERADMINS':
      if (!Array.isArray(action.data)) {
        break;
      }

      if (action.data.length === 0) {
        newState = [];

        break;
      }

      newState = action.data.map((item) => copySuperAdminItem(item));

      break;

    case 'UPDATE_SUPERADMIN':
      if (!action.data || !action.data.id) {
        break;
      }

      if (state.length === 0) {
        newState = [copySuperAdminItem(action.data)];

        break;
      }

      let updatedExisting = false;
      newState = state.map((item) => {
        if (item.id === action.data.id) {
          updatedExisting = true;
          return copySuperAdminItem(action.data);
        }

        return copySuperAdminItem(item);
      });
      if (!updatedExisting) {
        newState.push(copySuperAdminItem(action.data));
      }

      break;

    case 'CREATE_SUPERADMIN':
      if (!action.data) {
        break;
      }

      newState = state.map((item) => copySuperAdminItem(item));
      newState.push(copySuperAdminItem(action.data));

      break;

    case 'DELETE_SUPERADMIN':
      if (!action.data || !action.data.id) {
        break;
      }

      newState = [];
      state.forEach((item) => {
        if (item.id === action.data.id) {
          return;
        }

        newState.push(copySuperAdminItem(item));
      });

      break;

    default:
      break;
  }

  return newState;
};


const copyAppItem = (item) => ({
  id: item.id,
  isActive: item.isActive,
  privateKey: item.privateKey,
  publicKey: item.publicKey,
  serviceName: item.serviceName,
  callbackUrl: item.callbackUrl,
  createdAt: item.createdAt,
});

const appsReducer = (state = [], action) => {
  let newState = state;

  switch (action.type) {
    case 'SET_APPS':
      if (!Array.isArray(action.data)) {
        break;
      }

      if (action.data.length === 0) {
        newState = [];

        break;
      }

      newState = action.data.map((item) => copyAppItem(item));

      break;

    case 'UPDATE_APP':
      if (!action.data || !action.data.id) {
        break;
      }

      if (state.length === 0) {
        newState = [copyAppItem(action.data)];

        break;
      }

      let updatedExisting = false;
      newState = state.map((item) => {
        if (item.id === action.data.id) {
          updatedExisting = true;
          return copyAppItem(action.data);
        }

        return copyAppItem(item);
      });
      if (!updatedExisting) {
        newState.push(copyAppItem(action.data));
      }

      break;

    case 'CREATE_APP':
      if (!action.data) {
        break;
      }

      newState = state.map((item) => copyAppItem(item));
      newState.push(copyAppItem(action.data));

      break;

    case 'DELETE_APP':
      if (!action.data || !action.data.id) {
        break;
      }

      newState = [];
      state.forEach((item) => {
        if (item.id === action.data.id) {
          return;
        }

        newState.push(copyAppItem(item));
      });

      break;

    default:
      break;
  }

  return newState;
};

const copyAuthUserItem = (item) => ({
  email: item.email,
  authToken: item.authToken,
  authState: item.authState,
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
    case 'LOGIN':
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

    case 'INIT_LOGOUT':
      newState = copyAuthUserItem(state);
      newState.authState = AuthUserAuthStates.loggingOut;

      break;

    case 'LOGIN_VERIFIED':
      newState = copyAuthUserItem(state);
      newState.authState = AuthUserAuthStates.loggedIn;

      break;

    case 'LOGOUT':
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

export default combineReducers({
  apps: appsReducer,
  users: usersReducer,
  authUser: authUserReducer,
  superAdmins: superAdminsReducer,
});
