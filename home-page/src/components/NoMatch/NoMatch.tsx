import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function NoMatch() {
  return (
    <Container sx={{ textAlign: 'center' }}>
      <Typography variant="h4">Error! No match for this route</Typography>
    </Container>
  );
}

export default NoMatch;
