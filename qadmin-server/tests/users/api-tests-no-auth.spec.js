const axios = require('axios').default;
const { expect } = require('chai');
require('mocha');

const { BASE_API_URL, outputAxiosResponseError } = require('../helpers');

describe('Users API tests - no auth', () => {
  describe('GET', () => {
    describe('for route `/user`', () => {
      it('should not allow to do a GET request without auth token', async () => {
        let response = null;

        try {
          response = await axios.get(`${BASE_API_URL}/user`);
        } catch (error) {
          outputAxiosResponseError(error);

          expect(error.response.data).to.deep.equal({ message: 'Unauthorized' });
          expect(error.response.status).to.equal(401);
        }

        expect(response).to.equal(null);
      });
    });

    describe('for route `/user/{id}`', () => {
      it('should not allow to do a GET request without auth token', async () => {
        let response = null;

        try {
          response = await axios.get(`${BASE_API_URL}/user/111111`);
        } catch (error) {
          outputAxiosResponseError(error);

          expect(error.response.data).to.deep.equal({ message: 'Unauthorized' });
          expect(error.response.status).to.equal(401);
        }

        expect(response).to.equal(null);
      });
    });
  });

  describe('POST', () => {
    describe('for route `/user`', () => {
      it('should not allow to do a POST request without auth token', async () => {
        let response = null;

        try {
          response = await axios.post(`${BASE_API_URL}/user`);
        } catch (error) {
          outputAxiosResponseError(error);

          expect(error.response.data).to.deep.equal({ message: 'Unauthorized' });
          expect(error.response.status).to.equal(401);
        }

        expect(response).to.equal(null);
      });
    });

    describe('for route `/user/{id}`', () => {
      it('is not defined', async () => {
        let response = null;

        try {
          response = await axios.post(`${BASE_API_URL}/user/111111`);
        } catch (error) {
          outputAxiosResponseError(error);

          expect(error.response.status).to.equal(404);
        }

        expect(response).to.equal(null);
      });
    });
  });

  describe('PUT', () => {
    describe('for route `/user`', () => {
      it('is not defined', async () => {
        let response = null;

        try {
          response = await axios.put(`${BASE_API_URL}/user`);
        } catch (error) {
          outputAxiosResponseError(error);

          expect(error.response.status).to.equal(404);
        }

        expect(response).to.equal(null);
      });
    });

    describe('for route `/user/{id}`', () => {
      it('should not allow to do a PUT request without auth token', async () => {
        let response = null;

        try {
          response = await axios.put(`${BASE_API_URL}/user/111111`);
        } catch (error) {
          outputAxiosResponseError(error);

          expect(error.response.data).to.deep.equal({ message: 'Unauthorized' });
          expect(error.response.status).to.equal(401);
        }

        expect(response).to.equal(null);
      });
    });
  });

  describe('DELETE', () => {
    describe('for route `/user`', () => {
      it('is not defined', async () => {
        let response = null;

        try {
          response = await axios.delete(`${BASE_API_URL}/user`);
        } catch (error) {
          outputAxiosResponseError(error);

          expect(error.response.status).to.equal(404);
        }

        expect(response).to.equal(null);
      });
    });

    describe('for route `/user/{id}`', () => {
      it('should not allow to do a DELETE request without auth token', async () => {
        let response = null;

        try {
          response = await axios.delete(`${BASE_API_URL}/user/111111`);
        } catch (error) {
          outputAxiosResponseError(error);

          expect(error.response.data).to.deep.equal({ message: 'Unauthorized' });
          expect(error.response.status).to.equal(401);
        }

        expect(response).to.equal(null);
      });
    });
  });

  describe('PATCH', () => {
    describe('for route `/user`', () => {
      it('is not defined', async () => {
        let response = null;

        try {
          response = await axios.patch(`${BASE_API_URL}/user`);
        } catch (error) {
          outputAxiosResponseError(error);

          expect(error.response.status).to.equal(404);
        }

        expect(response).to.equal(null);
      });
    });

    describe('for route `/user/{id}`', () => {
      it('is not defined', async () => {
        let response = null;

        try {
          response = await axios.patch(`${BASE_API_URL}/user/111111`);
        } catch (error) {
          outputAxiosResponseError(error);

          expect(error.response.status).to.equal(404);
        }

        expect(response).to.equal(null);
      });
    });
  });
});
