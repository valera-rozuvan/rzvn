import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme'
import './about.scss'

function About() {
	return (

		<ThemeProvider theme={theme} >
			<section>

				<Container maxWidth="md" sx={{ mt: "4rem" }}>
					<Typography variant="h4" align="center">About us</Typography>
					<Typography sx={{ mt: "2rem" }}>Lorem ipsum dolor sit amet,
						consectetur adipiscing elit, sed do eiusmod te
						mpor incididunt ut labore et dolore magna aliqua. Ut en
						im ad minim veniam, quis nostrud exercitation ullamco laboris ni
						si ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehende
						rit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint oc
						caecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</Typography>
				</Container>
				
			</section>

		</ThemeProvider>

	)
}
export { About }
