import { IUserState } from './reducers/userReducer';
import { ITextFieldState } from './reducers/textFieldReducer';

interface IStore {
  user: IUserState,
  textField: ITextFieldState,
}

export default IStore;
