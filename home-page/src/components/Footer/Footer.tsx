import React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  function handleClickFooterLink(): void {
    navigate('/');
  }
  return (
    <footer>
      <Container sx={{ textAlign: 'center' }}>
        <Button variant="text" onClick={() => handleClickFooterLink()} sx={{ cursor: 'pointer', color: '#000080' }}>
          Copyright 2021 Privacy Guard Messages
        </Button>
      </Container>
    </footer>
  );
}

export default Footer;
