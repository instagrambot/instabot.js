import React, { Component } from 'react';
import Types from 'prop-types';
import { noop } from 'lodash';
import Icon from '@/components/Icon';

class Accounts extends Component {
  static displayName = 'Accounts';

  static propTypes = {
    onBack: Types.func,
  }

  static defaultProps = {
    onBack: noop,
  }

  render() {
    const { onBack } = this.props;

    return (
      <div className="b-accounts">
        <div
          className="b-accounts__header"
          onClick={onBack}
        >
          <Icon name="ios-arrow-back" /> Accounts
        </div>

        <div className="b-accounts__body" />

        <div className="b-accounts__footer">
          <button className="b-btn b-btn--block">
            <Icon name="ios-add-outline" /> Add account
          </button>
        </div>
      </div>
    );
  }
}

export default Accounts;
