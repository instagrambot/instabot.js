import cn from 'classnames';
import { capitalize, noop } from 'lodash';
import React, { Component, createRef } from 'react';

interface IControlProps {
  label: string;
  name: string;
  type: string;
  value: string;
  error: string;
  onBlur: (event: Event) => void;
  onFocus: (event: Event) => void;
  onChange: (event: Event) => void;
}

export default class extends Component<IControlProps, {}> {
  static defaultProps = {
    type: 'string',
    label: '',
    name: '',
    value: '',
    error: '',
    onBlur: noop,
    onFocus: noop,
    onChange: noop,
  };

  state = {
    focus: false,
    filled: false,
  };

  inputEl = createRef();

  componentDidMount() {
    this.provideEmpty();
  }

  provideEmpty = () => {
    this.setState({ filled: this.inputEl.current.value !== '' });
  }

  handleFocus = (event: Event) => {
    this.props.onFocus(event);
    this.setState({ focus: true });
  }

  handleBlur = (event: Event) => {
    this.props.onBlur(event);
    this.setState({ focus: false });
  }

  handleChange = (event: Event) => {
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
        <div className='b-control__label'>
          {capitalize(label || name)}
        </div>

        <input
          ref={this.inputEl}
          className='b-control__input'
          name={name}
          type={type}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyPress={handleChange}
          onChange={handleChange}
        />

        <div className='b-control__hint'>
          &nbsp;{error}
        </div>
      </div>
    );
  }
}
