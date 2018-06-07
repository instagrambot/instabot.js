/* eslint-disable no-param-reassign */

import { get } from 'lodash';
import Http from './http';

function ApiError(message, response) {
  const error = new Error();

  error.name = 'ApiError';
  error.message = message;
  error.response = response;

  return error;
}

export default class Instagram2 {
  constructor() {
    this.http = new Http();
  }

  async auth(username, password) {
    const resp = await this.http.post('/accounts/login/ajax/', {
      jar: true,
      form: { username, password },
    });

    if (get(resp, 'data.authenticated')) return resp.data;

    throw new ApiError('Incorrect login or password', resp);
  }
}

// window.ig2 = new Instagram2();
