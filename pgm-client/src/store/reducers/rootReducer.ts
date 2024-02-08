import { combineReducers } from 'redux';

// import { textFieldReducer } from './textFieldReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  // textField: textFieldReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export {
  rootReducer,
  RootState,
};
