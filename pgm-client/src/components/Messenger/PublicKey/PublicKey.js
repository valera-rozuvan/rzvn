import React, { useState } from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

function PublicKey({ friend, deleteFriend, setFriendId, openUpdate }) {


return (
  <div>
    <ListItem sx={{ display: { xs: 'flex', md: 'flex' } }}>
      <ListItemButton onClick={() => console.log(friend.name)}
        key={friend.id}
        sx={{ maxHeight: '1.5rem' }}
      >
        <ListItemText  align='left'>
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
