import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function Header() {
  const navigate = useNavigate();

  const authUser = useSelector(state => state.authUser);
  const [isLoggedIn, setIsLoggedIn] = useState(!!(authUser && authUser.isLoggedIn));

  useEffect(() => {
    setIsLoggedIn(!!(authUser && authUser.isLoggedIn));
  }, [authUser]);

  function onLoginClickFn() {
    navigate(`/login`);
  }

  function onLogoutClickFn() {
    navigate(`/logout`);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          {isLoggedIn &&
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          }
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Uptime
          </Typography>
          {isLoggedIn ?
            <Button color='inherit' onClick={onLogoutClickFn}>Logout</Button>
            :
            <Button color='inherit' onClick={onLoginClickFn}>Login</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
