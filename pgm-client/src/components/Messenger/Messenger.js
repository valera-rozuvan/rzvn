import React, { Component } from 'react'
import axios from 'axios'
import './Messenger.scss'

import { PublicKeyList } from './PublicKeyList/PublicKeyList'
import { MessageList } from './MessageList/MessageList'
// import { Search } from './Search/Search'
// import { Sender } from './Sender/Sender'
import shortId from 'shortid'
import LinearProgress from '@mui/material/LinearProgress';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme'

class Messenger extends Component {
	state = {
		publicKeys: [],
		activeKey: {
			activeKey: '',
			messages: []
		},
	}
	componentDidMount() {
		this.setState({
			loading: true,
		})
		setTimeout(async () => {
			const response = await axios.get(`http://localhost:5555/publicKeys`)
			this.setState({
				publicKeys: response.data
			})
			this.setState({
				loading: false,
			})
		}, 500)

	}
	showActivePublicKeyMessaging = (publicKey) => {
		this.setState({
			loading: true,
		})
		setTimeout(() => {
			this.setState({
				activeKey: publicKey,
			})
			this.setState({
				loading: false,
			})
		}, 1000)
	}
	addPublicKey = ({ key }) => {
		if (this.state.publicKeys.some(publicKey => publicKey.publicKey === key)) {
			console.log(alert(`${key} is already in your list`));
			return;
		}
		const newKey = {
			key: shortId.generate(),
			publicKey: key,
			messages: []
		}
		const newKeys = this.state.publicKeys;
		newKeys.push(newKey);
		this.setState({ publicKeys: newKeys });
	}
	addNewMessage = (message) => {
		const oldMessages = this.state.activeKey.messages;
		oldMessages.push({
			"sender": "me",
			"body": message,
			"key": shortId.generate(),
		})
		this.setState({
			activeKey: {
				messages: oldMessages,
			}
		})
	}

	render() {
		const { activeKey, publicKeys } = this.state
		return (
			<ThemeProvider theme={theme}>
				<section>
					{/* <Search /> */}
					{/* <Container align="center" sx={{height:"50%",display:"flex",backgroundColor:"#a17645"}}> */}
					<Box align="center" display="flex" >
						{/* sx={{  display:{ xs: 'block', md: 'block' } }} */}
						{this.state.loading ?
							<Box sx={{ width: '100%' }}>
								<LinearProgress />
							</Box> : <MessageList activeKey={activeKey} addNewMessage={this.addNewMessage} />}
						<PublicKeyList
							addPublicKey={this.addPublicKey}
							publicKeys={publicKeys}
							showActivePublicKeyMessaging={this.showActivePublicKeyMessaging} />
					</Box>
					{/* </Container> */}
				</section>
			</ThemeProvider>
		)
	}
}
export { Messenger }




