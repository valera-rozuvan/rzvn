import React from 'react';
import Typography from '@mui/material/Typography';

function Qadmin() {
  return (
    <>
      <Typography
        variant="h5"
        align="center"
      >
        Qadmin
      </Typography>
      <Typography
        variant="h6"
        align="center"
      >
        <a href={process.env.REACT_APP_QADMIN_URL}>go to qadmin app</a>
      </Typography>
      <Typography
        variant="h6"
        align="center"
      >
        Qadmin- app for adminisrtators
      </Typography>
    </>
  );
}

export default Qadmin;
