import React from 'react';
import Typography from '@mui/material/Typography';

function Uptime() {
  return (
    <>
      <Typography
        variant="h5"
        align="center"
      >
        Uptime
      </Typography>
      <Typography
        variant="h6"
        align="center">
        <a href={process.env.REACT_APP_UPTIME_URL}>go to uptime app</a>
      </Typography>
      <Typography
        variant="h6"
        align="center"
      >
        Uptime it is an application for control the operation of your site,
         which will work and track errors while you are drinking a cocktail on the seashore
      </Typography>
    </>
  );
}

export default Uptime;
