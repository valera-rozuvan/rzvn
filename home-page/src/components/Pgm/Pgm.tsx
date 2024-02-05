import React from 'react';
import Typography from '@mui/material/Typography';

function Pgm() {
  return (
    <>
      <Typography
        variant="h5"
        align="center"
      >
        Pgm
      </Typography>
      <Typography
        variant="h6"
        align="center"
      >
        <a href={process.env.REACT_APP_PGM_URL}>go to pgm app</a>
      </Typography>
      <Typography
        variant="h6"
        align="center"
      >
        PGM - app for secure messaging
      </Typography>
    </>
  );
}

export default Pgm;
