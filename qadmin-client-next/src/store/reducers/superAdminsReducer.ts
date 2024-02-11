import { Reducer, Action } from 'redux';

import {
  SetSuperAdminsAction,
  UpdateSuperAdminAction,
  CreateSuperAdminAction,
  DeleteSuperAdminAction,
} from '../actions';
import { ISuperAdminsState, ISuperAdminsStateItem, EActionTypes } from '../../types';

const copySuperAdminItem = ({
  id,
  email,
  password,
  isActive,
  createdAt,
}: ISuperAdminsStateItem) => ({
  id,
  email,
  password,
  isActive,
  createdAt,
});

const superAdminsReducer: Reducer<ISuperAdminsState, Action> = (
  state: ISuperAdminsState | undefined = [],
  unkAction: Action,
): ISuperAdminsState => {
  let newState = state;
  let action;
  let updatedExisting;

  switch (unkAction.type) {
    case EActionTypes.SET_SUPER_ADMINS:
      action = unkAction as SetSuperAdminsAction;

      if (action.data.length === 0) {
        newState = [];

        break;
      }

      newState = action.data.map((item) => copySuperAdminItem(item));

      break;

    case EActionTypes.UPDATE_SUPER_ADMIN:
      action = unkAction as UpdateSuperAdminAction;

      if (state.length === 0) {
        newState = [copySuperAdminItem(action.data)];

        break;
      }

      updatedExisting = false;
      newState = state.map((item) => {
        action = unkAction as UpdateSuperAdminAction;

        if (item.id === action.data.id) {
          updatedExisting = true;
          return copySuperAdminItem(action.data);
        }

        return copySuperAdminItem(item);
      });
      if (!updatedExisting) {
        newState.push(copySuperAdminItem(action.data));
      }

      break;

    case EActionTypes.CREATE_SUPER_ADMIN:
      action = unkAction as CreateSuperAdminAction;

      newState = state.map((item) => copySuperAdminItem(item));
      newState.push(copySuperAdminItem(action.data));

      break;

    case EActionTypes.DELETE_SUPER_ADMIN:
      action = unkAction as DeleteSuperAdminAction;

      newState = [];
      state.forEach((item) => {
        action = unkAction as DeleteSuperAdminAction;

        if (item.id === action.data) {
          return;
        }

        newState.push(copySuperAdminItem(item));
      });

      break;

    default:
      break;
  }

  return newState;
};

export default superAdminsReducer;
