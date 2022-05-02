import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme'
import { Link } from 'react-router-dom'

function Contact() {
	return(
	<ThemeProvider theme={theme}>
			<section>
				<Container maxWidth="md" sx={{ mt: "4rem" }}>
					<Typography variant="h4" align="center" >Contact us</Typography>
					<Typography variant="h5" align="center" sx={{ mt: "2rem" }}>Country: Ukraine</Typography>
					<Typography variant="h4" align="center"sx={{ mt: "2rem" }}>Do you have something to ask or suggest?</Typography>
					<Typography variant="h6" align="center" sx={{ mt: "1rem" }}>
					<Link className="link contact-text" to="mailto:writetous@gmail.com">email:writetous@gmail.com</Link>
					</Typography>
					
				</Container>
			</section>
		</ThemeProvider>

    )
}
export { Contact }
