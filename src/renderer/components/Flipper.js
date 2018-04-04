import React, { Component } from 'react';
import cn from 'classnames';

export default class Flipper extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.state = { active: false };
  }

  handleClick() {
    this.setState({ active: !this.state.active });
  }

  render() {
    const { state } = this;

    return (
      <div
        className={cn('b-flipper', { 'b-flipper--active': state.active })}
        onClick={this.handleClick}
      >
        <div className="b-flipper__section b-flipper__section--front">
          Front
        </div>

        <div className="b-flipper__section b-flipper__section--back">
          Back
        </div>
      </div>
    );
  }
}
