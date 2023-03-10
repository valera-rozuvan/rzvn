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
      {
                (page === 'profile')
                && (
                <form className={s.form}>
                  <label htmlFor="myInput">
                    nickname
                    <input id="myInput" name="myInput" placeholder="user name" type="text" />
                  </label>
                </form>
                )
            }
      {
                (page === 'friends')
                && (
                <form className={s.form}>
                  <label htmlFor="myInput">
                    search pubkey, name, notes
                    <input id="myInput" name="myInput" placeholder="enter pubkey,name,notes" type="text" />
                  </label>
                </form>
                )
            }
      {
                (page === 'groups')
                && (
                <form className={s.form}>
                  <label htmlFor="myInput">
                    search pubkey, topics
                    <input id="myInput" name="myInput" placeholder="enter pubkey, topics" type="text" />
                  </label>
                </form>
                )
            }
      {
                (page === 'addGroup')
                && (
                <form className={s.form}>
                  <label htmlFor="myInput">
                    group topic
                    <input id="myInput" name="myInput" placeholder="enter group topic" type="text" />
                  </label>
                </form>
                )
            }
      {
                (page === 'addGroupFilter')
                && (
                <form className={s.form}>
                  <label htmlFor="myInput">
                    filter
                    <input id="myInput" name="myInput" placeholder="enter name of friend" type="search" />
                  </label>
                </form>
                )
            }
      {
                (page === 'friendPublicKey')
                && (
                <form className={s.form}>
                  <label htmlFor="myInput">
                    public key
                    <input id="myInput" name="myInput" placeholder="enter pubkey" type="text" />
                  </label>
                </form>
                )
            }
      {
                (page === 'friendNotes')
                && (
                <form className={s.form}>
                  <label htmlFor="myInput">
                    notes
                    <input id="myInput" name="myInput" placeholder="enter notes" type="text" />
                  </label>
                </form>
                )
            }
    </>
  );
}
export default SuperInput;
