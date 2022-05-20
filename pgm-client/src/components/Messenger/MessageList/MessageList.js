import React from 'react';
import { useState, useEffect, useRef } from 'react';
// import { Message } from '../Message/Message'
import { Sender } from '../Sender/Sender';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme';

// import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// import Typography from '@mui/material/Typography';

function MessageList(props) {
  // const [messages] = useState([]);
  // const messagesEndRef = useRef(null);

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  // const scrollToBottom = () => {
  //   return messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  return (
    <ThemeProvider theme={theme}>

      <Container>
        <Box>
          {/* <Typography
						variant="h6">messages from {props.activeKey.publicKey}
					</Typography>
				</Box>
				<Box sx={{ width: "100%", height: "400px", overflowY: "scroll" }}>
					<List >
						{
							props.activeKey.messages.map(({ sender, body, key }) => {
								return (<Message sender={sender} body={body} key={key} />
								)
							})

						}
						<Box
							style={{ float: "left", clear: "both", paddingTop: "1em", paddingBottom: "1em" }}
							ref={messagesEndRef}>
						</Box>
					</List> */}
          <Sender/>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export { MessageList };
