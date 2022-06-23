

const copyCurrentFriend = ({ name, publicKey,authorPublicKey}) => ({
  name,
  publicKey,
  authorPublicKey
});

const defaultCurrentFriend = {
  name: "",
  publicKey: "",
  authorPublicKey:""
};

if (localStorage && localStorage.getItem) {
  const cachedFriend = ['name', 'publicKey','authorPublicKey'];
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
        authorPublicKey: (typeof action.data.authorPublicKey === 'string') ? action.data.authorPublicKey : '',
      };

      if (localStorage && localStorage.setItem) {
        localStorage.setItem('name', newState.name);
        localStorage.setItem('publicKey', newState.publicKey);
        localStorage.setItem('authorPublicKey', newState.authorPublicKey);
      }

      break;

    default:
      break;
  }

  return newState;
};

export {currentFriendReducer};
