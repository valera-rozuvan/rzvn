import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme';

import { PublicKey } from '../PublicKey/PublicKey';
import { PublicKeyCreate } from '../PublicKeyCreate/PublicKeyCreate'
import { PublicKeyUpdate } from '../PublicKeyUpdate/PublicKeyUpdate'

import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


import { Api } from '../../../api/apiFriends';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


function PublicKeyList() {
	const dispatch = useDispatch();
	const friends = useSelector(state => state.friends);
	const [openCreateWindow, setOpenCreateWindow] = useState(false);
	const [openUpdateWindow, setOpenUpdateWindow] = useState(false);
	const [loading, setLoading] = useState(true)
	const [friend, setFriend] = useState({ name: "", publicKey: "", authorPublicKey: "", userId: "" });
	const [friendUpdate, setFriendUpdate] = useState({ name: "", publicKey: "", authorPublicKey: "", userId: "", id: "" });
	const userPublicKey = useSelector(state => state.userKeys.userPublicKey);

	const onInputChangeUpdate = event => {
		const { name, value } = event.target;
		setFriendUpdate({ ...friendUpdate, [name]: value });
	};

	useEffect(() => {
		dispatch({ type: "CURRENT_FRIEND", data: { name:'', publicKey:'', authorPublicKey:''} });
		fetchData();
		async function fetchData(){
			if (!loading) {
				return;
			}
			async function getFriends(authorPublicKey) {
				try {
					const api = new Api();
					const result = await api.getFriendsOfCurrentUserPublicKey(authorPublicKey);
					const friendList = await result.data;
	
					dispatch({ type: 'SET_FRIENDS', data: friendList });
	
					setLoading(false);
				} catch (err) {
					console.log(err);
					console.log('Failed to fetch friends.');
				}
				return true;
			}
	
			setLoading(true);
			await getFriends(userPublicKey);
			setLoading(false);
		}


	}, [loading, dispatch, friends, userPublicKey]);


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
		setFriend({ name: "", publicKey: "", authorPublicKey: "", userId: "" })
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
				{ loading === true?
				<CircularProgress />:
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

