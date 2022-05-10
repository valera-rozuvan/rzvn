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
import { useDispatch,useSelector } from 'react-redux';


function PublicKeyUpdate(props) {
	const dispatch = useDispatch();
	// const friends = useSelector(state => state.friends);
	const [loading, setLoading] = useState(true)

	async function updateFriend(id, updatedFriendData) {
		setLoading(true);
		async function updateFriendApi() {
			try {
				const api = new Api();
				const result = await api.updateFriend(id, updatedFriendData);
				const updatedFriend = result.data;

				dispatch({ type: "UPDATE_FRIEND", data: updatedFriend });
			} catch (err) {
				console.log('Failed to update friend')
			}
			return true;
		}

		await updateFriendApi();
		setLoading(false);
	};


	function handleSubmitUpdate(event) {
		event.preventDefault();
		updateFriend(props.friendUpdate.id, props.friendUpdate);
		props.handleCloseUpdate();
	};


	return (
		<ThemeProvider theme={theme}>
				<Dialog open={props.openUpdateWindow}>
					<form onSubmit={handleSubmitUpdate}>
						<DialogTitle>Edit public key</DialogTitle>
						<DialogContent>
							<DialogContentText>
							</DialogContentText>
							<Input
								name="name"
								onChange={props.onInputChangeUpdate}
								autoComplete='off'
								autoFocus
								value={props.friendUpdate.name}
								margin='dense'
								id='name'
								aria-describedby="friend's name"
								type='text' />
							<FormHelperText id='my-helper-text'>Write name of your friend</FormHelperText>
						</DialogContent>
						<DialogActions>
							<Button type='button' onClick={props.handleCloseUpdate}>Cancel</Button>
							<Button type='submit' >Update</Button>
						</DialogActions>
					</form>
				</Dialog>
			
		</ThemeProvider>
	);
}

export { PublicKeyUpdate };

