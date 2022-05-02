import axios from 'axios';

const UPTIME_API_URL = process.env.REACT_APP_UPTIME_API_URL;

class Api {
  baseUrl = '';
  authToken = '';

  constructor(authToken) {
    this.baseUrl = UPTIME_API_URL;
    this.authToken = authToken;
  }

  async getResources() {
    const response = await axios.get(`${this.baseUrl}/resource`, { headers: this.authHeaders() });

    return response;
  }

  async getResource(id) {
    const response = await axios.get(`${this.baseUrl}/resource/${id}`, { headers: this.authHeaders() });

    return response;
  }

  async createResource(data) {
    const response = await axios.post(`${this.baseUrl}/resource`, data, { headers: this.authHeaders() });

    return response;
  }

  async updatedResource(id, data) {
    const response = await axios.put(`${this.baseUrl}/resource/${id}`, data, { headers: this.authHeaders() });

    return response;
  }

  async deleteResource(id) {
    const response = await axios.delete(`${this.baseUrl}/resource/${id}`, { headers: this.authHeaders() });

    return response;
  }

  authHeaders() {
    return { Authorization: `Bearer: ${this.authToken}` };
  }
}

export {
  Api,
};
