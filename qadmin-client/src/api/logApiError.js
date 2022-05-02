function logApiError(err) {
  if (err) {
    if (err.response) {
      if (err.response.status) {
        console.error(`status '${err.response.status}'`);
      }

      if (err.response.data) {
        console.error(err.response.data);
      }
    }

    if (err.message) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  } else {
    console.error("something bad happened");
  }
}

function isUnauthorizedError(err) {
  return !!(err && err.response && err.response.status === 401);
}

export {
  logApiError,
  isUnauthorizedError,
};
