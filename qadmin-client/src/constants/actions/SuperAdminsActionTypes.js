import { makeUniqueActionTypes } from "../../utils";

const SuperAdminsActionTypes = makeUniqueActionTypes({
  setSuperAdmins: 'SET_SUPER_ADMINS',
  updateSuperAdmin: 'UPDATE_SUPER_ADMIN',
  createSuperAdmin: 'CREATE_SUPER_ADMIN',
  deleteSuperAdmin: 'DELETE_SUPER_ADMIN',
});

export { SuperAdminsActionTypes };
