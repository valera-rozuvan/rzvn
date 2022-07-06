// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// // import { useHistory } from "react-router-dom";
// import { generateKey } from 'openpgp/lightweight';

// // import { keysUpdated } from '../../redux/userAuthKey/keysSlice';


// const SignUp = () => {
//   const [name, setName] = useState('Test');
//   const [email, setEmail] = useState('test@email.com');
//   const [error, setError] = useState('');
//   const [keys, setKeys] = useState(useSelector(state => state.keys));

//   const dispatch = useDispatch();
//   // const history = useHistory();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name || !email) {
//       setError('Fill in both fields to generate key');
//       return;
//     }
//     const { privateKeyArmored: privateKey, publicKeyArmored: publicKey } =
//       await generateKey({
//         curve: 'curve25519',
//         userIDs: [{ name, email }],
//       });

//     dispatch(
//       // keysUpdated({
//       //   private: privateKey,
//       //   public: publicKey,
//       // }),
//     );
//     setKeys({ privateKey, publicKey });
//     // history.goBack();
//     console.log('go back');
//   };

//   return (
//     <div className='bg-for-landing bg-info '>
//       <div className='container info-container'>
//         <main className='main-landing-container main-info-pages'>
//           <form onSubmit={handleSubmit}>
//             <label className='info-text-keys'>Name&nbsp;
//               <input
//                 className='keys-input'
//                 type='text'
//                 value={name}
//                 onChange={e => setName(e.target.value)}
//               ></input>
//             </label>
//             <label className='info-text-keys'>&nbsp;Email&nbsp;
//               <input
//                 className='keys-input'
//                 type='text'
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//               ></input>
//             </label>
//             <button type='submit'>Generate</button>
//           </form>
//           <p hidden={!error} color='red'>{error}</p>
//           <p className='info-text-keys'> Private Key</p>
//           <textarea
//             rows='15'
//             cols='60'
//             defaultValue={keys.private}
//           />
//           <p className='info-text-keys'> Public Key</p>
//           <textarea
//             rows='13'
//             cols='60'
//             defaultValue={keys.public}
//           />
//         </main>
//       </div>
//     </div>
//   );
// };

// export { SignUp };
import React from 'react';
import {  useDispatch } from 'react-redux';
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
import { theme } from '../../theme';

import { Api } from '../../api/apiUser';

const UserSignUp = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({ userName: "", userPassword: "", id: "" });
    const navigate = useNavigate();

    const onInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    async function createUser(newUserData) {

        async function createUserApi() {
            try {
                const api = new Api();
                const result = await api.createUser(newUserData);
                const newUser = result.data;

                dispatch({ type: "CREATE_USER", data: newUser });
                navigate('/loginByKey');
            } catch (err) {
                console.log('Failed to create user');
            }

            return true;
        }

        await createUserApi();

    };

    function handleSubmitCreate(event) {
        event.preventDefault();
        createUser(user);
        setUser({ userName: "", userPassword: "", id: "" });

    };

    return (
        <ThemeProvider theme={theme}>
            <Container align='center' maxWidth='sm' sx={{ mt: '4rem' }}>
                <Typography variant='h5'>
                    Sign up page <br></br>
                    Please, create your account, first of all, and after that you will create public key for messaging
                </Typography>
                <form onSubmit={handleSubmitCreate}>
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
                            sx={{ mt: '2rem' }}>sign up</Button>
                    </Box>
                </form>
            </Container>
        </ThemeProvider>
    );
};
export { UserSignUp };
