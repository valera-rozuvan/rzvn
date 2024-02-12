import axios from 'axios';

const REACT_APP_QADMIN_API = process.env.REACT_APP_QADMIN_API || '';

class AppsApi {
  baseUrl = '';

  authToken = '';

  constructor(authToken: string) {
    this.baseUrl = REACT_APP_QADMIN_API;
    this.authToken = authToken;
  }

  async getApps() {
    const response = await axios.get(`${this.baseUrl}/app`, { headers: this.authHeaders() });
    return response;
  }

  // async createApp(data) {
  //   const response = await axios.post(`${this.baseUrl}/app`, data, {headers: this.authHeaders()});
  //   return response;
  // }

  // async updateApp(id, data) {
  //   const response = await axios.put(`${this.baseUrl}/app/${id}`, data, {headers: this.authHeaders()});
  //   return response;
  // }

  async deleteApp(id: string) {
    const response = await axios.delete(`${this.baseUrl}/app/${id}`, { headers: this.authHeaders() });
    return response;
  }

  authHeaders() {
    return { Authorization: `Bearer: ${this.authToken}` };
  }
}

export default AppsApi;
