import axios from 'axios';

const REACT_APP_REQUEST_API = process.env.REACT_APP_REQUEST_API;

class Api {
  baseUrl = '';
  authToken = '';

  constructor(authToken) {
    this.baseUrl = REACT_APP_REQUEST_API;
    this.authToken = authToken;
  }

  async getAllUserPublicKeys(userId) {
    const response = await axios.get(`${this.baseUrl}/userPublicKey/byId/${userId}`, { headers: this.authHeaders() });
    return response;
  }
  async getOneUserPublicKey(key) {
    const response = await axios.get(`${this.baseUrl}/userPublicKey/byKey/${key}`, { headers: this.authHeaders() });
    return response;
  }

  async createUserPublicKey(data) {
    const response = await axios.post(`${this.baseUrl}/userPublicKey`, data, { headers: this.authHeaders() });
    return response;
  }
  async deleteUserPublicKey(id) {
    const response = await axios.delete(`${this.baseUrl}/userPublicKey/${id}`, { headers: this.authHeaders() });
    return response;
  }

  authHeaders() {
    return { Authorization: `Bearer: ${this.authToken}` };
  }
}

export {
  Api,
};
