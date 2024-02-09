import { combineReducers, Reducer } from 'redux';

import { textFieldReducer } from './textFieldReducer';
import { userReducer } from './userReducer';

const rootReducer: Reducer = combineReducers({
  user: userReducer,
  textField: textFieldReducer,
});

export default rootReducer;
