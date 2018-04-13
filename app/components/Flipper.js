/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import cn from 'classnames';

export default class Flipper extends Component {
  static displayName = 'Flipper'

  static propTypes = {
    back: propTypes.any,
    front: propTypes.any,
  }

  static defaultProps = {
    back: null,
    front: null,
  }

  constructor(props) {
    super(props);

    this.state = { active: false };
  }

  toggle = (value) => {
    this.setState({ active: !!value });
  }

  renderFront() {
    const { toggle } = this;
    const { front } = this.props;

    return (
      <div className="b-flipper__section b-flipper__section--front">
        { typeof front === 'function' ? front(toggle) : front }
      </div>
    );
  }

  renderBack() {
    const { toggle } = this;
    const { back } = this.props;

    return (
      <div className="b-flipper__section b-flipper__section--back">
        { typeof back === 'function' ? back(toggle) : back }
      </div>
    );
  }

  render() {
    const { state } = this;
    const classNames = cn('b-flipper', { 'b-flipper--active': state.active });

    return (
      <div className={classNames}>
        { this.renderFront() }
        { this.renderBack() }
      </div>
    );
  }
}
