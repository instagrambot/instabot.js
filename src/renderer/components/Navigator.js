import React, { Component } from 'react';
import cn from 'classnames';

export default class Navigator extends Component {
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
        className={cn('b-navigator', { 'b-navigator--active': state.active })}
        onClick={this.handleClick}
      >
        <div className="b-navigator__section b-navigator__section--front">
          Front
        </div>

        <div className="b-navigator__section b-navigator__section--back">
          Back
        </div>
      </div>
    );
  }
}
