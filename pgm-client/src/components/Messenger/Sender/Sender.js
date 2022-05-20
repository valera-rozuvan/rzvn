import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ApiMessages } from '../../../api/apiMessages';

// import shortId from 'shortid'//probably, we dont need id generator here, we make it in Messenger

function Sender(props) {
  const dispatch = useDispatch();
  const [enteredMessage, setEnteredMessage] = useState('');
  // const [keyOfMessage,setKeyOfMessage] = useState(shortId.generate());

  const handleSubmitCreateMessage = event => {
    event.preventDefault();
    createMessage(enteredMessage);
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

