interface IRzvnAuthReducerAction {
  type?: string;
  data?: string;
}

interface IRzvnAuthState {
  token: string;
}

const copyRzvnAuthState = ({
  token,
}: IRzvnAuthState): IRzvnAuthState => ({
  token,
});

const rzvnAuthReducer = (state: IRzvnAuthState = { token: '' }, action: IRzvnAuthReducerAction) => {
  let newState = state;

  switch (action.type) {
    case 'SET_TOKEN':
      if (typeof action.data !== 'string') {
        break;
      }

      newState = copyRzvnAuthState(state);
      newState.token = action.data;

      break;
    default:
      break;
  }

  return newState;
};

export {
  rzvnAuthReducer,
  IRzvnAuthState,
};
