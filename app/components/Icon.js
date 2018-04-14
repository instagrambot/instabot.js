/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class extends Component {
  static displayName = 'Icon'

  static propTypes = {
    name: propTypes.string.isRequired,
  }

  render() {
    return (
      <i className={`ion-${this.props.name} b-icon`} />
    );
  }
}
