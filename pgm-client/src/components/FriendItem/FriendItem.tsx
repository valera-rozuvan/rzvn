import React from 'react';
import s from './friendItem.module.scss';

interface IFriend {
  id: string,
  name: string,
  key: string,
  notes: string,
}

interface IActionHandlers {
  edit?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  add?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  remove?: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

interface IProps {
  friend: IFriend,
  componentType: string,
  actionHandlers: IActionHandlers,
}
function FriendItem({ friend, componentType, actionHandlers }: IProps) {
  return (
    <section className={s.friends}>
      <div className={s.innerContainer}>
        <section key={friend.id}>
          <div className={s.friendBox}>
            <p className={s.friendName}>{friend.name}</p>
            <p className={s.friendKey}>{friend.key}</p>
            {
              (componentType === 'friends' || componentType === 'friendList')
              && <button type="button" className={s.friendEditBtn} onClick={actionHandlers.edit}>edit</button>
            }
            {
              componentType === 'groupMembers'
              && <button type="button" className={s.friendAddBtn} onClick={actionHandlers.add}>add</button>
            }
            {
              componentType === 'memberList'
              && <button type="button" className={s.friendRemoveBtn} onClick={actionHandlers.remove}>remove</button>
            }
          </div>
          <p className={s.friendNotes}>
            notes:
            {friend.notes}
          </p>
        </section>
      </div>
    </section>
  );
}

export default FriendItem;
