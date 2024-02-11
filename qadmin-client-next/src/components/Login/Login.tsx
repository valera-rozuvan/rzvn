import React, {
  useEffect,
  useState,
  useMemo,
  SyntheticEvent,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AuthApi } from '../../api';
import { logApiError } from '../../api/tools';
import Loader from '../Loader';
import {
  IRootState,
  IAuthUserState,
  EActionTypes,
} from '../../types';
import MySwal from '../swal';

const theme = createTheme();

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector<IRootState, IAuthUserState>((state: IRootState): IAuthUserState => state.authUser);
  const authToken = useMemo(() => authUser.authToken, [authUser]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (typeof authToken === 'string' && authToken.length > 0) {
      navigate('/');
    }
  }, [navigate, authToken, loading]);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    async function getAuthToken(email: string, password: string) {
      let authData;

      try {
        const api = new AuthApi('');
        const response = await api.getAuthToken({ email, password });

        authData = response.data;
      } catch (err) {
        logApiError(err);

        await MySwal.fire({
          icon: 'error',
          title: 'Failed to login.',
        });

        authData = null;
      }

      return authData;
    }

    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const rawEmail = data.get('email');
    const email: string = (typeof rawEmail === 'string' && rawEmail.length) ? rawEmail : '';

    const rawPassword = data.get('password');
    const password: string = (typeof rawPassword === 'string' && rawPassword.length) ? rawPassword : '';

    setLoading(true);

    getAuthToken(email, password).then((authData) => {
      const newAuthToken = (authData) ? authData.authToken : '';

      if (typeof newAuthToken === 'string' && newAuthToken.length > 0) {
        dispatch({ type: EActionTypes.LOGIN, data: { authToken: newAuthToken, email, password } });
      }

      setLoading(false);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Loader />
      )
        : (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </Container>
        )}
    </ThemeProvider>
  );
}

export default Login;
