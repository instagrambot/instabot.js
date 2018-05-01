import React, { Component } from 'react';
import Types from 'prop-types';
import { noop } from 'lodash';
import Flip from '@/components/Flip';
import Control from '@/components/Control';

export default class AccountsCreate extends Component {
  static propTypes = {
    onBack: Types.func,
  }

  static defaultProps = {
    onBack: noop,
  }

  render() {
    const { onBack } = this.props;

    return (
      <Flip
        className="b-accounts-create"
        label="Add account"
        onLabelClick={onBack}
      >
        <Control label="Account" />
        <Control label="Password" type="password" />
      </Flip>
    );
  }
}
