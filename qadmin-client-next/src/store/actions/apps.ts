import { Action } from 'redux';

import { EActionTypes, IAppsStateItem } from '../../types';

class SetAllAppsAction implements Action {
  readonly type = EActionTypes.SET_APPS;

  constructor(public data: IAppsStateItem[]) {} // eslint-disable-line
}

class UpdateAppAction implements Action {
  readonly type = EActionTypes.UPDATE_APP;

  constructor(public data: IAppsStateItem) {} // eslint-disable-line
}

class CreateAppAction implements Action {
  readonly type = EActionTypes.CREATE_APP;

  constructor(public data: IAppsStateItem) {} // eslint-disable-line
}

class DeleteAppAction implements Action {
  readonly type = EActionTypes.DELETE_APP;

  constructor(public data: string) {} // eslint-disable-line
}

export {
  SetAllAppsAction,
  UpdateAppAction,
  CreateAppAction,
  DeleteAppAction,
};
