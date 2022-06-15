

const copyCurrentFriend = ({ name, publicKey}) => ({
  name,
  publicKey,
});

const defaultCurrentFriend = {
  name: "",
  publicKey: "",
};

if (localStorage && localStorage.getItem) {
  const cachedFriend = ['name', 'publicKey'];
  cachedFriend.forEach((friend) => {
    const value = localStorage.getItem(friend);
    if (typeof value === 'string' && value.length !== 0) {
        defaultCurrentFriend[friend] = value;
    }
  });
}


const currentFriendReducer  = (state = defaultCurrentFriend , action) => {
  let newState = state;


  switch (action.type) {
      case 'CURRENT_FRIEND':
      newState = {
        name: (typeof action.data.name === 'string') ? action.data.name : '',
        publicKey: (typeof action.data.publicKey === 'string') ? action.data.publicKey : '',
      };

      if (localStorage && localStorage.setItem) {
        localStorage.setItem('name', newState.name);
        localStorage.setItem('publicKey', newState.publicKey);
      }

      break;

    default:
      break;
  }

  return newState;
};

export {currentFriendReducer};
