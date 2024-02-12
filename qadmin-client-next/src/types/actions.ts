enum EActionTypes {
  SET_NUMBER = 'SET_NUMBER',

  SET_TEXT = 'SET_TEXT',

  SET_APPS = 'SET_APPS',
  UPDATE_APP = 'UPDATE_APP',
  CREATE_APP = 'CREATE_APP',
  DELETE_APP = 'DELETE_APP',

  TRIGGER_VERIFICATION = 'TRIGGER_VERIFICATION',
  LOGIN = 'LOGIN',
  INIT_LOGOUT = 'INIT_LOGOUT',
  LOGIN_VERIFIED = 'LOGIN_VERIFIED',
  LOGOUT = 'LOGOUT',

  SET_SUPER_ADMINS = 'SET_SUPER_ADMINS',
  UPDATE_SUPER_ADMIN = 'UPDATE_SUPER_ADMIN',
  CREATE_SUPER_ADMIN = 'CREATE_SUPER_ADMIN',
  DELETE_SUPER_ADMIN = 'DELETE_SUPER_ADMIN',

  SET_USERS = 'SET_USERS',
  UPDATE_USER = 'UPDATE_USER',
  CREATE_USER = 'CREATE_USER',
  DELETE_USER = 'DELETE_USER',
}

export default EActionTypes;