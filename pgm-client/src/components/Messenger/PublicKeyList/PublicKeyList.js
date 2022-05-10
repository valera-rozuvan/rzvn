import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme';

import { PublicKey } from '../PublicKey/PublicKey';
import {PublicKeyCreate} from '../PublicKeyCreate/PublicKeyCreate'

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


function PublicKeyList() {
	const dispatch = useDispatch();
	const friends = useSelector(state => state.friends);
	const [openCreateWindow, setOpenCreateWindow] = useState(false);
	const [openUpdateWindow, setOpenUpdateWindow] = useState(false);
	const [loading, setLoading] = useState(true)
	const [friend, setFriend] = useState({ name: "", publicKey: "", userId: "" });
	const [friendUpdate, setFriendUpdate] = useState({ name: "", publicKey: "", userId: "", id: "" });


	const onInputChange = event => {
		const { name, value } = event.target;
		setFriend({ ...friend, [name]: value });
	};
	const onInputChangeUpdate = event => {
		const { name, value } = event.target;
		setFriendUpdate({ ...friendUpdate, [name]: value });
	};

	useEffect(() => {
		if (!loading) {
			return;
		}

		async function getAllFriends() {
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

	function handleSubmitCreate(event) {
		event.preventDefault();
		createFriend(friend);
		handleCloseCreate();
	};


	function handleSubmitUpdate(event) {
		event.preventDefault();
		updateFriend(friendUpdate.id, friendUpdate);
		handleCloseUpdate();
	};

	const handleClickOpen = () => {
		setOpenCreateWindow(true);
	};

	const handleCloseCreate = () => {
		setOpenCreateWindow(false);
		reset();
	};

	const handleCloseUpdate = () => {
		setOpenUpdateWindow(false);
		reset();
	};

	const reset = () => {
		setFriend({ name: "", publicKey: "", userId: "" })
	};

	function openUpdate(id) {
		const currentFriend = friends.find(friend => friend.id === id);
	 setFriendUpdate(currentFriend);
		setOpenUpdateWindow(true);
	}

	return (
		<ThemeProvider theme={theme}>
			<List align='center'>
				<Typography variant='h6'>friends</Typography>
				{
					friends.map(friend => {
						return (
							<PublicKey
								openUpdate={openUpdate}
								deleteFriend={deleteFriend}
								friend={friend}
								key={friend.id} />
						);
					})
				}
				<Button sx={{ mt: '2rem' }} variant='outlined'
					onClick={handleClickOpen} type='button'>add key</Button>
			</List>
			
<PublicKeyCreate
	openCreateWindow={openCreateWindow}
	handleSubmitCreate={handleSubmitCreate}
	handleCloseCreate={handleCloseCreate}
/>
				{/* <Dialog open={openCreateWindow}>
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
							<Button type='button' onClick={handleCloseCreate}>Cancel</Button>
							<Button type='submit'>Add key</Button>
						</DialogActions>
					</form>
				</Dialog>
		 */}
				<Dialog open={openUpdateWindow}>
					<form onSubmit={handleSubmitUpdate}>
						<DialogTitle>Edit public key</DialogTitle>
						<DialogContent>
							<DialogContentText>
							</DialogContentText>
							<Input
								name="name"
								onChange={onInputChangeUpdate}
								autoComplete='off'
								autoFocus
								value={friendUpdate.name}
								margin='dense'
								id='name'
								aria-describedby="friend's name"
								type='text' />
							<FormHelperText id='my-helper-text'>Write name of your friend</FormHelperText>
						</DialogContent>
						<DialogActions>
							<Button type='button' onClick={handleCloseUpdate}>Cancel</Button>
							<Button type='submit' >Update</Button>
						</DialogActions>
					</form>
				</Dialog>
			
		</ThemeProvider>
	);
}

export { PublicKeyList };

