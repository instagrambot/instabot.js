import React, { Component } from 'react';
import Sidebar from './Sidebar';

export default class Layout extends Component {
  static displayName = 'Layout'

  render() {
    return (
      <div className="b-layout">
        <div className="b-layout__sidebar">
          <Sidebar />
        </div>

        <div className="b-layout__body">
          { this.props.children }
        </div>
      </div>
    );
  }
}
