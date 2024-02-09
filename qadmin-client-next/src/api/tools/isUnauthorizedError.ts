import IError from './errorType';

function isUnauthorizedError(err: IError) {
  return !!(err && err.response && err.response.status === 401);
}

export default isUnauthorizedError;
