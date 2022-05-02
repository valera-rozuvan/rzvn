import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme'
import { useState } from 'react';
// import shortId from 'shortid'//probably, we dont need id generator here, we make it in Messenger
import "./Sender.scss"



function Sender(props) {
	const [enteredMessage, setEnteredMessage] = useState('');
	// const [keyOfMessage,setKeyOfMessage] = useState(shortId.generate());

	const handleSubmit = event => {
		event.preventDefault();
		props.addNewMessage(event.target[0].value);

		setEnteredMessage('');
		// setKeyOfMessage('');
	}

	return (
			<ThemeProvider theme={theme}>
			<Container align="center" sx={{position:"fixed", bottom:0}} >
			<form onSubmit={handleSubmit}>
			<FormControl 	sx={{ width:"100%" }}>
				<InputLabel htmlFor="my-input">message</InputLabel>
				<Input id="my-input"
				variant="outlined"
				autoComplete="off"
				type="text"
				aria-describedby="my-helper-text"
				value={enteredMessage}
				onChange={event => setEnteredMessage(event.currentTarget.value)}>
				</Input>
				<FormHelperText id="my-helper-text">enter your message</FormHelperText>
			</FormControl>
	 <Button 
			variant="outlined" 
			size="small" 
			type="submit" 
			disabled={!enteredMessage} 
			aria-label="send message button" >send</Button> 
			</form>
			</Container>
		</ThemeProvider>

	)
}
export { Sender };

