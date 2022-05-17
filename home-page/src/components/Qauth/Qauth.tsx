import React from 'react';
import Typography from '@mui/material/Typography';

function Qauth() {
  return (
    <>
    <Typography
      variant="h5"
      align="center"
    >
      Qauth
    </Typography>
          <Typography
          variant="h6"
          align="center">
          <a href={process.env.REACT_APP_QAUTH_URL}>go to qauth app</a>
        </Typography>
        <Typography
          variant="h6"
          align="center"
        >
          Qauth- for authentication
        </Typography>
        </>
  );
}

export default Qauth;
