const Http = require('./http');
const get = require('lodash/get');
const { FOLLOWERS_GRAPH, FOLLOWING_GRAPH, HASHTAG_GRAPH } = require('./constants');

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
      id: String(userId),
      first: limit,
    });

    return get(resp.body, 'data.user.edge_followed_by');
  }

  async following(userId, limit = 20) {
    const resp = await this.graphql(FOLLOWING_GRAPH, {
      id: String(userId),
      first: limit,
    });

    return get(resp.body, 'data.user.edge_follow');
  }

  async follow(userId) {
    const resp = await this.http.post(`/web/friendships/${userId}/follow/`);
    return resp.body;
  }

  async unfollow(userId) {
    const resp = await this.http.post(`/web/friendships/${userId}/unfollow/`);
    return resp.body;
  }

  async me() {
    const resp = await this.http.get('/accounts/edit/?__a=1');
    return resp.body;
  }

  async hashtag(hashtag, limit = 20) {
    const resp = await this.graphql(HASHTAG_GRAPH, {
      tag_name: String(hashtag),
      first: limit,
    });

    return get(resp.body, 'data.hashtag.edge_hashtag_to_media');
  }

  async shortcodeMedia(shortcode) {
    const resp = await this.http.get(`/p/${shortcode}/?__a=1`);
    return get(resp.body, 'graphql.shortcode_media');
  }

  async like(mediaId) {
    const resp = await this.http.post(`/web/likes/${mediaId}/like/`);
    return resp.body;
  }
};
