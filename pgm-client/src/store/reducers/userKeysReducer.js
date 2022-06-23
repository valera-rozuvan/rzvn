
const copyUserKeys = ({ userPublicKey, userPrivateKey}) => ({
  userPublicKey,
  // userPrivateKey,
  });

const defaultUserKeys = {
  userPublicKey: "",
  // userPrivateKey: "",
  };

  if (localStorage && localStorage.getItem) {
    const cachedUserKeys = ['userPublicKey', 'userPrivateKey'];
    cachedUserKeys.forEach((key) => {
      const value = localStorage.getItem(key);
      if (typeof value === 'string' && value.length !== 0) {
        defaultUserKeys[key] = value;
      }
    });
  }
const userKeysReducer = (state = defaultUserKeys, action) => {

    let newState = state;
  
    switch (action.type) {

      case 'SET_USER_KEYS':
        if (!action.data) {
            break;
          }

        if (action.data.length === 0) {
          newState = [];
  
          break;
        }
        newState = {
          userPublicKey: (typeof action.data.userPublicKey === 'string') ? action.data.userPublicKey : '',
            // userPrivateKey: (typeof action.data.userPrivateKey === 'string') ? action.data.userPrivateKey : '',
          };

          if (localStorage && localStorage.setItem) {
            localStorage.setItem('userPublicKey', newState.userPublicKey);
            // localStorage.setItem('userPrivateKey', newState.userPrivateKey);
          }
    
          break;
     
      default:
        break;
    }

    return newState;
  };
  export {userKeysReducer}
  
  