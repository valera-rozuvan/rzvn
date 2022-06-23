import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

// import { Api } from '../../../api/apiFriends';

function PublicKey({ friend, deleteFriend, setFriendId, openUpdate }) {
  // const friends = useSelector(state => state.friends);
  const dispatch = useDispatch();
  const currentFriend = useSelector(state=> state.currentFriend)


  return (
    <div>
      <ListItem sx={{ display: { xs: 'flex', md: 'flex'}, border: currentFriend.publicKey === friend.publicKey? 1:0}}>
        <ListItemButton onClick={() => {
          const {name, publicKey, authorPublicKey} = friend;
          dispatch({ type: "CURRENT_FRIEND", data: { name, publicKey, authorPublicKey} });
          console.log(friend.name, friend.publicKey, friend.authorPublicKey)
        }}
          key={friend.id}
          sx={{ maxHeight: '1.5rem' }}
        >
          <ListItemText align='left'>
            <Typography variant='h9'>{friend.name}</Typography>
          </ListItemText>
        </ListItemButton>

        <IconButton onClick={() => {
          openUpdate(friend.id)
        }}>
          <EditIcon size='small' sx={{ cursor: 'pointer' }} />
        </IconButton>

        <IconButton onClick={() => {
          deleteFriend(friend.id);
        }}>
          <ClearIcon size='small' sx={{ cursor: 'pointer' }} />
        </IconButton>
      </ListItem>
    </div >
  );
}

export { PublicKey };
