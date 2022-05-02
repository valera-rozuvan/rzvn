import React from 'react'

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Typography from '@mui/material/Typography';

import "./PublicKey.scss"

function PublicKey(props) {
    const { publicKey } = props;
    return (
			<div>
			<ListItem sx={{  display: { xs: 'flex', md: 'flex' } }} onClick={() => props.onPublicKeyClick(publicKey)} id={publicKey.key}>
			 <ListItemButton sx={{maxHeight:'1.5rem'}}>
				<ListItemText align="left"> 
					<Typography variant="h9">{publicKey.userName}</Typography>
				</ListItemText> 
			</ListItemButton> 
		</ListItem>
		
					</div>


    )
}
export { PublicKey }
