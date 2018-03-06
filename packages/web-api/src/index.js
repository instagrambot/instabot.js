const Http = require('./http');
const get = require('lodash/get');
const { FOLLOWERS_GRAPH } = require('./constants');

module.exports = class WebApi {
  constructor() {
    this.http = new Http();
  }

  graphql(queryHash, variables = {}) {
    return this.http.get('/graphql/query/', {
      qs: {
        query_hash: queryHash,
        variables: JSON.stringify(variables),
      },
    });
  }

  async login(username, password) {
    const resp = await this.http.post('/accounts/login/ajax/', {
      jar: true,
      form: { username, password },
    });

    return resp.body;
  }

  async account(name) {
    const resp = await this.http.get(`/${name}?__a=1`);
    return resp.body;
  }

  async followers(userId, limit = 20) {
    const resp = await this.graphql(FOLLOWERS_GRAPH, {
      id: userId,
      first: limit,
    });

    return get(resp.body, 'data.user.edge_followed_by');
  }

  async follow(userId) {
    const resp = await this.http.post(`/web/friendships/${userId}/follow/`);
    return resp.body;
  }

  async unfollow(userId) {
    const resp = await this.http.post(`/web/friendships/${userId}/unfollow/`);
    return resp.body;
  }
};
