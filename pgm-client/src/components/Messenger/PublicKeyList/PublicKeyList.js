import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme';

import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Api } from '../../../api/apiFriends';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PublicKey } from '../PublicKey/PublicKey';

function PublicKeyList() {
	const dispatch = useDispatch();
	const friends = useSelector(state => state.friends);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [friend, setFriend] = useState({ name: "", publicKey: "", userId: "" });

	const onInputChange = event => {
		const { name, value } = event.target;
		setFriend({ ...friend, [name]: value });
	};

	useEffect(() => {
		if (!loading) {
			return;
		}

		async function getAllFriends() {
			console.log('getAllFriends');
			try {
				const api = new Api();
				const result = await api.getFriends();
				const friendList = await result.data;

				dispatch({ type: 'SET_FRIENDS', data: friendList });

				setLoading(false);
			} catch (err) {
				console.log('Failed to fetch friends.');
			}
			return true;
		}

		setLoading(true);
		getAllFriends();
		setLoading(false);

	}, [loading, dispatch, friends]);


	async function deleteFriend(id) {

		setLoading(true);

		async function deleteFriendApi() {
			try {
				const api = new Api();
				await api.deleteFriend(id);

				dispatch({ type: 'DELETE_FRIEND', data: { id } });

			} catch (err) {
				console.log('something wrong with delete friend');
			}
			return true;
		}

		await deleteFriendApi(id);
		setLoading(false);
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

	function handleSubmit(event) {

		event.preventDefault();
		console.log('new key');
		createFriend(friend);
		handleClose();
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		reset();
	};

	const reset = () => {
		setFriend({ name: "", publicKey: "", userId: "" })
	};

	return (
		<ThemeProvider theme={theme}>
			<List align='center'>
				<Typography variant='h6'>friends</Typography>
				{
					friends.map(friend => {
						return (
							<PublicKey
								deleteFriend={deleteFriend}
								friend={friend}
								key={friend.id} />
						);
					})
				}
				<Button sx={{ mt: '2rem' }} variant='outlined'
					onClick={handleClickOpen} type='button'>add key</Button>
			</List>{open === true && (
				<Dialog open={open}>
					<form onSubmit={handleSubmit}>
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
							<Button type='button' onClick={handleClose}>Cancel</Button>
							<Button type='submit'>Add key</Button>
						</DialogActions>
					</form>
				</Dialog>
			)}
		</ThemeProvider>
	);
}

export { PublicKeyList };

