import axios from 'axios';

const REACT_APP_REQUEST_API = process.env.REACT_APP_REQUEST_API;

class Api {
  baseUrl = '';
  authToken = '';

  constructor(authToken) {
    this.baseUrl = REACT_APP_REQUEST_API;
    this.authToken = authToken;
  }

  async getFriends() {
    const response = await axios.get(`${this.baseUrl}/friend`, { headers: this.authHeaders() });
    return response;
  }
  async getFriendsOfCurrentUserPublicKey(authorPublicKey) {
    const response = await axios.get(`${this.baseUrl}/friend/${authorPublicKey}`, { headers: this.authHeaders() });
    return response;
  }

  async createFriend(data) {
    const response = await axios.post(`${this.baseUrl}/friend`, data, { headers: this.authHeaders() });
    return response;
  }

  async updateFriend(id, data) {
    const response = await axios.put(`${this.baseUrl}/friend/${id}`, data, { headers: this.authHeaders() });
    return response;
  }

  async deleteFriend(id) {
    const response = await axios.delete(`${this.baseUrl}/friend/${id}`, { headers: this.authHeaders() });
    return response;
  }

  authHeaders() {
    return { Authorization: `Bearer: ${this.authToken}` };
  }
}

export {
  Api,
};
