import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Message } from '../Message/Message'
import { Sender } from '../Sender/Sender';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';

import { ApiMessages } from '../../../api/apiMessages';
import { TextField } from '@mui/material';

function MessageList(props) {
	const dispatch = useDispatch();
	const messages = useSelector(state => state.messages);
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
	}, [loading, setLoading, currentFriendPublicKey])

	useEffect(() => {
		async function fetchData() {
			scrollToBottom();
			if (!loading) {
				return;
			}
			function scrollToBottom() {
				return messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
			};
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
			await getAllMessages();
			setLoading(false);
		}
		fetchData();


	}, [messages, loading, currentFriendPublicKey,oldCurrentFriendPublicKey, userPublicKey, dispatch]);

	function handleChangeUserPublicKey(event){
		setCurrentUserPublicKey(event.target.value);
	}


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
					>
						<MenuItem value='745'>test 745</MenuItem>
						<MenuItem value='888'>test 888</MenuItem>
						<MenuItem value='666'>test 666</MenuItem>
					</TextField>
					{/* <Typography
						variant="h6">user public key: {userPublicKey}
					</Typography> */}
				</Box>
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


