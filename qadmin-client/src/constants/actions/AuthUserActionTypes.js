import { makeUniqueActionTypes } from "../../utils";

const AuthUserActionTypes = makeUniqueActionTypes({
  triggerVerification: 'TRIGGER_VERIFICATION',
  login: 'LOGIN',
  initLogout: 'INIT_LOGOUT',
  loginVerified: 'LOGIN_VERIFIED',
  logout: 'LOGOUT',
});

export { AuthUserActionTypes };
