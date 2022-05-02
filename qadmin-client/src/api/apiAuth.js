import axios from "axios";

const REACT_APP_REQRES_API = process.env.REACT_APP_REQRES_API;

class Api {
  baseUrl = "";

  constructor() {
    this.baseUrl = REACT_APP_REQRES_API;
  }

  async getAuthToken(data) {
    const response = await axios.post(`${this.baseUrl}/auth/token`, data);
    return response;
  }
}

export {
  Api,
};
