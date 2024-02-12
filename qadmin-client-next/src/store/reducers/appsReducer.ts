import { Reducer, Action } from 'redux';

import {
  SetAllAppsAction,
  UpdateAppAction,
  CreateAppAction,
  DeleteAppAction,
} from '../actions';
import { IAppsState, IAppsStateItem, EActionTypes } from '../../types';

const copyAppItem = (
  {
    id,
    serviceName,
    publicKey,
    privateKey,
    isActive,
    callbackUrl,
    createdAt,
  }: IAppsStateItem,
) => ({
  id,
  serviceName,
  publicKey,
  privateKey,
  isActive,
  callbackUrl,
  createdAt,
});

const appsReducer: Reducer<IAppsState, Action> = (state: IAppsState | undefined = [], unkAction: Action): IAppsState => {
  let newState = state;
  let action;
  let updatedExisting;

  switch (unkAction.type) {
    case EActionTypes.SET_APPS:
      action = unkAction as SetAllAppsAction;

      if (action.data.length === 0) {
        newState = [];

        break;
      }

      newState = action.data.map((item) => copyAppItem(item));

      break;

    case EActionTypes.UPDATE_APP:
      action = unkAction as UpdateAppAction;

      if (state.length === 0) {
        newState = [copyAppItem(action.data)];

        break;
      }

      updatedExisting = false;
      newState = state.map((item) => {
        action = unkAction as UpdateAppAction;

        if (item.id === action.data.id) {
          updatedExisting = true;
          return copyAppItem(action.data);
        }

        return copyAppItem(item);
      });
      if (!updatedExisting) {
        newState.push(copyAppItem(action.data));
      }

      break;

    case EActionTypes.CREATE_APP:
      action = unkAction as CreateAppAction;

      newState = state.map((item) => copyAppItem(item));
      newState.push(copyAppItem(action.data));

      break;

    case EActionTypes.DELETE_APP:
      action = unkAction as DeleteAppAction;

      newState = [];
      state.forEach((item) => {
        action = unkAction as DeleteAppAction;

        if (item.id === action.data) {
          return;
        }

        newState.push(copyAppItem(item));
      });

      break;

    default:
      break;
  }

  return newState;
};

export default appsReducer;
