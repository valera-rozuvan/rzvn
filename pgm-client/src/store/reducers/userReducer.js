
const copyUserInfo = ({ userName, userPassword, id }) => ({
  userName,
  userPassword,
  id,
});

const defaultUserInfo = {
  userName: "",
  userPassword: "",
  id: "",
};

if (localStorage && localStorage.getItem) {
  const cachedUserInfo = ['userName', 'userPassword', 'id'];
  cachedUserInfo.forEach((userInfoData) => {
    const value = localStorage.getItem(userInfoData);
    if (typeof value === 'string' && value.length !== 0) {
      defaultUserInfo[userInfoData] = value;
    }
  });
}
const userReducer = (state = defaultUserInfo, action) => {

  let newState = state;

  switch (action.type) {

    case 'CREATE_USER':
      if (!action.data) {
        break;
      }

      if ((!action.data.userName) && (!action.data.userPassword)) {
        break;
      }
      newState = {
        userName: (typeof action.data.userName === 'string') ? action.data.userName : '',
        userPassword: (typeof action.data.userPassword === 'string') ? action.data.userPassword : '',
        id: (typeof action.data.id === 'string') ? action.data.id : '',
      };

      if (localStorage && localStorage.setItem) {
        localStorage.setItem('userName', newState.userName);
        localStorage.setItem('userPassword', newState.userPassword);
        localStorage.setItem('id', newState.id);
      }

      break;

    case 'CHECK_USER':
      if (!action.data) {
        break;
      }

      if ((!action.data.userName) && (!action.data.userPassword)) {
        break;
      }
      newState = {
        userName: (typeof action.data.userName === 'string') ? action.data.userName : '',
        userPassword: (typeof action.data.userPassword === 'string') ? action.data.userPassword : '',
        id: (typeof action.data.id === 'string') ? action.data.id : '',
      };

      if (localStorage && localStorage.setItem) {
        localStorage.setItem('userName', newState.userName);
        localStorage.setItem('userPassword', newState.userPassword);
        localStorage.setItem('id', newState.id);
      }

      break;
    case 'CLEAR_USER':
      if (localStorage && localStorage.setItem) {
        localStorage.setItem('userName', '');
        localStorage.setItem('userPassword', '');
        localStorage.setItem('id', '');
      }
      newState = copyUserInfo({
        userName: "",
        userPassword: "",
        id: "",
      });

      break;
    default:
      break;
  }

  return newState;
};
export { userReducer }

