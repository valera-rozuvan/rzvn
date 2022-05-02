import React from 'react'
import './footer.scss'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from '../../theme'


function Footer() {
    return (
			<ThemeProvider theme={theme}>
        <footer>
				<Container align='center'  size='sm'	position="bottom">
            <Typography>Copyright 2021 Privacy Guard Messages</Typography>
						</Container>
        </footer>
				</ThemeProvider>
    )
}
export { Footer }
