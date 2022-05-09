import { AppsActionTypes } from '../../constants/actions/AppsActionTypes';

const copyAppItem = ({id, serviceName, publicKey, privateKey, isActive, callbackUrl, createdAt}) => ({
  id,
  serviceName,
  publicKey,
  privateKey,
  isActive,
  callbackUrl,
  createdAt,
});

const appsReducer = (state = [], action) => {
  let newState = state;

  switch (action.type) {
    case AppsActionTypes.setApps:
      if (!Array.isArray(action.data)) {
        break;
      }

      if (action.data.length === 0) {
        newState = [];

        break;
      }

      newState = action.data.map((item) => copyAppItem(item));

      break;

    case AppsActionTypes.updateApp:
      if (!action.data || !action.data.id) {
        break;
      }

      if (state.length === 0) {
        newState = [copyAppItem(action.data)];

        break;
      }

      let updatedExisting = false;
      newState = state.map((item) => {
        if (item.id === action.data.id) {
          updatedExisting = true;
          return copyAppItem(action.data);
        }

        return copyAppItem(item);
      });
      if (!updatedExisting) {
        newState.push(copyAppItem(action.data));
      }

      break;

    case AppsActionTypes.createApp:
      if (!action.data) {
        break;
      }

      newState = state.map((item) => copyAppItem(item));
      newState.push(copyAppItem(action.data));

      break;

    case AppsActionTypes.deleteApp:
      if (!action.data || !action.data.id) {
        break;
      }

      newState = [];
      state.forEach((item) => {
        if (item.id === action.data.id) {
          return;
        }

        newState.push(copyAppItem(item));
      });

      break;

    default:
      break;
  }

  return newState;
};

export { appsReducer };
