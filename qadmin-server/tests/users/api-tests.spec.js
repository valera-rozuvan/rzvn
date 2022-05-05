const { attributes } = require('structure');
const axios = require('axios').default;
const { expect } = require('chai');
require('mocha');

const { envVariables, randomString } = require('../../src/utils');

const { BASE_API_URL, outputAxiosResponseError } = require('../helpers');

describe('Users API tests', () => {
  describe('bad credentials', () => {
    it('wrong email results in error', async () => {
      let response = null;

      try {
        response = await axios.post(`${BASE_API_URL}/auth/token`, { email: 'abc', password: envVariables.TEST_USER_PASSWORD });
      } catch (error) {
        outputAxiosResponseError(error);

        expect(error.response.data).to.deep.equal({ message: 'Bad auth credentials.' });
        expect(error.response.status).to.equal(400);
      }

      expect(response).to.equal(null);
    });

    it('wrong password results in error', async () => {
      let response = null;

      try {
        response = await axios.post(`${BASE_API_URL}/auth/token`, { email: envVariables.TEST_USER_EMAIL, password: 'abc' });
      } catch (error) {
        outputAxiosResponseError(error);

        expect(error.response.data).to.deep.equal({ message: 'Bad auth credentials.' });
        expect(error.response.status).to.equal(400);
      }

      expect(response).to.equal(null);
    });
  });

  describe('good credentials', () => {
    it('proper email and password produce auth token', async () => {
      let response = null;

      try {
        response = await axios.post(`${BASE_API_URL}/auth/token`, { email: envVariables.TEST_USER_EMAIL, password: envVariables.TEST_USER_PASSWORD });
      } catch (error) {
        outputAxiosResponseError(error);

        throw new Error('we should not have reached this place');
      }

      expect(response.status).to.equal(200);
      expect(response.data).to.deep.equal({
        email: envVariables.TEST_USER_EMAIL,
        password: envVariables.TEST_USER_PASSWORD,
        authToken: envVariables.TEST_USER_AUTH_TOKEN,
      });
    });
  });

  describe('happy path', () => {
    let authToken = null;
    let newUser = null;

    it('super admin login', async () => {
      let response = null;

      try {
        response = await axios.post(`${BASE_API_URL}/auth/token`, { email: envVariables.TEST_USER_EMAIL, password: envVariables.TEST_USER_PASSWORD });
      } catch (error) {
        outputAxiosResponseError(error);

        throw new Error('we should not have reached this place');
      }

      authToken = response.data.authToken;

      expect(authToken).to.equal(envVariables.TEST_USER_AUTH_TOKEN);
    });

    it('create user', async () => {
      let response = null;

      try {
        response = await axios.post(
          `${BASE_API_URL}/user`,
          {
            email: `test_user_${randomString(32)}@example.com`, firstName: randomString(12), lastName: randomString(12), isActive: false,
          },
          {
            headers: {
              Authorization: `Bearer: ${authToken}`,
            },
          },
        );
      } catch (error) {
        outputAxiosResponseError(error);

        throw new Error('we should not have reached this place');
      }

      expect(response.status).to.equal(200);

      const UserResponseValidator = attributes({
        id: {
          type: String,
          required: true,
          minLength: 1,
          maxLength: 64,
        },
        email: {
          type: String,
          required: true,
          minLength: 1,
          maxLength: 64,
        },
        firstName: {
          type: String,
          required: true,
          minLength: 1,
          maxLength: 32,
        },
        lastName: {
          type: String,
          required: true,
          minLength: 1,
          maxLength: 32,
        },
        isActive: {
          type: Boolean,
          required: true,
        },
        createdAt: {
          type: String,
          required: true,
          minLength: 1,
          maxLength: 32,
        },
      })(class UserResponseValidator {});

      const { valid, errors } = UserResponseValidator.validate(response.data);

      if (errors) {
        console.log(errors);
      }

      expect(valid).to.equal(true);

      newUser = response.data;
    });

    it('get user by id', async () => {
      let response = null;

      try {
        response = await axios.get(
          `${BASE_API_URL}/user/${newUser.id}`,
          {
            headers: {
              Authorization: `Bearer: ${authToken}`,
            },
          },
        );
      } catch (error) {
        outputAxiosResponseError(error);

        throw new Error('we should not have reached this place');
      }

      expect(response.status).to.equal(200);
      expect(response.data).to.deep.equal(newUser);
    });

    it('update user by id - change email', async () => {
      let response = null;

      const newEmail = `test_user_${randomString(32)}@example.com`;

      try {
        response = await axios.put(
          `${BASE_API_URL}/user/${newUser.id}`,
          {
            email: newEmail,
          },
          {
            headers: {
              Authorization: `Bearer: ${authToken}`,
            },
          },
        );
      } catch (error) {
        outputAxiosResponseError(error);

        throw new Error('we should not have reached this place');
      }

      expect(response.status).to.equal(200);
      expect(response.data).to.deep.equal(Object.assign({}, newUser, { email: newEmail }));

      newUser = Object.assign({}, response.data);
    });

    it('update user by id - change first name', async () => {
      let response = null;

      const newFirstName = randomString(12);

      try {
        response = await axios.put(
          `${BASE_API_URL}/user/${newUser.id}`,
          {
            firstName: newFirstName,
          },
          {
            headers: {
              Authorization: `Bearer: ${authToken}`,
            },
          },
        );
      } catch (error) {
        outputAxiosResponseError(error);

        throw new Error('we should not have reached this place');
      }

      expect(response.status).to.equal(200);
      expect(response.data).to.deep.equal(Object.assign({}, newUser, { firstName: newFirstName }));

      newUser = Object.assign({}, response.data);
    });

    it('update user by id - change last name', async () => {
      let response = null;

      const newLastName = randomString(12);

      try {
        response = await axios.put(
          `${BASE_API_URL}/user/${newUser.id}`,
          {
            lastName: newLastName,
          },
          {
            headers: {
              Authorization: `Bearer: ${authToken}`,
            },
          },
        );
      } catch (error) {
        outputAxiosResponseError(error);

        throw new Error('we should not have reached this place');
      }

      expect(response.status).to.equal(200);
      expect(response.data).to.deep.equal(Object.assign({}, newUser, { lastName: newLastName }));

      newUser = Object.assign({}, response.data);
    });

    it('update user by id - change isActive flag', async () => {
      let response = null;

      try {
        response = await axios.put(
          `${BASE_API_URL}/user/${newUser.id}`,
          {
            isActive: !newUser.isActive,
          },
          {
            headers: {
              Authorization: `Bearer: ${authToken}`,
            },
          },
        );
      } catch (error) {
        outputAxiosResponseError(error);

        throw new Error('we should not have reached this place');
      }

      expect(response.status).to.equal(200);
      expect(response.data).to.deep.equal(Object.assign({}, newUser, { isActive: !newUser.isActive }));

      newUser = Object.assign({}, response.data);
    });

    it('list of all users includes the new user', async () => {
      let response = null;

      try {
        response = await axios.get(
          `${BASE_API_URL}/user`,
          {
            headers: {
              Authorization: `Bearer: ${authToken}`,
            },
          },
        );
      } catch (error) {
        outputAxiosResponseError(error);

        throw new Error('we should not have reached this place');
      }

      expect(response.status).to.equal(200);
      expect(response.data).to.be.instanceOf(Array);
      expect(response.data.length).to.be.greaterThan(0);

      const match = response.data.find((user) => user.id === newUser.id);

      expect(match).to.deep.equal(newUser);
    });

    it('delete user by id', async () => {
      let response = null;

      try {
        response = await axios.delete(
          `${BASE_API_URL}/user/${newUser.id}`,
          {
            headers: {
              Authorization: `Bearer: ${authToken}`,
            },
          },
        );
      } catch (error) {
        outputAxiosResponseError(error);

        throw new Error('we should not have reached this place');
      }

      expect(response.status).to.equal(200);
      expect(response.data).to.deep.equal({ status: 'OK' });
    });

    it('after deletion, list of all users DOES NOT include the new user', async () => {
      let response = null;

      try {
        response = await axios.get(
          `${BASE_API_URL}/user`,
          {
            headers: {
              Authorization: `Bearer: ${authToken}`,
            },
          },
        );
      } catch (error) {
        outputAxiosResponseError(error);

        throw new Error('we should not have reached this place');
      }

      expect(response.status).to.equal(200);
      expect(response.data).to.be.instanceOf(Array);

      const match = response.data.find((user) => user.id === newUser.id);

      expect(typeof match === 'undefined').to.equal(true);
    });
  });
});
