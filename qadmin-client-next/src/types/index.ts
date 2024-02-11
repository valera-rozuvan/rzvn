import EActionTypes from './actions';

import {
  IAppsState,
  IAppsStateItem,
} from './apps';

import {
  IAuthUserState,
  EAuthUserAuthState,
} from './authUser';

import {
  ISuperAdminsStateItem,
  ISuperAdminsState,
} from './superAdmins';

import {
  IUsersStateItem,
  IUsersState,
} from './users';

interface IRootState {
  apps: IAppsState,
  users: IUsersState,
  authUser: IAuthUserState,
  superAdmins: ISuperAdminsState,
}

export {
  EActionTypes,

  IAppsState,
  IAppsStateItem,

  IAuthUserState,
  EAuthUserAuthState,

  ISuperAdminsStateItem,
  ISuperAdminsState,

  IUsersStateItem,
  IUsersState,

  IRootState,
};
