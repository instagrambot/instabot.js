import React from 'react';
import { css } from 'emotion';

const layout = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default props => (
  <div className={layout}>
    { props.children }
  </div>
);
