import axios from 'axios';

const REACT_APP_REQUEST_API = process.env.REACT_APP_REQUEST_API;

class ApiMessages {
    baseUrl = '';
    authToken = '';

    constructor(authToken) {
        this.baseUrl = REACT_APP_REQUEST_API;
        this.authToken = authToken;
    }

    async getMessages() {
        const response = await axios.get(`${this.baseUrl}/message`, { headers: this.authHeaders() });
        return response;
    }

    async createMessage(data) {
        const response = await axios.post(`${this.baseUrl}/message`, {text:data}, { headers: this.authHeaders() });
        return response;
    }

    async updateMessage(id, data) {
        const response = await axios.put(`${this.baseUrl}/message/${id}`, data, { headers: this.authHeaders() });
        return response;
    }

    async deleteMessage(id) {
        const response = await axios.delete(`${this.baseUrl}/message/${id}`, { headers: this.authHeaders() });
        return response;
    }

    authHeaders() {
        return { Authorization: `Bearer: ${this.authToken}` };
    }
}

export {
    ApiMessages,
};
