import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme';

import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Api } from '../../../api/apiFriends';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

function PublicKeyCreate(props) {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true)
	const [friend, setFriend] = useState({ name: "", publicKey: "", userId: "" });


	const onInputChange = event => {
		const { name, value } = event.target;
		setFriend({ ...friend, [name]: value });
	};

	async function createFriend(newFriendData) {

		setLoading(true);

		async function createFriendApi() {
			try {
				const api = new Api();
				const result = await api.createFriend(newFriendData);
				const newFriend = result.data;

				dispatch({ type: "CREATE_FRIEND", data: newFriend });
			} catch (err) {
				console.log('Failed to create friend');
			}

			return true;
		}

		await createFriendApi();
		setLoading(false);
	};

	function handleSubmitCreate(event) {
		event.preventDefault();
		createFriend(friend);
		props.handleCloseCreate();
		setFriend({ name: "", publicKey: "", userId: "" });
	};

	function handleCloseCancel(){
		props.handleCloseCreate();
		setFriend({ name: "", publicKey: "", userId: "" });
	}

	return (
		<ThemeProvider theme={theme}>
				<Dialog open={props.openCreateWindow}>
					<form onSubmit={handleSubmitCreate}>
						<DialogTitle>Add new public key</DialogTitle>
						<DialogContent>
							<DialogContentText>
							</DialogContentText>
							<Input
								name="publicKey"
								onChange={onInputChange}
								autoComplete='off'
								value={friend.publicKey}
								autoFocus
								margin='dense'
								id='new-key'
								aria-describedby="friend's public key"
								type='text' />
							<FormHelperText id='my-helper-text'>Write new public key</FormHelperText>
							<Input
								name="name"
								onChange={onInputChange}
								autoComplete='off'
								value={friend.name}
								margin='dense'
								id='name'
								aria-describedby="friend's name"
								type='text' />
							<FormHelperText id='my-helper-text'>Write name of your friend</FormHelperText>
						</DialogContent>
						<DialogActions>
							<Button type='button' onClick={handleCloseCancel}>Cancel</Button>
							<Button type='submit'>Add key</Button>
						</DialogActions>
					</form>
				</Dialog>
		</ThemeProvider>
	);
}

export { PublicKeyCreate };

