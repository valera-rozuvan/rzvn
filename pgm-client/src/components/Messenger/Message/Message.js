import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

function Message(props) {
  function color() {
    return props.sender === 'me' ? '#ac9fbf' : '#f2b8ff';
  }

  function textAlign() {
    return props.sender === 'me' ? 'left' : 'right';
  }

  return (
    <ListItem sx={{ backgroundColor: color(), textAlign: textAlign() }}>
      <ListItemText>
        <Typography className='key-in-message '>{props.sender}</Typography>
        <Typography className='text-message'>{props.body}</Typography>
      </ListItemText>
    </ListItem>
  );
}

export { Message };
