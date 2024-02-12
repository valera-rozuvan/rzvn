import { combineReducers } from 'redux';

import appsReducer from './appsReducer';
import usersReducer from './usersReducer';
import authUserReducer from './authUserReducer';
import superAdminsReducer from './superAdminsReducer';

export default combineReducers({
  apps: appsReducer,
  users: usersReducer,
  authUser: authUserReducer,
  superAdmins: superAdminsReducer,
});
