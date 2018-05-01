import React, { Component, createRef } from 'react';
import Types from 'prop-types';
import cn from 'classnames';

export default class Control extends Component {
  static propTypes = {
    label: Types.string.isRequired,
    type: Types.string,
  }

  static defaultProps = {
    type: 'string',
  }

  state = {
    focus: false,
    filled: false,
  }

  componentDidMount() {
    this.provideEmpty();
  }

  inputEl = createRef()

  provideEmpty = () => {
    this.setState({ filled: this.inputEl.current.value !== '' });
  }

  handleFocus = () => {
    this.setState({ focus: true });
  }

  handleBlur = () => {
    this.setState({ focus: false });
  }

  render() {
    const { label, type } = this.props;
    const { focus, filled } = this.state;

    const classes = cn('b-control', {
      'b-control--focus': focus,
      'b-control--filled': filled,
    });

    return (
      <div className={classes}>
        <div className="b-control__label">
          { label }
        </div>

        <input
          className="b-control__input"
          type={type}
          ref={this.inputEl}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyPress={this.provideEmpty}
          onChange={this.provideEmpty}
        />
      </div>
    );
  }
}
