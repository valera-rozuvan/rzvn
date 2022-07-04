import { Link } from 'react-router-dom';
import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { theme } from '../../theme';
import { ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';

function Header() {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userName = useSelector(state => state.user.name);

  // function getUserName(){
  //   return localStorage.getItem('userName');
  // }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch({ type: "CLEAR_USER"});
    navigate('/');
  };
  return (
    <ThemeProvider theme={theme}>
      <header>
        <AppBar position='fixed' color='primary'>
          <Container maxWidth='xl'>
            <Toolbar disableGutters>
              <Link to='/'>
                <Typography
                  variant='h6'
                  noWrap
                  component='div'
                  sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                  PG
                </Typography>
              </Link>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleOpenNavMenu}
                  color='inherit'
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <Link to='/about'>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign='center'>About us</Typography>
                    </MenuItem>
                  </Link>
                  <Link to='/license'>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign='center'>License</Typography>
                    </MenuItem>
                  </Link>
                  <Link to='/contact'>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign='center'>Contact us</Typography>
                    </MenuItem>
                  </Link>
                </Menu>
              </Box>

              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              ><Link to='/'>PG</Link>

              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Link to='/about'>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    About us
                  </Button>
                </Link>
                <Link to='/license'>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    License
                  </Button>
                </Link>
                <Link to='/contact'>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Contact us
                  </Button>
                </Link>
              </Box>
              <Box>
                <Typography>{userName}</Typography>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <HomeIcon></HomeIcon>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Link to='/userSignUp'>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>sign up</Typography>
                  </MenuItem>
                  </Link>
                  <Link to='/userLogin'>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign='center'>login</Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign='center'>logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </header>
    </ThemeProvider>
  );
};
export { Header };
