import { Container } from '@mui/material';

function WrapperNoMargin(
  {
    disableGutters = true,
    maxWidth = false,
    mt = '0',
    mb = '0',
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

export default WrapperNoMargin;
