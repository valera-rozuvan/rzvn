import React from 'react'
import { useSelector } from 'react-redux';
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
import { theme } from '../../theme'

const Login = () => {
	const keys = useSelector(state => state.keys);

	return (

		<ThemeProvider theme={theme}>
			<Container align="center" maxWidth="sm" sx={{ mt: "4rem" }}>

				<Typography variant="h7">In order to start messaging
					please provide your public
					and private keys.
					You should generate them
					using GPG (see instructions here)
				</Typography>

				<Box display="block" sx={{ mt: "2rem" }}>
					<FormControl>
						<InputLabel htmlFor="my-input">Public key</InputLabel>
						<Input id="my-input" aria-describedby="my-helper-text" type="text" />
						<FormHelperText id="my-helper-text">Write your public key
							{/* value={keys.public} */}
						</FormHelperText>
					</FormControl>
				</Box>
				<Box display="block" sx={{ mt: "2rem" }}>
					<FormControl >
						<InputLabel htmlFor="my-input">Private key</InputLabel>
						<Input id="my-input" aria-describedby="my-helper-text" type="text" />
						<FormHelperText id="my-helper-text">Write your private key
							{/* value={keys.private} */}
						</FormHelperText>
					</FormControl>
				</Box>
				<Box display="block" sx={{ mt: "2rem" }}>
					<Link className="check-key-link" to="/msg">
						<CheckCircleOutlinedIcon sx={{ fontSize: "4rem", color: '#ac9fbf' }}></CheckCircleOutlinedIcon>
					</Link>
				</Box>
				<Link to="/keys/generate">
					<Button variant="contained" sx={{ mt: "2rem" }}>or generate new</Button>
				</Link>
			</Container>
		</ThemeProvider>
	)
}
export { Login }
