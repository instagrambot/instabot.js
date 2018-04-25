import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '@/store';
import Layout from '@/modules/Layout';

export default class extends Component {
  static displayName = 'Instabot'

  render() {
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}
