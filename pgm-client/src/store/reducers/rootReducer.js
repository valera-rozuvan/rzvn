import { combineReducers } from 'redux';

import { friendsReducer } from './friendsReducer';
import { messagesReducer } from './messagesReducer';
import { currentFriendReducer } from './currentFriendReducer';

export default combineReducers({
  friends: friendsReducer,
  messages: messagesReducer,
  currentFriend: currentFriendReducer,
});
