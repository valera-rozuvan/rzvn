
const copyUserKeys = ({ publicKey, privateKey}) => ({
    publicKey,
    // privateKey,
  });

const defaultUserKeys = {
    publicKey: "",
    // privateKey: "",
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
            userPublicKey: (typeof action.data.publicKey === 'string') ? action.data.publicKey : '',
            // privateKey: (typeof action.data.privateKey === 'string') ? action.data.privateKey : '',
          };

          if (localStorage && localStorage.setItem) {
            localStorage.setItem('userPublicKey', newState.userPublicKey);
            // localStorage.setItem('publicKey', newState.userPrivateKey);
          }
    
          break;
     
      default:
        break;
    }

    return newState;
  };
  export {userKeysReducer}
  
  