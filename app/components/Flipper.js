/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import Types from 'prop-types';
import cn from 'classnames';

export default class extends Component {
  static displayName = 'Flipper'

  static propTypes = {
    children: Types.func.isRequired,
    className: Types.string,
  }

  static defaultProps = {
    className: '',
  }

  state = {
    target: null,
    active: false,
  };

  show = (target) => {
    this.setState({ target, active: true });
  }

  reset = () => {
    this.setState({ active: false });
  }

  render() {
    const { show, reset } = this;
    const { target, active } = this.state;
    const { children, className } = this.props;

    const targets = children({ target, show, reset });
    const front = targets.default;
    const back = targets[target];

    const classNames = cn(
      {
        'b-flipper': true,
        'b-flipper--active': active,
      },
      className,
    );

    return (
      <div className={classNames}>
        <div className="b-flipper__section b-flipper__section--front">
          { front }
        </div>

        <div className="b-flipper__section b-flipper__section--back">
          { back }
        </div>
      </div>
    );
  }
}
