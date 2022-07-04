
const copyUserItem = (item) => ({
  userPublicKey:item.userPublicKey,
  // userPrivateKey,
  userName:item.userName,
  userId:item.userId,
  });

// const defaultUserKeys = {
//   userPublicKey: "",
//   // userPrivateKey: "",
//   userName:"",
//   userId:"",
//   };

//   if (localStorage && localStorage.getItem) {
//     const cachedUserKeys = ['userPublicKey', 'userName', 'userId'];
//     cachedUserKeys.forEach((key) => {
//       const value = localStorage.getItem(key);
//       if (typeof value === 'string' && value.length !== 0) {
//         defaultUserKeys[key] = value;
//       }
//     });
//   }
const userKeysReducer = (state = [], action) => {

    let newState = state;
  
    switch (action.type) {
      case 'CREATE_USER_KEY':
        if (!action.data) {
          break;
        }
  
        newState = state.map((item) => copyUserItem(item));
        newState.push(copyUserItem(action.data));
        console.log(newState);
  
        break;
  
      // case 'CREATE_KEY':
      //   if (!action.data) {
      //       break;
      //     }

      //   if (action.data.length === 0) {
      //     newState = [];
  
      //     break;
      //   }
      //   newState = {
      //     userPublicKey: (typeof action.data.userPublicKey === 'string') ? action.data.userPublicKey : '',
      //     userName: (typeof action.data.userName === 'string') ? action.data.userName : '',
      //     userId: (typeof action.data.userId === 'string') ? action.data.userId : '',
      //       // userPrivateKey: (typeof action.data.userPrivateKey === 'string') ? action.data.userPrivateKey : '',
      //     };

      //     if (localStorage && localStorage.setItem) {
      //       localStorage.setItem('userPublicKey', newState.userPublicKey);
      //       localStorage.setItem('userName', newState.userName);
      //       localStorage.setItem('userId', newState.userId);
      //       // localStorage.setItem('userPrivateKey', newState.userPrivateKey);
      //     }
    
      //     break;
     
      default:
        break;
    }

    return newState;
  };
  export {userKeysReducer}
  
  