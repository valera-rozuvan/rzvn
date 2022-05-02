import {combineReducers} from 'redux'

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

const copyAuthUser = (state) => ({
  email: state.email,
  password: state.password,
  authToken: state.authToken,
});

const cachedAuthUser = {
  email: "",
  password: "",
  authToken: "",
};
if (localStorage && localStorage.getItem) {
  const cachedKeys = ['email', 'password', 'authToken'];
  cachedKeys.forEach((key) => {
    const value = localStorage.getItem(key);
    if (typeof value === 'string' && value.length !== 0) {
      cachedAuthUser[key] = value;
    }
  });
}

const authUserReducer = (state = cachedAuthUser, action) => {
  let newState = state;

  switch (action.type) {
    case 'SET_EMAIL':
      if (typeof action.data !== 'string') {
        break;
      }

      newState = copyAuthUser(state);
      newState.email = action.data;

      if (localStorage && localStorage.setItem) {
        localStorage.setItem('email', action.data);
      }

      break;

    case 'SET_PASSWORD':
      if (typeof action.data !== 'string') {
        break;
      }

      newState = copyAuthUser(state);
      newState.password = action.data;

      if (localStorage && localStorage.setItem) {
        localStorage.setItem('password', action.data);
      }

      break;

    case 'SET_AUTH_TOKEN':
      if (typeof action.data !== 'string') {
        break;
      }

      newState = copyAuthUser(state);
      newState.authToken = action.data;

      if (localStorage && localStorage.setItem) {
        localStorage.setItem('authToken', action.data);
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
