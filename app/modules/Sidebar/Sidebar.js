import React, { Component } from 'react';
import Icon from '@/components/Icon';
import propTypes from 'prop-types';
import { noop } from 'lodash';

// import Flipper from '@/components/Flipper';

export default class Sidebar extends Component {
  static displayName = 'Sidebar'

  static propTypes = {
    onClick: propTypes.func,
  }

  static defaultProps = {
    onClick: noop,
  }

  render() {
    const { onClick } = this.props;

    return (
      <div className="b-sidebar">
        <div
          className="b-sidebar__header"
          onClick={e => onClick(e, 'accounts')}
        >
          Ruslan Tatyshev

          <img
            src="https://avatars2.githubusercontent.com/u/2528926"
            className="b-sidebar__avatar"
          />
        </div>

        <div className="b-sidebar__body">
          <div className="b-sidebar__item">
            <Icon name="ios-globe-outline" /> Feed
          </div>

          <div className="b-sidebar__item">
            <Icon name="ios-heart-outline" /> Activity
          </div>

          <div className="b-sidebar__item">
            <Icon name="ios-camera-outline" /> Posts
          </div>

          <div className="b-sidebar__item">
            <Icon name="ios-person-add-outline" /> Followers
          </div>

          <div className="b-sidebar__item">
            <Icon name="ios-people-outline" /> Following
          </div>

          <div className="b-sidebar__devider" />

          <div className="b-sidebar__item">
            <Icon name="ios-game-controller-a-outline" /> Tasks
          </div>

          <div className="b-sidebar__item">
            <Icon name="ios-search" /> Targets
          </div>

          <div className="b-sidebar__item">
            <Icon name="ios-cog-outline" /> Settings
          </div>
        </div>
      </div>
    );
  }
}
