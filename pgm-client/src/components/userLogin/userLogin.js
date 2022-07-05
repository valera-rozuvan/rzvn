import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';

import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { theme } from '../../theme';


import { Api } from '../../api/apiLogin';

const UserLogin = () => {
    const dispatch = useDispatch();
    const keys = useSelector(state => state.userKeys)
    // const [userName, setUserName] = useState("");
    // const [userPassword, setUserPassword] = useState("");
    const [user, setUser] = useState({ userName: "", userPassword: "", id: "" });
    const navigate = useNavigate();
    // const keys = useSelector(state => state.keys);

    const onInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    async function checkUser(newUserData) {
        async function checkUserApi() {
            try {
                const api = new Api();
                const result = await api.checkUserIsExist(newUserData);
                const newUser = result.data;

                dispatch({ type: "CHECK_USER", data: newUser });
                navigate('/loginByKey');
            } catch (err) {
                alert('Failed to login');
            }

            return true;
        }

        await checkUserApi();

    };

    function handleSubmitCheckUser(event) {
        event.preventDefault();
        checkUser(user);
        setUser({ userName: "", userPassword: "", id: "" });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container align='center' maxWidth='sm' sx={{ mt: '4rem' }}>
                <Typography variant='h4'>
                    Login page
                </Typography>
                <form onSubmit={handleSubmitCheckUser}>
                    <Box display='block' sx={{ mt: '2rem' }}>
                        <FormControl>
                            <InputLabel htmlFor='my-input'>User name</InputLabel>
                            <Input
                                id='user-name-input'
                                aria-describedby='my-helper-text'
                                name="userName"
                                value={user.userName}
                                onChange={onInputChange}
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
                                value={user.userPassword}
                                onChange={onInputChange} />
                            <FormHelperText id='my-helper-text'>Write your password
                            </FormHelperText>
                        </FormControl>
                    </Box>
                    <Box display='block' sx={{ mt: '2rem' }}>
                        <Button
                            type="submit"
                            disabled={!user.userName || !user.userPassword}
                            variant='contained'
                            sx={{ mt: '2rem' }}>login</Button>
                    </Box>
                </form>
            </Container>
        </ThemeProvider>
    );
};
export { UserLogin };
