import { ICounterState } from './reducers/counterReducer';
import { ITextFieldState } from './reducers/textFieldReducer';

interface IRootState {
  counter: ICounterState,
  textField: ITextFieldState,
}

export default IRootState;
