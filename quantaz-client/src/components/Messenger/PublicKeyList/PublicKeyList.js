import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme'

import List from '@mui/material/List';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useState } from 'react'
import { AddKey } from '../AddKey/AddKey'
import { PublicKey } from "../PublicKey/PublicKey"
import './PublicKeyList.scss'



function PublicKeyList(props) {


	const [addKeyToggle, setAddKeyToggle] = useState(false);
	// const [loading, setLoading] = useState(true);/maby we will use it in future for loader for ex.

	const closeMe = () => {
		setAddKeyToggle(false);
	}
	const addKeyOpen = () => {
		console.log('key-open');
		if (addKeyToggle === true) {
			setAddKeyToggle(false)
		} else {
			setAddKeyToggle(true)
		}
		console.log(addKeyToggle);
	}

	const onPublicKeyClick = (publicKey) => {
		props.showActivePublicKeyMessaging(publicKey);
	}

	const { publicKeys } = props;
	return (
		<ThemeProvider theme={theme}>

				<List align="left"  >
				{/* sx={{ flexGrow: 0, display: { xs: 'block', md: 'block' } }} */}
					<Typography variant="h6" >public keys</Typography>
					{
						publicKeys.map(publicKey => {
							return (
								<PublicKey publicKey={publicKey}
									key={publicKey.key}
									onPublicKeyClick={onPublicKeyClick} />
							)
						})
					}
					<Button sx={{ mt: '2rem' }} variant="outlined" onClick={addKeyOpen} className="public-key-add-btn" type="button">add key</Button>
				</List>
				<AddKey addPublicKey={props.addPublicKey} addKeyToggle={addKeyToggle} closeMe={closeMe}></AddKey>

		</ThemeProvider>
	)
}

export { PublicKeyList }

