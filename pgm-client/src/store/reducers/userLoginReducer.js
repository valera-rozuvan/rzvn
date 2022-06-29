
const copyUserInfo = ({ name, password}) => ({
    name,
    password
    });
  
  const defaultUserInfo = {
    name: "",
    password: "",
    };
  
    if (localStorage && localStorage.getItem) {
      const cachedUserInfo = ['name', 'password'];
      cachedUserInfo.forEach((userInfoData) => {
        const value = localStorage.getItem(userInfoData);
        if (typeof value === 'string' && value.length !== 0) {
          defaultUserInfo[userInfoData] = value;
        }
      });
    }
  const userLoginReducer = (state = defaultUserInfo, action) => {
  
      let newState = state;
    
      switch (action.type) {
  
        case 'SET_USER_LOGIN_INFO':
          if (!action.data) {
              break;
            }
  
          if (action.data.length === 0) {
            newState = [];
    
            break;
          }
          newState = {
            name: (typeof action.data.name === 'string') ? action.data.name : '',
            password: (typeof action.data.password === 'string') ? action.data.password : '',
              
            };
  
            if (localStorage && localStorage.setItem) {
              localStorage.setItem('userName', newState.name);
            //   localStorage.setItem('password', newState.password);
            }
      
            break;
       
        default:
          break;
      }
  
      return newState;
    };
    export {userLoginReducer}
    
    