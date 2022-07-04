
const copyUserInfo = ({ name, password, id }) => ({
  name,
  password,
  id,
});

const defaultUserInfo = {
  name: "",
  password: "",
  id: "",
};

if (localStorage && localStorage.getItem) {
  const cachedUserInfo = ['name', 'password', 'id'];
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

      if ((!action.data.name) && (!action.data.password)) {
        break;
      }
      newState = {
        name: (typeof action.data.name === 'string') ? action.data.name : '',
        password: (typeof action.data.password === 'string') ? action.data.password : '',
        id: (typeof action.data.id === 'string') ? action.data.id : '',
      };

      if (localStorage && localStorage.setItem) {
        localStorage.setItem('name', newState.name);
        localStorage.setItem('password', newState.password);
        localStorage.setItem('id', newState.id);
      }

      break;

    case 'CHECK_USER':
      if (!action.data) {
        break;
      }

      if ((!action.data.name) && (!action.data.password)) {
        break;
      }
      newState = {
        name: (typeof action.data.name === 'string') ? action.data.name : '',
        password: (typeof action.data.password === 'string') ? action.data.password : '',
        id: (typeof action.data.id === 'string') ? action.data.id : '',
      };

      if (localStorage && localStorage.setItem) {
        localStorage.setItem('name', newState.name);
        localStorage.setItem('password', newState.password);
        localStorage.setItem('id', newState.id);
      }

      break;
    case 'CLEAR_USER':
      if (localStorage && localStorage.setItem) {
        localStorage.setItem('name', '');
        localStorage.setItem('password', '');
        localStorage.setItem('id', '');
      }
      newState = copyUserInfo({
        name: "",
        password: "",
        id: "",
      });

      break;
    default:
      break;
  }

  return newState;
};
export { userReducer }

