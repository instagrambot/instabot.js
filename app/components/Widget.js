import React, { Component } from 'react';
import Types from 'prop-types';
import { noop } from 'lodash';
import cn from 'classnames';
import Icon from '@/components/Icon';

export default class Widget extends Component {
  static displayName = 'Widget';

  static propTypes = {
    label: Types.string,
    labelIcon: Types.string,
    onLabelClick: Types.func,
    className: Types.string,
  }

  static defaultProps = {
    label: 'Widget',
    labelIcon: 'ios-arrow-back',
    onLabelClick: noop,
    className: null,
  }

  render() {
    const {
      label,
      labelIcon,
      onLabelClick,
      className,
      children,
    } = this.props;

    return (
      <div className={cn('b-widget', className)}>
        <div className="b-widget__label" onClick={onLabelClick}>
          <Icon name={labelIcon} /> { label }
        </div>

        <div className="b-widget__body">
          { children }
        </div>
      </div>
    );
  }
}
