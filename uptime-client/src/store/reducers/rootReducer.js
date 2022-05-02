import { combineReducers } from 'redux';

const copyResourceItem = (item) => ({
  id: item.id,
  url: item.url,
  method: item.method,
  isActive: item.isActive,
  createdAt: item.createdAt,
});

const resourcesReducer = (state = [], action) => {
  let newState = state;

  switch (action.type) {
    case 'SET_RESOURCES':
      if (!Array.isArray(action.data)) {
        break;
      }

      if (action.data.length === 0) {
        newState = [];

        break;
      }

      newState = action.data.map((item) => copyResourceItem(item));

      break;

    case 'UPDATE_RESOURCE':
      if (!action.data || !action.data.id) {
        break;
      }

      if (state.length === 0) {
        newState = [copyResourceItem(action.data)];

        break;
      }

      let updatedExisting = false;
      newState = state.map((item) => {
        if (item.id === action.data.id) {
          updatedExisting = true;
          return copyResourceItem(action.data);
        }

        return copyResourceItem(item);
      });
      if (!updatedExisting) {
        newState.push(copyResourceItem(action.data));
      }

      break;

    case 'CREATE_RESOURCE':
      if (!action.data) {
        break;
      }

      newState = state.map((item) => copyResourceItem(item));
      newState.push(copyResourceItem(action.data));

      break;

    case 'DELETE_RESOURCE':
      if (!action.data || !action.data.id) {
        break;
      }

      newState = [];
      state.forEach((item) => {
        if (item.id === action.data.id) {
          return;
        }

        newState.push(copyResourceItem(item));
      });

      break;

    default:
      break;
  }

  return newState;
};

const copyAuthUser = (state) => ({
  isLoggedIn: state.isLoggedIn,
  email: state.email,
  authorizationCode: state.authorizationCode,
  authToken: state.authToken,
  nonce: state.nonce,
});

const authUserReducer = (state = {
  isLoggedIn: true,
  email: '',
  authorizationCode: '',
  authToken: '',
  nonce: '',
}, action) => {
  let newState = state;

  switch (action.type) {
    case 'SET_IS_LOGGED_IN':
      if (typeof action.data !== 'boolean') {
        break;
      }

      newState = copyAuthUser(state);
      newState.isLoggedIn = action.data;

      break;
    case 'SET_EMAIL':
      if (typeof action.data !== 'string') {
        break;
      }

      newState = copyAuthUser(state);
      newState.email = action.data;

      break;

    case 'SET_AUTHORIZATION_CODE':
      if (typeof action.data !== 'string') {
        break;
      }

      newState = copyAuthUser(state);
      newState.authorizationCode = action.data;

      break;

    case 'SET_AUTH_TOKEN':
      if (typeof action.data !== 'string') {
        break;
      }

      newState = copyAuthUser(state);
      newState.authToken = action.data;

      break;

    case 'SET_NONCE':
      if (typeof action.data !== 'string') {
        break;
      }

      newState = copyAuthUser(state);
      newState.nonce = action.data;

      break;

    default:
      break;
  }

  return newState;
};

export default combineReducers({
  resources: resourcesReducer,
  authUser: authUserReducer,
});
