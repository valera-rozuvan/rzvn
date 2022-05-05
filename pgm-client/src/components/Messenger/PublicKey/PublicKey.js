import React from 'react'

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import ClearIcon from '@mui/icons-material/Clear';

function PublicKey({friend}) {

		const onPublicKeyClick = (friend) => {
		// props.showActivePublicKeyMessaging(publicKey);
		console.log(friend);
	}
	// const { publicKey } = props;
	return (
		<div>
			<ListItem  sx={{ display: { xs: 'flex', md: 'flex' } }} >
				<ListItemButton 
				onClick={() => onPublicKeyClick(friend)} key={friend.id}
				sx={{ maxHeight: '1.5rem' }}>
					<ListItemText align="left">
						<Typography variant="h9">{friend.name}</Typography>
					</ListItemText>
				</ListItemButton>
				<ClearIcon/>
			</ListItem>
		</div>
	)
}
export { PublicKey }


// <ListItem sx={{ display: { xs: 'flex', md: 'flex' } }} >
// <ListItemButton 
// onClick={() => props.onPublicKeyClick(publicKey)} id={publicKey.key}
// sx={{ maxHeight: '1.5rem' }}>
// 	<ListItemText align="left">
// 		<Typography variant="h9">{publicKey.userName}</Typography>
// 	</ListItemText>
// </ListItemButton>
// <ClearIcon/>
// </ListItem>