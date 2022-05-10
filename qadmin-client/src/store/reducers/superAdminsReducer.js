import { SuperAdminsActionTypes } from '../../constants/actions/SuperAdminsActionTypes';

const copySuperAdminItem = ({id, email, password, isActive, createdAt}) => ({
  id,
  email,
  password,
  isActive,
  createdAt,
});

const superAdminsReducer = (state = [], action) => {
  let newState = state;

  switch (action.type) {
    case SuperAdminsActionTypes.setSuperAdmins:
      if (!Array.isArray(action.data)) {
        break;
      }

      if (action.data.length === 0) {
        newState = [];

        break;
      }

      newState = action.data.map((item) => copySuperAdminItem(item));

      break;

    case SuperAdminsActionTypes.updateSuperAdmin:
      if (!action.data || !action.data.id) {
        break;
      }

      if (state.length === 0) {
        newState = [copySuperAdminItem(action.data)];

        break;
      }

      let updatedExisting = false;
      newState = state.map((item) => {
        if (item.id === action.data.id) {
          updatedExisting = true;
          return copySuperAdminItem(action.data);
        }

        return copySuperAdminItem(item);
      });
      if (!updatedExisting) {
        newState.push(copySuperAdminItem(action.data));
      }

      break;

    case SuperAdminsActionTypes.createSuperAdmin:
      if (!action.data) {
        break;
      }

      newState = state.map((item) => copySuperAdminItem(item));
      newState.push(copySuperAdminItem(action.data));

      break;

    case SuperAdminsActionTypes.deleteSuperAdmin:
      if (!action.data || !action.data.id) {
        break;
      }

      newState = [];
      state.forEach((item) => {
        if (item.id === action.data.id) {
          return;
        }

        newState.push(copySuperAdminItem(item));
      });

      break;

    default:
      break;
  }

  return newState;
};

export { superAdminsReducer };
