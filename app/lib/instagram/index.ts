/* eslint-disable no-param-reassign */

import Http from '@/lib/instagram/http';
import { get } from 'lodash';

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
} from '@/lib/instagram/constants';

interface IApiError extends Error {
  response: any;
}

function ApiError(message: string, response: any) {
  const error = new Error() as IApiError;

  error.name = 'ApiError';
  error.message = message;
  error.response = response;

  return error;
}

type Id = string | number;

export default class Instagram {
  http: Http;

  constructor() {
    this.http = new Http();
  }

  graphql(queryHash: string, variables = {}) {
    return this.http.get('/graphql/query/', {
      params: {
        query_hash: queryHash,
        variables: JSON.stringify(variables),
      },
    });
  }

  async auth(username: string, password: string) {
    this.http.cookies.clear();

    const resp = await this.http.post('/accounts/login/ajax/', {
      jar: true,
      form: { username, password },
    });

    if (get(resp, 'data.authenticated')) { return resp.data; }

    throw ApiError('Incorrect login or password', resp);
  }

  async profile() {
    const resp = await this.http.get('/accounts/edit/?__a=1');
    return resp.data.form_data;
  }

  async account(name: string) {
    const resp = await this.http.get(`/${name}/?__a=1`);
    return get(resp.data, 'graphql.user');
  }

  async followers(userId: Id, limit: number = 20) {
    const resp = await this.graphql(FOLLOWERS_GRAPH, {
      id: String(userId),
      first: limit,
    });

    return get(resp.data, 'data.user.edge_followed_by');
  }

  async following(userId: Id, limit: number = 20) {
    const resp = await this.graphql(FOLLOWING_GRAPH, {
      first: limit,
      id: String(userId),
    });

    return get(resp.data, 'data.user.edge_follow');
  }

  async follow(userId: Id) {
    const resp = await this.http.post(`/web/friendships/${userId}/follow/`);
    return resp.data;
  }

  async unfollow(userId: Id) {
    const resp = await this.http.post(`/web/friendships/${userId}/unfollow/`);
    return resp.data;
  }

  async approveFriendship(userId: Id) {
    const resp = await this.http.post(`/web/friendships/${userId}/approve/`);
    return resp.data;
  }

  async ignoreFriendship(userId: Id) {
    const resp = await this.http.post(`/web/friendships/${userId}/ignore/`);
    return resp.data;
  }

  async block(userId: Id) {
    const resp = await this.http.post(`/web/friendships/${userId}/block/`);
    return resp.data;
  }

  async unblock(userId: Id) {
    const resp = await this.http.post(`/web/friendships/${userId}/unblock/`);
    return resp.data;
  }

  async me() {
    const resp = await this.http.get('/accounts/edit/?__a=1');
    return get(resp, 'data.form_data');
  }

  async hashtag(hashtag: string, limit: number = 20) {
    const resp = await this.graphql(HASHTAG_GRAPH, {
      tag_name: String(hashtag),
      first: limit,
    });

    return get(resp.data, 'data.hashtag.edge_hashtag_to_media');
  }

  async shortcodeMedia(shortcode: string) {
    const resp = await this.http.get(`/p/${shortcode}/?__a=1`);
    return get(resp.data, 'graphql.shortcode_media');
  }

  async like(mediaId: Id) {
    const resp = await this.http.post(`/web/likes/${mediaId}/like/`);
    return resp.data;
  }

  async unlike(mediaId: Id) {
    const resp = await this.http.post(`/web/likes/${mediaId}/unlike/`);
    return resp.data;
  }

  async save(mediaId: Id) {
    const resp = await this.http.post(`/web/save/${mediaId}/save/`);
    return resp.data;
  }

  async unsave(mediaId: Id) {
    const resp = await this.http.post(`/web/save/${mediaId}/unsave/`);
    return resp.data;
  }

  async userMedias(userId: Id, limit: number = 20) {
    const resp = await this.graphql(USER_MEDIA_GRAPH, {
      id: String(userId),
      first: limit,
    });

    return get(resp.data, 'data.user.edge_owner_to_timeline_media');
  }

  async userStories(userId: Id) {
    const resp = await this.graphql(USER_STORIES_GRAPH, {
      id: String(userId),
      include_chaining: true,
      include_reel: true,
      include_suggested_users: false,
      include_logged_out_extras: false,
    });

    return get(resp.data, 'data.user');
  }

  async placeMedias(placeId: Id, limit: number = 20) {
    const resp = await this.graphql(PLACE_MEDIA_GRAPH, {
      id: String(placeId),
      first: limit,
    });

    return get(resp.data, 'data.location.edge_location_to_media');
  }

  async searchAny(query: string) {
    const resp = await this.http.get(`/web/search/topsearch/?context=blended&query=${query}`);
    return resp.data;
  }

  async searchUsers(username: string) {
    const resp = await this.http.get(`/web/search/topsearch/?context=user&query=${username}`);
    return resp.data;
  }

  async searchHashtags(hashtag: string) {
    const resp = await this.http.get(`/web/search/topsearch/?context=hashtag&query=${hashtag}`);
    return resp.data;
  }

  async searchPlaces(place: string) {
    const resp = await this.http.get(`/web/search/topsearch/?context=place&query=${place}`);
    return resp.data;
  }

  async addComment(mediaId: Id, text: string) {
    const resp = await this.http.post(`/web/comments/${mediaId}/add/`, {
      form: { comment_text: String(text) },
    });
    return resp.data;
  }

  async deleteComment(mediaId: Id, commentId: Id) {
    const resp = await this.http.post(`/web/comments/${mediaId}/delete/${commentId}/`);
    return resp.data;
  }

  async activity() {
    const resp = await this.http.get('/accounts/activity/?__a=1');
    return get(resp.data, 'graphql.user');
  }

  async discoverMedias(limit = 20, page = 1) {
    const resp = await this.graphql(DISCOVER_MEDIAS_GRAPH, {
      first: limit,
      after: page,
    });

    return get(resp.data, 'data.user.edge_web_discover_media');
  }

  async shortcodeLikers(shortcode: string, limit: number = 20) {
    const resp = await this.graphql(LIKERS_SHORTCODE_GRAPH, {
      first: limit,
      shortcode,
    });

    return get(resp.data, 'data.shortcode_media');
  }

  async shortcodeComments(shortcode: string, limit: number = 20) {
    const resp = await this.graphql(COMMENTS_GRAPH, {
      first: limit,
      shortcode,
    });

    return get(resp.data, 'data.shortcode_media.edge_media_to_comment');
  }
}
