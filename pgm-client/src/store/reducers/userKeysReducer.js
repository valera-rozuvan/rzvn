
const copyUserKeys = ({ publicKey, privateKey}) => ({
    publicKey,
    // privateKey,
  });

const defaultUserKeys = {
    publicKey: "",
    // privateKey: "",
  };
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

     
      default:
        break;
    }

    return newState;
  };
  export {userKeysReducer}
  
  