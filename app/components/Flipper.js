/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import cn from 'classnames';

export default class extends Component {
  static displayName = 'Flipper'

  constructor(props) {
    super(props);

    this.show = this.show.bind(this);
    this.reset = this.reset.bind(this);

    this.state = {
      target: null,
      active: false,
    };
  }

  show(target) {
    this.setState({ target, active: true });
  }

  reset() {
    this.setState({ active: false });
  }

  render() {
    const { state, props } = this;
    const { target } = state;
    const { children } = props;

    const api = {
      target,
      show: this.show,
      reset: this.reset,
    };

    let front = children;
    let back = null;

    if (typeof children === 'function') {
      front = children({ ...api, target: null });
      if (target !== null) back = children(api);
    }

    const classNames = cn(
      {
        'b-flipper': true,
        'b-flipper--active': state.active,
      },
      props.className,
    );

    return (
      <div className={classNames}>
        <div className="b-flipper__section b-flipper__section--front">{ front }</div>
        <div className="b-flipper__section b-flipper__section--back">{ back }</div>
      </div>
    );
  }
}
