import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme'

import List from '@mui/material/List';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useState } from 'react'
import { AddKey } from '../AddKey/AddKey'
import { PublicKey } from "../PublicKey/PublicKey"
import './PublicKeyList.scss'



function PublicKeyList(props) {
	const [key, setKey] = useState('');

	// const [addKeyToggle, setAddKeyToggle] = useState(false);
	// const [loading, setLoading] = useState(true);/maby we will use it in future for loader for ex.
	const [open, setOpen] = React.useState(false);

	// const closeMe = () => {
	// 	setAddKeyToggle(false);
	// }
	// const addKeyOpen = () => {
	// 	console.log('key-open');
	// 	if (addKeyToggle === true) {
	// 		setAddKeyToggle(false)
	// 	} else {
	// 		setAddKeyToggle(true)
	// 	}
	// 	console.log(addKeyToggle);
	// }

	const handleSubmit = event => {
		event.preventDefault();
		console.log('new key');
		props.addPublicKey({ key });
		handleClose();
	}
	const onPublicKeyClick = (publicKey) => {
		props.showActivePublicKeyMessaging(publicKey);
	}
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		reset();
	};
	const reset = () => {
		setKey('');
}
	const { publicKeys } = props;
	return (
		<ThemeProvider theme={theme}>
			<List align="left"  >
				<Typography variant="h6" >public keys</Typography>
				{
					publicKeys.map(publicKey => {
						return (
							<PublicKey publicKey={publicKey}
								key={publicKey.key}
								onPublicKeyClick={onPublicKeyClick} />
						)
					})
				}
				<Button sx={{ mt: '2rem' }} variant="outlined"
					onClick={handleClickOpen} type="button">add key</Button>
			</List>{open === true && (
			
					<Dialog open={open} >
					<form onSubmit={handleSubmit} >
						<DialogTitle>Add new publick key</DialogTitle>
						<DialogContent>
							<DialogContentText>
							</DialogContentText>
							<InputLabel htmlFor="my-input">new public key</InputLabel>
							<Input
								onChange={event => setKey(event.currentTarget.value)}
								value={key}
								autoFocus
								margin="dense"
								id="new-key"
								aria-describedby="new public key"
								type="text" />
							<FormHelperText id="my-helper-text">Write new public key</FormHelperText>
						</DialogContent>
						<DialogActions>
							<Button type="button" onClick={handleClose}>Cancel</Button>
							<Button type="submit">Add key</Button>
						</DialogActions>
						</form>
					</Dialog>
		
			)}
			{/* <AddKey addPublicKey={props.addPublicKey} addKeyToggle={addKeyToggle} closeMe={closeMe}></AddKey> */}

		</ThemeProvider>
	)
}

export { PublicKeyList }

