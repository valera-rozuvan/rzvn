import { makeUniqueActionTypes } from "../../utils";

const AuthUserActionTypes = makeUniqueActionTypes({
  login: 'LOGIN',
  initLogout: 'INIT_LOGOUT',
  loginVerified: 'LOGIN_VERIFIED',
  logout: 'LOGOUT',
});

export { AuthUserActionTypes };
