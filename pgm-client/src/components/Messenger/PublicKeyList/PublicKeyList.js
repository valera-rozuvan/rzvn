import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme';

import { PublicKey } from '../PublicKey/PublicKey';
import { PublicKeyCreate } from '../PublicKeyCreate/PublicKeyCreate'
import { PublicKeyUpdate } from '../PublicKeyUpdate/PublicKeyUpdate'

import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Api } from '../../../api/apiFriends';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


function PublicKeyList() {
	const dispatch = useDispatch();
	const friends = useSelector(state => state.friends);
	// debugger;
	const [openCreateWindow, setOpenCreateWindow] = useState(false);
	const [openUpdateWindow, setOpenUpdateWindow] = useState(false);
	const [loading, setLoading] = useState(true)
	const [friend, setFriend] = useState({ name: "", publicKey: "",authorPublicKey: "", userId: "" });
	const [friendUpdate, setFriendUpdate] = useState({ name: "", publicKey: "",authorPublicKey: "", userId: "", id: "" });

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
				// debugger;
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
		setFriend({ name: "", publicKey: "",authorPublicKey: "", userId: "" })
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
						// debugger;
						return (
							<PublicKey
								openUpdate={ openUpdate}
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
				handleCloseCreate={handleCloseCreate}
			/>
			<PublicKeyUpdate
			  onInputChangeUpdate={onInputChangeUpdate}
			  friendUpdate={friendUpdate}
				setOpenUpdateWindow={setOpenUpdateWindow}
				openUpdateWindow={openUpdateWindow}
				handleCloseUpdate={handleCloseUpdate}
			/>

		</ThemeProvider>
	);
}

export { PublicKeyList };

