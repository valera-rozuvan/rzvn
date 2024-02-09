import axios from 'axios';

const REACT_APP_REQUEST_API = process.env.REACT_APP_REQUEST_API || '';

class SuperAdminsApi {
  baseUrl = '';

  authToken = '';

  constructor(authToken: string) {
    this.baseUrl = REACT_APP_REQUEST_API;
    this.authToken = authToken;
  }

  async getSuperAdmins() {
    const response = await axios.get(`${this.baseUrl}/superadmin`, { headers: this.authHeaders() });
    return response;
  }

  // async createSuperAdmin(data) {
  //   const response = await axios.post(`${this.baseUrl}/superadmin`, data, { headers: this.authHeaders() });
  //   return response;
  // }

  // async updateSuperAdmin(id: string, data) {
  //   const response = await axios.put(`${this.baseUrl}/superadmin/${id}`, data, { headers: this.authHeaders() });
  //   return response;
  // }

  async updateSuperAdminPassword(id: string) {
    const response = await axios.post(`${this.baseUrl}/superadmin/${id}/password`, {}, { headers: this.authHeaders() });
    return response;
  }

  async deleteSuperAdmin(id: string) {
    const response = await axios.delete(`${this.baseUrl}/superadmin/${id}`, { headers: this.authHeaders() });
    return response;
  }

  authHeaders() {
    return { Authorization: `Bearer: ${this.authToken}` };
  }
}

export default SuperAdminsApi;
