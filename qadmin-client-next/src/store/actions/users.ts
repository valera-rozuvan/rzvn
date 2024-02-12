import { Action } from 'redux';

import { EActionTypes, IUsersStateItem } from '../../types';

class SetUsersAction implements Action {
  readonly type = EActionTypes.SET_SUPER_ADMINS;

  constructor(public data: IUsersStateItem[]) {} // eslint-disable-line
}

class UpdateUserAction implements Action {
  readonly type = EActionTypes.UPDATE_SUPER_ADMIN;

  constructor(public data: IUsersStateItem) {} // eslint-disable-line
}

class CreateUserAction implements Action {
  readonly type = EActionTypes.CREATE_SUPER_ADMIN;

  constructor(public data: IUsersStateItem) {} // eslint-disable-line
}

class DeleteUserAction implements Action {
  readonly type = EActionTypes.DELETE_SUPER_ADMIN;

  constructor(public data: string) {} // eslint-disable-line
}

export {
  SetUsersAction,
  UpdateUserAction,
  CreateUserAction,
  DeleteUserAction,
};
