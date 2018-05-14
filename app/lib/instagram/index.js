/* eslint-disable no-param-reassign */

import { get } from 'lodash';
import Http from './http';

import {
  COMMENTS_GRAPH,
  DISCOVER_MEDIAS_GRAPH,
  FOLLOWERS_GRAPH,
  FOLLOWING_GRAPH,
  HASHTAG_GRAPH,
  LIKERS_SHORTCODE_GRAPH,
  PLACE_MEDIA_GRAPH,
  USER_MEDIA_GRAPH,
  USER_STORIES_GRAPH,
} from './constants';

const failure = (err, message) => {
  if (message) {
    err.message = message;
    return err;
  }

  const respMessage = get(err, 'response.body.message');
  const causeCode = get(err, 'cause.code');

  if (causeCode) {
    err.message = `Network issue (${causeCode})`;
  } else if (respMessage) {
    if (respMessage) err.message = respMessage;
  }

  return err;
};

export default class Instagram {
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

  login(username, password) {
    return new Promise((resolve, reject) => {
      const auth = this.auth(username, password);

      auth.then(() => {
        const account = this.profile().then(p => this.account(p.username));

        account.then(resolve);
        account.catch((err) => {
          reject(failure(err, 'Account info request error'));
        });
      });

      auth.catch(reject);
    });
  }

  async auth(username, password) {
    const resp = await this.http.post('/accounts/login/ajax/', {
      jar: true,
      form: { username, password },
    });

    const { body } = resp;

    if (body.authenticated) return body;

    const err = new Error('Incorrect login or password');
    err.response = body;
    throw err;
  }

  challenge(url, code) {
    return this.http.post(url, {
      jar: true,
      form: { security_code: code },
    });
  }

  async profile() {
    const resp = await this.http.get('/accounts/edit/?__a=1');
    return resp.body.form_data;
  }

  async account(name) {
    const resp = await this.http.get(`/${name}/?__a=1`);
    return get(resp.body, 'graphql.user');
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

  async approveFriendship(userId) {
    const resp = await this.http.post(`/web/friendships/${userId}/approve/`);
    return resp.body;
  }

  async ignoreFriendship(userId) {
    const resp = await this.http.post(`/web/friendships/${userId}/ignore/`);
    return resp.body;
  }

  async block(userId) {
    const resp = await this.http.post(`/web/friendships/${userId}/block/`);
    return resp.body;
  }

  async unblock(userId) {
    const resp = await this.http.post(`/web/friendships/${userId}/unblock/`);
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

  async unlike(mediaId) {
    const resp = await this.http.post(`/web/likes/${mediaId}/unlike/`);
    return resp.body;
  }

  async save(mediaId) {
    const resp = await this.http.post(`/web/save/${mediaId}/save/`);
    return resp.body;
  }

  async unsave(mediaId) {
    const resp = await this.http.post(`/web/save/${mediaId}/unsave/`);
    return resp.body;
  }

  async userMedias(userId, limit = 20) {
    const resp = await this.graphql(USER_MEDIA_GRAPH, {
      id: String(userId),
      first: limit,
    });

    return get(resp.body, 'data.user.edge_owner_to_timeline_media');
  }

  async userStories(userId) {
    const resp = await this.graphql(USER_STORIES_GRAPH, {
      id: String(userId),
      include_chaining: true,
      include_reel: true,
      include_suggested_users: false,
      include_logged_out_extras: false,
    });

    return get(resp.body, 'data.user');
  }

  async placeMedias(placeId, limit = 20) {
    const resp = await this.graphql(PLACE_MEDIA_GRAPH, {
      id: String(placeId),
      first: limit,
    });

    return get(resp.body, 'data.location.edge_location_to_media');
  }

  async searchAny(query) {
    const resp = await this.http.get(`/web/search/topsearch/?context=blended&query=${query}`);
    return resp.body;
  }

  async searchUsers(username) {
    const resp = await this.http.get(`/web/search/topsearch/?context=user&query=${username}`);
    return resp.body;
  }

  async searchHashtags(hashtag) {
    const resp = await this.http.get(`/web/search/topsearch/?context=hashtag&query=${hashtag}`);
    return resp.body;
  }

  async searchPlaces(place) {
    const resp = await this.http.get(`/web/search/topsearch/?context=place&query=${place}`);
    return resp.body;
  }

  async addComment(mediaId, text) {
    const resp = await this.http.post(`/web/comments/${mediaId}/add/`, {
      form: { comment_text: String(text) },
    });
    return resp.body;
  }

  async deleteComment(mediaId, commentId) {
    const resp = await this.http.post(`/web/comments/${mediaId}/delete/${commentId}/`);
    return resp.body;
  }

  async activity() {
    const resp = await this.http.get('/accounts/activity/?__a=1');
    return get(resp.body, 'graphql.user');
  }

  async discoverMedias(limit = 20, page = 1) {
    const resp = await this.graphql(DISCOVER_MEDIAS_GRAPH, {
      first: limit,
      after: page,
    });

    return get(resp.body, 'data.user.edge_web_discover_media');
  }

  async shortcodeLikers(shortcode, limit = 20) {
    const resp = await this.graphql(LIKERS_SHORTCODE_GRAPH, {
      shortcode,
      first: limit,
    });

    return get(resp.body, 'data.shortcode_media');
  }

  async shortcodeComments(shortcode, limit = 20) {
    const resp = await this.graphql(COMMENTS_GRAPH, {
      shortcode,
      first: limit,
    });

    return get(resp.body, 'data.shortcode_media.edge_media_to_comment');
  }
}
