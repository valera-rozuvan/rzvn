import { UsersActionTypes } from '../../constants/actions/UsersActionTypes';

const copyUserItem = ({id, firstName, lastName, email, isActive, createdAt}) => ({
  id,
  firstName,
  lastName,
  email,
  isActive,
  createdAt,
});

const usersReducer = (state = [], action) => {
  let newState = state;

  switch (action.type) {
    case UsersActionTypes.setUsers:
      if (!Array.isArray(action.data)) {
        break;
      }

      if (action.data.length === 0) {
        newState = [];

        break;
      }

      newState = action.data.map((item) => copyUserItem(item));

      break;

    case UsersActionTypes.updateUser:
      if (!action.data || !action.data.id) {
        break;
      }

      if (state.length === 0) {
        newState = [copyUserItem(action.data)];

        break;
      }

      let updatedExisting = false;
      newState = state.map((item) => {
        if (item.id === action.data.id) {
          updatedExisting = true;
          return copyUserItem(action.data);
        }

        return copyUserItem(item);
      });
      if (!updatedExisting) {
        newState.push(copyUserItem(action.data));
      }

      break;

    case UsersActionTypes.createUser:
      if (!action.data) {
        break;
      }

      newState = state.map((item) => copyUserItem(item));
      newState.push(copyUserItem(action.data));

      break;

    case UsersActionTypes.deleteUser:
      if (!action.data || !action.data.id) {
        break;
      }

      newState = [];
      state.forEach((item) => {
        if (item.id === action.data.id) {
          return;
        }

        newState.push(copyUserItem(item));
      });

      break;

    default:
      break;
  }

  return newState;
};

export { usersReducer };
