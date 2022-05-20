const copyMessageItem = (item) => ({
    id: item.id,
    recieverPublicKey: item. recieverPublicKey,
    senderPublicKey: item. senderPublicKey,
    name: item.name,
    text: item.text,
  });
  
  export const messagesReducer = (state = [], action) => {
    let newState = state;
  
    switch (action.type) {
      case 'SET_MESSAGES':
        if (!Array.isArray(action.data)) {
          break;
        }
  
        if (action.data.length === 0) {
          newState = [];
  
          break;
        }
  
        newState = action.data.map((item) => copyMessageItem(item));
  
        break;
  
      case 'UPDATE_MESSAGE':
        if (!action.data || !action.data.id) {
          break;
        }
  
        if (state.length === 0) {
          newState = [copyMessageItem(action.data)];
  
          break;
        }
  
        let updatedExisting = false;
        newState = state.map((item) => {
          if (item.id === action.data.id) {
            updatedExisting = true;
            return copyMessageItem(action.data);
          }
  
          return copyMessageItem(item);
        });
        if (!updatedExisting) {
          newState.push(copyMessageItem(action.data));
        }
  
        break;
  
      case 'CREATE_MESSAGE':
        if (!action.data) {
          break;
        }
  
        newState = state.map((item) => copyMessageItem(item));
        newState.push(copyMessageItem(action.data));
  
        break;
  
      case 'DELETE_MESSAGE':
        if (!action.data || !action.data.id) {
          break;
        }
  
        newState = [];
        state.forEach((item) => {
          if (item.id === action.data.id) {
            return;
          }
  
          newState.push(copyMessageItem(item));
        });
  
        break;
  
      default:
        break;
    }
  
    return newState;
  };
  
  