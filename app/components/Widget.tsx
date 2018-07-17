import Icon from '@/components/Icon';
import cn from 'classnames';
import { noop } from 'lodash';
import React, { Component, MouseEvent } from 'react';

interface IWidgetProps {
  label: string;
  labelIcon: string;
  onLabelClick: (event: MouseEvent<HTMLElement>) => void;
  className: string | null;
}

export default class Widget extends Component<IWidgetProps, {}> {
  static displayName = 'Widget';

  static defaultProps: Partial<IWidgetProps> = {
    label: 'Widget',
    labelIcon: 'ios-arrow-back',
    onLabelClick: noop,
  };

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
        <div className='b-widget__label' onClick={onLabelClick}>
          <Icon name={labelIcon} /> {label}
        </div>

        <div className='b-widget__body'>
          {children}
        </div>
      </div>
    );
  }
}
