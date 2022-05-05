import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme'

import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {Api} from '../../../api/apiFriends'

import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import { PublicKey } from "../PublicKey/PublicKey"
const copyFriendData = ({id, publicKey, name, userId}) => ({
  id,
  publicKey,
  name,
  userId,
});
function PublicKeyList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const friends = useSelector(state => state.friends);


	const [key, setKey] = useState('');
	const [name, setName] = useState('');
	const [activeModal, setActiveModal] = useState({name: "", active: false});
	const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentFriend, setCurrentFriend] = useState(copyFriendData({
    id: "",
    publicKey: "",
    name: "",
    userId: "",
  }));


	useEffect(() => {
    clearModal();
		setLoading(true);
		
		 async function getAllFriends() {
			try {
				const api = new Api();
				const result = await api.getFriends();
				const friendList = await result.data;
	
				dispatch({type: "SET_FRIENDS", data: friendList});
			} catch (err) {
			console.log('Failed to fetch friends.');
			}
			return true;
		}
		getAllFriends();
		setLoading(false);

  }, [loading,dispatch]);

	// async function getAllUsers() {
	// 	try {
	// 		const api = new Api();
	// 		const result = await api.getFriends();
	// 		const friendList = result.data;

	// 		dispatch({type: "SET_FRIENDS", data: friendList});
	// 	} catch (err) {
	// 	console.log('Failed to fetch friends.');
	// 	}
	// 	return true;
	// }

  const setModal = modal => {
    setActiveModal({name: modal, active: true});
  };

  const clearModal = () => {
    setActiveModal({name: "", active: false});
  };

	const handleSubmit = event => {
		event.preventDefault();
		console.log('new key');
		props.addPublicKey({ key });
		handleClose();
	}
	// const onPublicKeyClick = (someText) => {
	// 	// props.showActivePublicKeyMessaging(publicKey);
	// 	console.log(someText);
	// }
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		reset();
	};
	const reset = () => {
		setKey('');
		setName('');
	}
	// const { publicKeys } = props;
	return (
		<ThemeProvider theme={theme}>
			<List align="center"  >
			<Typography variant="h6" >friends</Typography>
				{
					friends.map(friend => {
						return (
							<PublicKey friend={friend}
								key={friend.id} />
						)
					})
				}
				<Button sx={{ mt: '2rem' }} variant="outlined"
					onClick={handleClickOpen} type="button">add key</Button>
			</List>{open === true && (
				<Dialog open={open} >
					<form onSubmit={handleSubmit} >
						<DialogTitle>Add new public key</DialogTitle>
						<DialogContent>
							<DialogContentText>
							</DialogContentText>
							{/* <InputLabel htmlFor="my-input">new public key</InputLabel> */}
							<Input
								onChange={event => setKey(event.currentTarget.value)}
								autoComplete="off"
								value={key}
								autoFocus
								margin="dense"
								id="new-key"
								aria-describedby="friend's public key"
								type="text" />
							<FormHelperText id="my-helper-text">Write new public key</FormHelperText>
							<Input
								onChange={event => setKey(event.currentTarget.value)}
								autoComplete="off"
								value={name}
								margin="dense"
								id="name"
								aria-describedby="friend's name"
								type="text" />
									<FormHelperText id="my-helper-text">Write name of your friend</FormHelperText>
						</DialogContent>
						<DialogActions>
							<Button type="button" onClick={handleClose}>Cancel</Button>
							<Button type="submit">Add key</Button>
						</DialogActions>
					</form>
				</Dialog>
			)}
		</ThemeProvider>
	)
}

export { PublicKeyList }

