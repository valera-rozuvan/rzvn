import { Reducer, Action } from 'redux';

import {
  SetUsersAction,
  UpdateUserAction,
  CreateUserAction,
  DeleteUserAction,
} from '../actions';
import { IUsersState, IUsersStateItem, EActionTypes } from '../../types';

const copyUserItem = ({
  id,
  email,
  password,
  isActive,
  createdAt,
}: IUsersStateItem) => ({
  id,
  email,
  password,
  isActive,
  createdAt,
});

const usersReducer: Reducer<IUsersState, Action> = (state: IUsersState | undefined = [], unkAction: Action): IUsersState => {
  let newState = state;
  let action;
  let updatedExisting;

  switch (unkAction.type) {
    case EActionTypes.SET_USERS:
      action = unkAction as SetUsersAction;

      if (action.data.length === 0) {
        newState = [];

        break;
      }

      newState = action.data.map((item) => copyUserItem(item));

      break;

    case EActionTypes.UPDATE_USER:
      action = unkAction as UpdateUserAction;

      if (state.length === 0) {
        newState = [copyUserItem(action.data)];

        break;
      }

      updatedExisting = false;
      newState = state.map((item) => {
        action = unkAction as UpdateUserAction;

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

    case EActionTypes.CREATE_USER:
      action = unkAction as CreateUserAction;

      newState = state.map((item) => copyUserItem(item));
      newState.push(copyUserItem(action.data));

      break;

    case EActionTypes.DELETE_USER:
      action = unkAction as DeleteUserAction;

      newState = [];
      state.forEach((item) => {
        action = unkAction as DeleteUserAction;

        if (item.id === action.data) {
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

export default usersReducer;
