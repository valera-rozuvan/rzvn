import React from 'react';
import s from './superButton.module.scss';

interface IActionHandlers {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
}
interface IProps {
  typeStyle: string,
  text: string,
  actionHandlers: IActionHandlers,
}

function SuperButton({ typeStyle, text, actionHandlers }: IProps) {
  return (
    <>
      {
        (typeStyle === 'green')
        && <button type="button" className={s.greenBtn} onClick={actionHandlers.onClick}>{text}</button>
      }
      {
        (typeStyle === 'yellow')
        && <button type="button" className={s.yellowBtn} onClick={actionHandlers.onClick}>{text}</button>
      }
      {
        (typeStyle === 'red')
        && <button type="button" className={s.redBtn} onClick={actionHandlers.onClick}>{text}</button>
      }
      {
        (typeStyle === 'purple')
        && <button type="button" className={s.purpleBtn} onClick={actionHandlers.onClick}>{text}</button>
      }
    </>
  );
}
export default SuperButton;
