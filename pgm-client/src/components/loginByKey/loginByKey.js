import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';

import { ApiUserPublicKey } from '../../api/apiUserPublicKey';

import { useNavigate } from 'react-router-dom';


const LoginByKey = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(state => state.user.userName);
  const userId = useSelector(state => state.user.id);
  const [key, setKey] = useState({ userPublicKey: "", userName: userName, userId: userId });

  const onInputChange = event => {
    const { name, value } = event.target;
    setKey({ ...key, [name]: value });
  };

  async function createKey(newKeyData) {

    async function createKeyApi() {
      try {
        const api = new ApiUserPublicKey();
        const result = await api.createUserPublicKey(newKeyData);
        const newKey = result.data;

        dispatch({ type: "CREATE_USER_KEY", data: newKey });
        navigate('/msg');
      } catch (err) {
        console.log('Failed to create user key');

      }

      return true;
    }

    await createKeyApi();

  };

  function handleSubmitCreate(event) {
    console.log(userName, userId);
    event.preventDefault();
    createKey(key);
    setKey({ userPublicKey: "", userName: "", userId: "" });
  };



  return (

    <ThemeProvider theme={theme}>
      <Container align='center' maxWidth='sm' sx={{ mt: '4rem' }}>

        <Typography variant='h7'>In order to start messaging
          please provide your public
          and private keys.
          You should generate them
          using GPG (see instructions here)
        </Typography>
        <form onSubmit={handleSubmitCreate}>
          <Box display='block' sx={{ mt: '2rem' }}>
            <FormControl>
              <InputLabel htmlFor='my-input'>Public key</InputLabel>
              <Input
                id='public-key-input'
                aria-describedby='my-helper-text'
                name="userPublicKey"
                value={key.userPublicKey}
                onChange={onInputChange}
                type='text' />
              <FormHelperText id='my-helper-text'>Write your public key
                {/* value={keys.public} */}
              </FormHelperText>
            </FormControl>
          </Box>
          <Box display='block' sx={{ mt: '2rem' }}>
            <FormControl>
              <InputLabel htmlFor='my-input'>Private key</InputLabel>
              <Input
                id='private-key-input'
                aria-describedby='my-helper-text'
                type='text'
                name="privateKey"
                onChange={onInputChange}
                value={key.userPrivateKey} />
              <FormHelperText id='my-helper-text'>Write your private key
                {/* value={keys.private} */}
              </FormHelperText>
            </FormControl>
          </Box>
          <Box display='block' sx={{ mt: '2rem' }}>
            <Button
              type="submit"
              disabled={!key.userPublicKey}
            >
              <CheckCircleOutlinedIcon sx={{ fontSize: '4rem', color: '#ac9fbf' }}></CheckCircleOutlinedIcon>
            </Button>
          </Box>
        </form>
        <Link to='/keys/generate'>
          <Button variant='contained' sx={{ mt: '2rem' }}>or generate new</Button>
        </Link>
      </Container>
    </ThemeProvider>
  );
};
export { LoginByKey };
