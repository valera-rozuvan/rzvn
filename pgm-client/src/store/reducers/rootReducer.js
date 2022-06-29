import { combineReducers } from 'redux';

import { friendsReducer } from './friendsReducer';
import { messagesReducer } from './messagesReducer';
import { currentFriendReducer } from './currentFriendReducer';
import { userKeysReducer } from './userKeysReducer';
import { userLoginReducer } from './userLoginReducer';

export default combineReducers({
  friends: friendsReducer,
  messages: messagesReducer,
  currentFriend: currentFriendReducer,
  userKeys:userKeysReducer,
  userLogin:userLoginReducer,
});
