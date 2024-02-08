import { Reducer } from 'redux';

interface IUserKeyData {
  publicKeyFingerprint: string;
  privateKeyArmored: string;
  publicKeyArmored: string;
}

interface IUserState extends IUserKeyData {
  sessionToken: string;
}

enum IUserReducerActionType {
  SET_KEY_DATA = 'SET_KEY_DATA',
  SET_SESSION_TOKEN = 'SET_SESSION_TOKEN',
}

interface IUserReducerActionSetKeyData {
  type: IUserReducerActionType.SET_KEY_DATA;
  data: IUserKeyData;
}

interface IUserReducerActionSetSessionToken {
  type: IUserReducerActionType.SET_SESSION_TOKEN;
  data: string;
}

const initialUserState: IUserState = {
  publicKeyFingerprint: '',
  privateKeyArmored: '',
  publicKeyArmored: '',
  sessionToken: '',
};

function copyUserState({
  publicKeyFingerprint, privateKeyArmored, publicKeyArmored, sessionToken,
}: IUserState): IUserState {
  return {
    publicKeyFingerprint,
    privateKeyArmored,
    publicKeyArmored,
    sessionToken,
  };
}

const userReducer: Reducer<IUserState, IUserReducerActionSetKeyData | IUserReducerActionSetSessionToken> = (
  state: IUserState | undefined = initialUserState,
  action: IUserReducerActionSetKeyData | IUserReducerActionSetSessionToken,
): IUserState => {
  let newState = state;

  switch (action.type) {
    case IUserReducerActionType.SET_KEY_DATA:
      newState = { ...copyUserState(state), ...action.data };

      break;
    case IUserReducerActionType.SET_SESSION_TOKEN:
      newState = { ...copyUserState(state), ...{ sessionToken: action.data } };

      break;
    default:
      break;
  }

  return newState;
};

export {
  userReducer,
  IUserReducerActionType,
  IUserReducerActionSetKeyData,
  IUserReducerActionSetSessionToken,
  IUserKeyData,
  IUserState,
};
