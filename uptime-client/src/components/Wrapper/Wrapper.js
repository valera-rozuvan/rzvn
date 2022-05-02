import { Container } from '@mui/material';

function Wrapper(
  {
    disableGutters = true,
    maxWidth = false,
    mt = '1rem',
    mb = '1rem',
    height = undefined,
    children,
  },
) {
  let sx = {
    mt,
    mb,
  };

  if (height) {
    sx = Object.assign({}, sx, { height });
  }

  return (
    <Container
      disableGutters={disableGutters}
      maxWidth={maxWidth}
      sx={sx}
    >
      {children}
    </Container>
  );
}

export default Wrapper;
