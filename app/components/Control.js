import React, { Component, createRef } from 'react';
import { noop, capitalize } from 'lodash';
import Types from 'prop-types';
import cn from 'classnames';

export default class Control extends Component {
  static propTypes = {
    label: Types.string,
    name: Types.string,
    type: Types.string,
    value: Types.string,
    error: Types.string,
    onBlur: Types.func,
    onFocus: Types.func,
    onChange: Types.func,
  }

  static defaultProps = {
    type: 'string',
    label: '',
    name: '',
    value: '',
    error: '',
    onBlur: noop,
    onFocus: noop,
    onChange: noop,
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

  handleFocus = (event) => {
    this.props.onFocus(event);
    this.setState({ focus: true });
  }

  handleBlur = (event) => {
    this.props.onBlur(event);
    this.setState({ focus: false });
  }

  handleChange = (event) => {
    this.provideEmpty();
    this.props.onChange(event);
  }

  render() {
    const {
      label,
      type,
      value,
      name,
      error,
    } = this.props;

    const { focus, filled } = this.state;
    const { handleBlur, handleChange, handleFocus } = this;

    const classes = cn('b-control', {
      'b-control--focus': focus,
      'b-control--filled': filled,
      'b-control--error': error,
    });

    return (
      <div className={classes}>
        <div className="b-control__body">
          <div className="b-control__label">
            { capitalize(label || name) }
          </div>

          <input
            ref={this.inputEl}
            className="b-control__input"
            name={name}
            type={type}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyPress={handleChange}
            onChange={handleChange}
          />
        </div>

        <div className="b-control__hint">
          &nbsp;{ error }
        </div>
      </div>
    );
  }
}
