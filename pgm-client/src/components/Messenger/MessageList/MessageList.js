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
  const messages = useSelector(state=>state.messages);
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    scrollToBottom();
if (!loading) {
			return;
		}


    async function getAllMessages() {
			try {
				const api = new ApiMessages();
				const result = await api.getMessages();
				const messageList = await result.data;

				dispatch({ type: 'SET_MESSAGES', data: messageList });

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
						{
							messages.map(({ text, id, name}) => {
								return (<Message text={text} id={id} key={id} name={name} />
								)
							})

						}
						<Box
							style={{backgroundColor:"#fcba03", float: "left", clear: "both", paddingTop: "1em", paddingBottom: "1em" }}
							ref={messagesEndRef}>
						</Box>
					</List>
          <Sender/>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export { MessageList };
