import { combineReducers } from 'redux';

import { textFieldReducer } from './textFieldReducer';
import { counterReducer } from './counterReducer';

import appsReducer from './appsReducer';
import { usersReducer } from './usersReducer';
import { authUserReducer } from './authUserReducer';
import { superAdminsReducer } from './superAdminsReducer';

export default combineReducers({
  counter: counterReducer,
  textField: textFieldReducer,

  apps: appsReducer,
  users: usersReducer,
  authUser: authUserReducer,
  superAdmins: superAdminsReducer,
});
