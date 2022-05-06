import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme';

function Search() {
  return (
    <ThemeProvider theme={theme}>
      <FormControl size='small' sx={{ m: '1rem' }}>
        <InputLabel htmlFor='my-input'>search</InputLabel>
        <Input id='my-input' aria-describedby='my-helper-text' />
        <FormHelperText id='my-helper-text'>enter public key</FormHelperText>
      </FormControl>
    </ThemeProvider>
  );
}

export { Search };
