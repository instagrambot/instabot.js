import React, { Component } from 'react';
import Types from 'prop-types';
import { noop } from 'lodash';
import Flipper from '@/components/Flipper';
import AccountsList from './AccountsList';
import AccountsCreate from './AccountsCreate';

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
      <Flipper className="b-accounts">
        {(flipper) => {
          if (flipper.target === 'accounts.create') {
            return <AccountsCreate onBack={() => flipper.reset()} />;
          }

          return <AccountsList onBack={onBack} onAdd={() => flipper.show('accounts.create')} />;
        }}
      </Flipper>
    );
  }
}

export default Accounts;
