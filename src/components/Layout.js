import React from 'react';
import Sidebar from './Sidebar';

export default props => (
  <div className="b-layout">
    <div className="b-layout__sidebar">
      <Sidebar />
    </div>

    <div className="b-layout__body">
      { props.children }
    </div>
  </div>
);
