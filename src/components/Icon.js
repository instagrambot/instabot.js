/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Icon extends Component {
  static propTypes = {
    name: propTypes.string.isRequired,
  }

  render() {
    return (
      <i className={`ion-${this.props.name} b-icon`} />
    );
  }
}
