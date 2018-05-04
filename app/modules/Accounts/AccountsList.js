import React, { Component } from 'react';
import Types from 'prop-types';
import { noop } from 'lodash';
import Icon from '@/components/Icon';
import Flip from '@/components/Flip';

export default class AccountsList extends Component {
  static displayName = 'AccountsList';

  static propTypes = {
    onBack: Types.func,
    onAdd: Types.func,
  }

  static defaultProps = {
    onBack: noop,
    onAdd: noop,
  }

  render() {
    const { onAdd, onBack } = this.props;

    return (
      <Flip
        className="b-accounts__list"
        label="Accounts"
        onLabelClick={onBack}
      >
        <div className="b-accounts__list-body" />

        <div className="b-accounts__list-footer">
          <button className="b-btn b-btn--block" onClick={onAdd}>
            <Icon name="ios-add-outline" /> Add account
          </button>
        </div>
      </Flip>
    );
  }
}
