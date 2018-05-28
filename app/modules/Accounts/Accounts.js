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
        {f => ({
          default: <AccountsList onBack={onBack} onAdd={() => f.show('create')} />,
          create: <AccountsCreate onBack={() => f.reset()} />,
        })}
      </Flipper>
    );
  }
}

export default Accounts;
