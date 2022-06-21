import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ApiMessages } from '../../../api/apiMessages';


function Sender(props) {
  const currentFriendPublicKey = useSelector(state => state.currentFriend.publicKey);
  const currentFriendName = useSelector(state => state.currentFriend.name);
	const userPublicKey = useSelector(state => state.userKeys.userPublicKey);
  const dispatch = useDispatch();
  const [enteredMessage, setEnteredMessage] = useState('');

  async function handleSubmitCreateMessage(event) {
    event.preventDefault();
    await createMessage({text:enteredMessage,name:currentFriendName, recieverPublicKey:currentFriendPublicKey, senderPublicKey: userPublicKey});
    setEnteredMessage('');
  };

  async function createMessage(newMessageData) {

    async function createMessageApi() {
      try {
        const api = new ApiMessages();
        const result = await api.createMessage(newMessageData);
        console.log(result)
        const newMessage = result.data;
        console.log(newMessage)
        // console.log(newMessage.text)

        dispatch({ type: "CREATE_MESSAGE", data: newMessage });
      } catch (err) {
        console.log('Failed to create message');
        console.log(err);
      }

      return true;
    }

    await createMessageApi();

  };

  return (
    <ThemeProvider theme={theme}>
      <Container align='center' sx={{ position: 'fixed', bottom: 0 }}>
        <form onSubmit={handleSubmitCreateMessage}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel htmlFor='my-input'>message</InputLabel>
            <Input
              name="message"
              id='message-input'
              variant='outlined'
              autoComplete='off'
              type='text'
              aria-describedby='entered message'
              value={enteredMessage}
              onChange={event => setEnteredMessage(event.currentTarget.value)}>
            </Input>
            <FormHelperText id='my-helper-text'>enter your message</FormHelperText>
        </FormControl>
        <Button
          variant='outlined'
          size='small'
          type='submit'
          disabled={!enteredMessage}
          aria-label='send message button'>send</Button>
      </form>
    </Container>
    </ThemeProvider >

  );
}

export { Sender };

