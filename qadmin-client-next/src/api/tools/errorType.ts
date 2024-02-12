interface IErrorResponse {
  status?: number;
  data?: unknown;
}

interface IError {
  response: IErrorResponse;
  message?: string;
}

export default IError;
