import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Flipper from './Flipper';
import Accounts from './Accounts';

export default class Layout extends Component {
  static displayName = 'Layout'

  render() {
    return (
      <div className="b-layout">
        <Flipper className="b-layout__sidebar">
          {(flipper) => {
            if (flipper.target === 'accounts') {
              return <Accounts onBack={() => flipper.reset()} />;
            }

            return <Sidebar onClick={(e, type) => flipper.show(type)} />;
          }}
        </Flipper>

        <div className="b-layout__body">
          { this.props.children }
        </div>
      </div>
    );
  }
}
