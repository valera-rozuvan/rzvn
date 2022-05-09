// Library deps
import React, {useEffect, useState, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import {AuthApi} from "../../api";
import {logApiError} from "../../api/tools";

import Loader from "../Loader";
import MySwal from "../../index";
import {AuthUserActionTypes} from '../../constants/actions/AuthUserActionTypes';

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector(state => state.authUser);
  const authToken = useMemo(() => authUser.authToken, [authUser]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (typeof authToken === 'string' && authToken.length > 0) {
      console.log('login :: authToken is present -> redirect to "/"');

      navigate('/');
    }
  }, [navigate, authToken, loading]);

  const handleSubmit = async (event) => {
    async function getAuthToken(email, password) {
      try {
        const api = new AuthApi("");
        const response = await api.getAuthToken({email, password});
        const authData = response.data;

        if (!authData) {
          console.error('"authData" is not defined');
          return;
        }

        if (typeof authData.jwtToken !== 'string') {
          console.error('"authData.jwtToken" is not a string');
          return;
        }

        if (authData.jwtToken.length === 0) {
          console.error('"authData.jwtToken" is of length 0');
          return;
        }

        dispatch({type: AuthUserActionTypes.login, data: { authToken: authData.jwtToken, email, password }});
      } catch (err) {
        logApiError(err);

        await MySwal.fire({
          icon: "error",
          title: "Failed to login."
        });
      }
    }

    setLoading(true);

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');

    getAuthToken(email, password).then(() => {
      console.log("login op end");

      setLoading(false);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
          <Loader/>
        ) :
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
              <LockOutlinedIcon/>
            </Avatar>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
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
                sx={{mt: 3, mb: 2}}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Container>
      }
    </ThemeProvider>
  );
}
