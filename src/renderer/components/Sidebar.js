import React from 'react';
import User from './User';

export default () => (
  <div className="b-sidebar">
    <div className="b-sidebar__header" />

    <div className="b-sidebar__footer">
      <div className="b-sidebar__item">
        <User />
      </div>
    </div>
  </div>
);
