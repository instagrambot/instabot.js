import cn from 'classnames';
import React, { Component } from 'react';

type TFlipperChildren = (object: {
  target: string | null,
  show: (target: string) => void,
  reset: () => void,
}) => { [key: string]: JSX.Element };

interface IFlipperProps {
  className ?: string;
  children: TFlipperChildren;
}

interface IFlipperState {
  target: string | null;
  active: boolean;
}

export default class extends Component<IFlipperProps, IFlipperState> {
  static displayName = 'Flipper';

  state = {
    target: null,
    active: false,
  };

  show = (target: string) => {
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
    const back = target ? targets[target] : null;

    const classNames = cn(
      {
        'b-flipper': true,
        'b-flipper--active': active,
      },
      className,
    );

    return (
      <div className={classNames}>
        <div className='b-flipper__section b-flipper__section--front'>
          {front}
        </div>

        <div className='b-flipper__section b-flipper__section--back'>
          {back}
        </div>
      </div>
    );
  }
}
