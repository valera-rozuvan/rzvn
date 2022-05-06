const copyFriendItem = (item) => ({
  id: item.id,
  publicKey: item.publicKey,
  name: item.name,
  userId: item.userId,
});

export const friendsReducer = (state = [], action) => {
  let newState = state;

  switch (action.type) {
    case 'SET_FRIENDS':
      if (!Array.isArray(action.data)) {
        break;
      }

      if (action.data.length === 0) {
        newState = [];

        break;
      }

      newState = action.data.map((item) => copyFriendItem(item));

      break;

    case 'UPDATE_FRIEND':
      if (!action.data || !action.data.id) {
        break;
      }

      if (state.length === 0) {
        newState = [copyFriendItem(action.data)];

        break;
      }

      let updatedExisting = false;
      newState = state.map((item) => {
        if (item.id === action.data.id) {
          updatedExisting = true;
          return copyFriendItem(action.data);
        }

        return copyFriendItem(item);
      });
      if (!updatedExisting) {
        newState.push(copyFriendItem(action.data));
      }

      break;

    case 'CREATE_FRIEND':
      if (!action.data) {
        break;
      }

      newState = state.map((item) => copyFriendItem(item));
      newState.push(copyFriendItem(action.data));

      break;

    case 'DELETE_FRIEND':
      if (!action.data || !action.data.id) {
        break;
      }

      newState = [];
      state.forEach((item) => {
        if (item.id === action.data.id) {
          return;
        }

        newState.push(copyFriendItem(item));
      });

      break;

    default:
      break;
  }

  return newState;
};

