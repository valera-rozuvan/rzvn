import { combineReducers } from 'redux';

import { friendsReducer } from './friendsReducer';
import { messagesReducer } from './messagesReducer';
import { currentFriendReducer } from './currentFriendReducer';
import { userKeysReducer } from './userKeysReducer';
import { userReducer } from './userReducer';

export default combineReducers({
  friends: friendsReducer,
  messages: messagesReducer,
  currentFriend: currentFriendReducer,
  userKeys:userKeysReducer,
  user:userReducer,
});
