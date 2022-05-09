function isUnauthorizedError(err) {
  return !!(err && err.response && err.response.status === 401);
}

export { isUnauthorizedError };
