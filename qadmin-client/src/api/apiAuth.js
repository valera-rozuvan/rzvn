import axios from "axios";

const REACT_APP_REQUEST_API = process.env.REACT_APP_REQUEST_API;

class Api {
  baseUrl = "";
  authToken = "";

  constructor(authToken) {
    this.baseUrl = REACT_APP_REQUEST_API;
    this.authToken = authToken;
  }

  async getAuthToken(data) {
    const response = await axios.post(`${this.baseUrl}/auth/token`, data);
    return response;
  }

  async checkAuthToken() {
    const response = await axios.get(`${this.baseUrl}/auth/check_token`, {headers: this.authHeaders()});
    return response;
  }

  authHeaders() {
    return {Authorization: `Bearer: ${this.authToken}`};
  }
}

export {
  Api,
};
