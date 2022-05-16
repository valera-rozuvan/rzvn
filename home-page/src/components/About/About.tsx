import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function About() {
  return (
    <Container sx={{ align: 'center' }}>
      <Typography
        variant="h5"
        align="center"
      >
        <div>test</div>
        About
      </Typography>
      <Typography
        variant="h6"
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Deleniti unde consequuntur omnis incidunt rerum ducimus perferendis quibusdam.
        Cumque quos, eveniet corrupti illo voluptate quis molestiae odio, voluptatem
        eligendi doloremque delectus.
      </Typography>
    </Container>
  );
}

export default About;
