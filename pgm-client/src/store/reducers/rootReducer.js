import { combineReducers } from 'redux';

import { friendsReducer } from './friendsReducer';
import { messagesReducer } from './messagesReducer';

export default combineReducers({
  friends: friendsReducer,
  messages: messagesReducer,

});
