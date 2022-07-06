import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';

function Landing() {
  // const currentUser = useSelector(state=> state.user);
  const userName = useSelector(state=> state.user.name);

  function checkUser(){

    return userName ? 'msg': 'loginByKey';
      }

  return (
    <ThemeProvider theme={theme}>
      <Container align='center' maxWidth='sm' sx={{ mt: '4rem' }}>
        <Button variant='contained'>
       <Link to={checkUser()}>new message</Link> 
        </Button>
        <section>
          <List size='sm' sx={{ mt: '2rem' }}>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <LockOutlinedIcon sx={{ fontSize: '4rem' }}></LockOutlinedIcon>
                </ListItemIcon>
                <ListItemText>
                  <Typography variant='h6'>secure</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <ShieldOutlinedIcon sx={{ fontSize: '4rem' }}></ShieldOutlinedIcon>
                </ListItemIcon>
                <ListItemText>
                  <Typography variant='h6'>anonymous</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>

          </List>
        </section>
      </Container>
    </ThemeProvider>
  );
}

export { Landing };


