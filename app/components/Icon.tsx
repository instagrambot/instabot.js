/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';

interface IIconProps {
  name: string;
}

export default class extends Component<IIconProps, {}> {
  static displayName = 'Icon';

  render() {
    return (
      <i className={`ion-${this.props.name} b-icon`}/>
    );
  }
}
