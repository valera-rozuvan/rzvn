import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NoMatch() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/broken');
  });

  return (
    <div />
  );
}

export default NoMatch;
