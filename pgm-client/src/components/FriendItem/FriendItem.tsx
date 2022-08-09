import React from 'react';
import s from './friendItem.module.scss';

interface IFriend {
  id: string,
  name: string,
  key: string,
  notes: string,
}
interface IProps {
  friend: IFriend,
  componentType: string,
  actionHandlers: any,
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
              componentType === 'friends'
              && <button type="button" className={s.friendEdit} onClick={actionHandlers.edit}>edit</button>
            }
            {
              componentType === 'groups'
              && <button type="button" className={s.friendEdit} onClick={actionHandlers.add}>add</button>
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
