import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Message } from '../Message/Message'
import { Sender } from '../Sender/Sender';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme';

import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { ApiMessages } from '../../../api/apiMessages';
import { ApiUserPublicKey } from '../../../api/apiUserPublicKey';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MessageList(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const messages = useSelector(state => state.messages);
	const userPublicKeys = useSelector(state => state.userKeys);
	const userId = useSelector(state => state.user.id);
	const currentFriendPublicKey = useSelector(state => state.currentFriend.publicKey);
	const [oldCurrentFriendPublicKey, setOldCurrentFriendPublicKey] = useState('');
	const userPublicKey = useSelector(state => state.userKeys.userPublicKey);
	const messagesEndRef = useRef(null);
	const [loading, setLoading] = useState(true)
	const [currentUserPublicKey, setCurrentUserPublicKey] = useState('');

	useEffect(() => {
		if (oldCurrentFriendPublicKey !== currentFriendPublicKey) {
			setOldCurrentFriendPublicKey(currentFriendPublicKey)
			setLoading(true);
		}
	}, [loading, setLoading, currentFriendPublicKey, oldCurrentFriendPublicKey])

	useEffect(() => {
		async function fetchData() {
			scrollToBottom();
			if (!loading) {
				return;
			}
			function scrollToBottom() {
				return messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
			};
			async function getAllUserPublicKeys(userId) {
				try {
					const api = new ApiUserPublicKey();
					const result = await api.getAllUserPublicKeys(userId);
					const publicKeysList = await result.data;

					dispatch({ type: 'SET_USER_KEYS', data: publicKeysList });


				} catch (err) {
					console.log('Failed to fetch users public keys.');
				}
				return true;
			}
			async function getAllMessages() {
				try {
					const api = new ApiMessages();
					const result = await api.getMessages();
					const messageList = await result.data;
					const messagesWithCurrentFriend = await messageList.filter(message => {
						return ((message.recieverPublicKey === currentFriendPublicKey) || (message.senderPublicKey === currentFriendPublicKey)) &&
							((message.recieverPublicKey === userPublicKey) || (message.senderPublicKey === userPublicKey))
					})
					console.log(messagesWithCurrentFriend);

					dispatch({ type: 'SET_MESSAGES', data: messagesWithCurrentFriend });

					setLoading(false);

				} catch (err) {
					console.log('Failed to fetch messages.');
				}
				return true;
			}
			setLoading(true);
			await getAllUserPublicKeys(userId)
			await getAllMessages();
			setLoading(false);
		}
		fetchData();


	}, [messages, loading, currentFriendPublicKey, oldCurrentFriendPublicKey, userPublicKey, dispatch, userId]);

	function handleChangeUserPublicKey(event) {
		setCurrentUserPublicKey(event.target.value);
	}


	async function deleteUserPublicKey(id) {

		async function deleteUserPublicKeyApi() {
			try {
				const api = new ApiUserPublicKey();
				await api.deleteUserPublicKey(id);

				dispatch({ type: 'DELETE_USER_KEY', data: { id } });

			} catch (err) {
				console.log('something wrong with delete user public key');
			}
			return true;
		}
		await deleteUserPublicKeyApi(id);
	};

	return (
		<ThemeProvider theme={theme}>

			<Container>
				<Box width='200px'>
					<TextField
						label="Select public key"
						select
						value={currentUserPublicKey}
						onChange={handleChangeUserPublicKey}
						fullWidth
					>{userPublicKeys &&
						userPublicKeys.map(({ userPublicKey, id, userName }) => {
							return (<MenuItem
								value={userPublicKey}
								key={id}
								name={userName}
							>{userPublicKey}
								<Button>
									<DeleteForeverIcon
										onClick={()=>deleteUserPublicKey(id)}
										color='secondary'></DeleteForeverIcon>
								</Button>
							</MenuItem>)
						})
						}
					</TextField>
				</Box>
				<Button onClick={() => navigate('/loginByKey')} variant='outlined'>add new key</Button>
				<Box sx={{ width: "100%", height: "360px", overflowY: "scroll" }}>
					<List >
						{loading === true ?
							<Box sx={{ width: '100%' }}>
								<LinearProgress />
							</Box> :
							messages &&
							messages.map(({ text, id, name, senderPublicKey, recieverPublicKey }) => {
								return (<Message
									text={text}
									id={id}
									key={id}
									name={name}
									senderPublicKey={senderPublicKey}
									recieverPublicKey={recieverPublicKey}
								/>
								)
							})
						}
						<Box
							style={{ backgroundColor: "#fcba03", float: "left", clear: "both", paddingTop: "1em", paddingBottom: "1em" }}
							ref={messagesEndRef}>
						</Box>
					</List>
					<Sender />
				</Box>
			</Container>
		</ThemeProvider>
	);
}

export { MessageList };


