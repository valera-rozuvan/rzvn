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

import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const navigate = useNavigate();
    const keys = useSelector(state => state.keys);

    function handleSubmit(event) {
        event.preventDefault()
        if (!userName || !userPassword) {
            alert('Enter your user name and password please');
            return
        }
        dispatch({ type: "SET_USER_LOGIN_INFO", data: { name: userName, password: userPassword } })
        navigate('/loginByKeys');
        // if (((userName === 'Dasha') && (userPassword === "1234"))) {
        //     navigate('/loginByKeys');
        // }
    }

    return (

        <ThemeProvider theme={theme}>
            <Container align='center' maxWidth='sm' sx={{ mt: '4rem' }}>
                <Typography variant='h7'>
                    Please, login first of all and after that you will create public key for messaging
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box display='block' sx={{ mt: '2rem' }}>
                        <FormControl>
                            <InputLabel htmlFor='my-input'>User name</InputLabel>
                            <Input
                                id='user-name-input'
                                aria-describedby='my-helper-text'
                                name="userName"
                                value={userName}
                                onChange={event => setUserName(event.currentTarget.value)}
                                type='text' />
                            <FormHelperText id='my-helper-text'>Write your user name
                            </FormHelperText>
                        </FormControl>
                    </Box>
                    <Box display='block' sx={{ mt: '2rem' }}>
                        <FormControl>
                            <InputLabel htmlFor='my-input'>Password</InputLabel>
                            <Input
                                id='user-password-input'
                                aria-describedby='my-helper-text'
                                type='text'
                                name="userPassword"
                                onChange={event => setUserPassword(event.currentTarget.value)}
                                value={userPassword} />
                            <FormHelperText id='my-helper-text'>Write your password
                            </FormHelperText>
                        </FormControl>
                    </Box>
                    <Box display='block' sx={{ mt: '2rem' }}>
                        <Button
                            type="submit"
                            disabled={!userName || !userPassword}
                            variant='contained'
                            sx={{ mt: '2rem' }}>login</Button>
                    </Box>
                </form>
            </Container>
        </ThemeProvider>
    );
};
export { UserLogin };
