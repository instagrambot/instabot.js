import React, { Component } from 'react';
import Icon from '@/components/Icon';
import propTypes from 'prop-types';
import { noop } from 'lodash';

export default class extends Component {
  static displayName = 'Accounts';

  static propTypes = {
    onBack: propTypes.func,
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
      </div>
    );
  }
}
