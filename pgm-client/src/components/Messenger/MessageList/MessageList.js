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

import { ApiMessages } from '../../../api/apiMessages';

function MessageList(props) {
	const dispatch = useDispatch();
	const messages = useSelector(state => state.messages);
	const currentFriend = useSelector(state => state.currentFriend);
	const userPublicKey = useSelector(state => state.userKeys.userPublicKey);
	const messagesEndRef = useRef(null);
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		scrollToBottom();
		if (!loading) {
			return;
		}

		function messagesWithCurrentFriend() {
			const messagesWithOne = messages.filter(message => {
				const currentFriendPublicKeyIsExist = message.recieverPublicKey || message.senderPublicKey === currentFriend.publicKey;
				const userPublicKeyIsExist = message.recieverPublicKey || message.senderPublicKey === userPublicKey;
				return currentFriendPublicKeyIsExist && userPublicKeyIsExist === true?  message : false;
			}) 
			console.log(messagesWithOne);
		}
		messagesWithCurrentFriend()


		async function getAllMessages() {
			try {
				// const messagesWithCurrentFriend = await messages.filter(message => {
				// 	if (message.recieverPublicKey || message.senderPublicKey === currentFriend &&
				// 		message.recieverPublicKey || message.senderPublicKey === userPublicKey)
				// 		return message;
				// })
				// const api = new ApiMessages();
				// const result = await api.getMessages();
				// const messageList = await result.data;

				// dispatch({ type: 'SET_MESSAGES', data: messageList });
				// console.log(messagesWithCurrentFriend);
				setLoading(false);

			} catch (err) {
				console.log('Failed to fetch messages.');
			}
			return true;
		}

		setLoading(true);
		getAllMessages();

		setLoading(false);


	}, [messages, loading]);

	const scrollToBottom = () => {
		return messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};


	return (
		<ThemeProvider theme={theme}>

			<Container>
				<Box>
					<Typography
						variant="h6">messages from
					</Typography>
				</Box>
				<Box sx={{ width: "100%", height: "400px", overflowY: "scroll" }}>
					<List >
						{/* {messagesWithCurrentFriend.length <= 0 ?
							<Typography>No messages with ${currentFriend.name} yet</Typography> :
							messagesWithOne.map(({ text, id, name }) => {
								return (<Message text={text} id={id} key={id} name={name} />
								)
							})
						} */}
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



// async function getAllMessages() {
// 	try {
// 		const api = new ApiMessages();
// 		const result = await api.getMessages();
// 		const messageList = await result.data;

// 		dispatch({ type: 'SET_MESSAGES', data: messageList });

// 		setLoading(false);

// 	} catch (err) {
// 		console.log('Failed to fetch messages.');
// 	}
// 	return true;
// }

// setLoading(true);
// getAllMessages();
// setLoading(false);


// }, [messages, loading]);