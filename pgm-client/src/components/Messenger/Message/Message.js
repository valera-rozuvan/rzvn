import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

function Message({text, senderPublicKey}) {
  const currentFriend = useSelector(state => state.currentFriend);
	const currentUserPublicKey = useSelector(state => state.userKeys.userPublicKey);


  function color() {
  return senderPublicKey === currentUserPublicKey ? '#ac9fbf' : '#f2b8ff';
  }
  function textAlign() {
    return senderPublicKey  === currentUserPublicKey  ? 'right' : 'left';
    console.log()
  }
  function getName() {
    return senderPublicKey === currentUserPublicKey  ? 'me' : `${currentFriend.name}`;
    console.log()
  }

  return (
    <ListItem sx={{ backgroundColor: color(), textAlign: textAlign() }}>
      <ListItemText>
        <Typography >{getName()}</Typography>
        <Typography >{text}</Typography>
      </ListItemText>
    </ListItem>
  );
}

export { Message };
