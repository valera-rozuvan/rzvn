import axios from 'axios';

const REACT_APP_REQUEST_API = process.env.REACT_APP_REQUEST_API || '';

class UsersApi {
  baseUrl = '';

  authToken = '';

  constructor(authToken: string) {
    this.baseUrl = REACT_APP_REQUEST_API;
    this.authToken = authToken;
  }

  async getUsers() {
    const response = await axios.get(`${this.baseUrl}/user`, { headers: this.authHeaders() });
    return response;
  }

  // async createUser(data) {
  //   const response = await axios.post(`${this.baseUrl}/user`, data, { headers: this.authHeaders() });
  //   return response;
  // }

  // async updateUser(id: string, data) {
  //   const response = await axios.put(`${this.baseUrl}/user/${id}`, data, { headers: this.authHeaders() });
  //   return response;
  // }

  async deleteUser(id: string) {
    const response = await axios.delete(`${this.baseUrl}/user/${id}`, { headers: this.authHeaders() });
    return response;
  }

  authHeaders() {
    return { Authorization: `Bearer: ${this.authToken}` };
  }
}

export default UsersApi;
