import { Action } from 'redux';

import { EActionTypes, ISuperAdminsStateItem } from '../../types';

class SetSuperAdminsAction implements Action {
  readonly type = EActionTypes.SET_SUPER_ADMINS;

  constructor(public data: ISuperAdminsStateItem[]) {} // eslint-disable-line
}

class UpdateSuperAdminAction implements Action {
  readonly type = EActionTypes.UPDATE_SUPER_ADMIN;

  constructor(public data: ISuperAdminsStateItem) {} // eslint-disable-line
}

class CreateSuperAdminAction implements Action {
  readonly type = EActionTypes.CREATE_SUPER_ADMIN;

  constructor(public data: ISuperAdminsStateItem) {} // eslint-disable-line
}

class DeleteSuperAdminAction implements Action {
  readonly type = EActionTypes.DELETE_SUPER_ADMIN;

  constructor(public data: string) {} // eslint-disable-line
}

export {
  SetSuperAdminsAction,
  UpdateSuperAdminAction,
  CreateSuperAdminAction,
  DeleteSuperAdminAction,
};
