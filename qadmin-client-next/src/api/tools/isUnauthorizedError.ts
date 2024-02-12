import IError from './errorType';

function isUnauthorizedError(unkErr: unknown) {
  const err = unkErr as IError;

  return !!(err && err.response && err.response.status === 401);
}

export default isUnauthorizedError;
