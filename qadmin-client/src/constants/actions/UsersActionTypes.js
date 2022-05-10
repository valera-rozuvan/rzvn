import { makeUniqueActionTypes } from "../../utils";

const UsersActionTypes = makeUniqueActionTypes({
  setUsers: 'SET_USERS',
  updateUser: 'UPDATE_USER',
  createUser: 'CREATE_USER',
  deleteUser: 'DELETE_USER',
});

export { UsersActionTypes };
