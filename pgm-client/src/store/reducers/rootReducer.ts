import { combineReducers } from 'redux';

import { textFieldReducer } from './textFieldReducer';
import { userReducer } from './userReducer';

export default combineReducers({
  user: userReducer,
  textField: textFieldReducer,
});
