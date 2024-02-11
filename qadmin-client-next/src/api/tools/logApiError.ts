import IError from './errorType';

function logApiError(unkErr: unknown) {
  const err = unkErr as IError;

  if (err) {
    if (err.response) {
      if (err.response.status) {
        console.error(`status '${err.response.status}'`); // eslint-disable-line
      }

      if (err.response.data) {
        console.error(err.response.data); // eslint-disable-line
      }
    }

    if (err.message) {
      console.error(err.message); // eslint-disable-line
    } else {
      console.error(err); // eslint-disable-line
    }
  } else {
    console.error('something bad happened'); // eslint-disable-line
  }
}

export default logApiError;
