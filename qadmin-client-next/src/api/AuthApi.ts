import axios from 'axios';

const REACT_APP_QADMIN_API = process.env.REACT_APP_QADMIN_API || '';

class AuthApi {
  baseUrl = '';

  authToken = '';

  constructor(authToken: string) {
    this.baseUrl = REACT_APP_QADMIN_API;
    this.authToken = authToken;
  }

  async getAuthToken(data: { email: string; password: string; }) {
    const response = await axios.post(`${this.baseUrl}/auth/token`, data);
    return response;
  }

  async checkAuthToken() {
    const response = await axios.get(`${this.baseUrl}/auth/check_token`, { headers: this.authHeaders() });
    return response;
  }

  authHeaders() {
    return { Authorization: `Bearer: ${this.authToken}` };
  }
}

export default AuthApi;
