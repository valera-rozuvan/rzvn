interface IAppAuthReducerAction {
  type?: string;
  data?: string;
}

interface IAppAuthState {
  nonce: string;
  publicKey: string;
  redirectUrl: string;
}

const copyAppAuthState = ({
  nonce,
  publicKey,
  redirectUrl,
}: IAppAuthState): IAppAuthState => ({
  nonce,
  publicKey,
  redirectUrl,
});

const appAuthReducer = (state: IAppAuthState = { nonce: '', publicKey: '', redirectUrl: '' }, action: IAppAuthReducerAction) => {
  let newState = state;

  switch (action.type) {
    case 'SET_NONCE':
      if (typeof action.data !== 'string') {
        break;
      }

      newState = copyAppAuthState(state);
      newState.nonce = action.data;

      break;
    case 'SET_PUBLIC_KEY':
      if (typeof action.data !== 'string') {
        break;
      }

      newState = copyAppAuthState(state);
      newState.publicKey = action.data;

      break;
    case 'SET_REDIRECT_URL':
      if (typeof action.data !== 'string') {
        break;
      }

      newState = copyAppAuthState(state);
      newState.redirectUrl = action.data;

      break;
    default:
      break;
  }

  return newState;
};

export {
  appAuthReducer,
  IAppAuthState,
};
