import { combineReducers } from 'redux';

import { rzvnAuthReducer } from './rzvnAuthReducer';
import { appAuthReducer } from './appAuthReducer';

export default combineReducers({
  rzvnAuth: rzvnAuthReducer,
  appAuth: appAuthReducer,
});
