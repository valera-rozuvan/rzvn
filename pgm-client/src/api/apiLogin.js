import axios from 'axios';

const REACT_APP_REQUEST_API = process.env.REACT_APP_REQUEST_API;

class Api {
    baseUrl = '';
    authToken = '';

    constructor(authToken) {
        this.baseUrl = REACT_APP_REQUEST_API;
        this.authToken = authToken;
    }

    async checkUserIsExist(data) {
        const response = await axios.post(`${this.baseUrl}/login`, data, { headers: this.authHeaders() });
        return response;
    }

    authHeaders() {
        return { Authorization: `Bearer: ${this.authToken}` };
    }
}

export {
    Api,
};
