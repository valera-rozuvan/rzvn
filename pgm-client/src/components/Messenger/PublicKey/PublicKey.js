import React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

function PublicKey({ friend, deleteFriend }) {

  const onPublicKeyClick = (friend) => {
    // props.showActivePublicKeyMessaging(publicKey);
    console.log(friend);
  };
  // const { publicKey } = props;
  return (
    <div>
      <ListItem sx={{ display: { xs: 'flex', md: 'flex' } }}>
        <ListItemButton
          onClick={() => onPublicKeyClick(friend)}
          key={friend.id}
          sx={{ maxHeight: '1.5rem' }}
        >
          <ListItemText align='left'>
            <Typography variant='h9'>{friend.name}</Typography>
          </ListItemText>
        </ListItemButton>

        <IconButton>
          <EditIcon size='small' sx={{ cursor: 'pointer' }} />
        </IconButton>

        <IconButton onClick={() => {
          deleteFriend(friend.id);
        }}>
          <ClearIcon size='small' sx={{ cursor: 'pointer' }} />
        </IconButton>
      </ListItem>
    </div>
  );
}

export { PublicKey };

// <ListItem sx={{ display: { xs: 'flex', md: 'flex' } }} >
// <ListItemButton
// onClick={() => props.onPublicKeyClick(publicKey)} id={publicKey.key}
// sx={{ maxHeight: '1.5rem' }}>
// 	<ListItemText align="left">
// 		<Typography variant="h9">{publicKey.userName}</Typography>
// 	</ListItemText>
// </ListItemButton>
// <ClearIcon/>
// </ListItem>
