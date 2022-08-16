import React from 'react';
import s from './superInput.module.scss';

// interface IActionHandlers {
//   onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
// }
interface IProps {
    page: string,
    //   actionHandlers: IActionHandlers,
}

function SuperInput({ page }: IProps) {
  return (
    <>
      {/* {
                (typeStyle === 'green')
                && <button type="button" className={s.greenBtn} onClick={actionHandlers.onClick}>{text}</button>
            } */}
      {
                (page === 'profile')
                && (
                <form className={s.form}>
                  <label htmlFor="userName">
                    nickname
                    <input id="userName" name="userName" placeholder="user name" type="text" />
                  </label>
                </form>
                )
            }
    </>
  );
}
export default SuperInput;
