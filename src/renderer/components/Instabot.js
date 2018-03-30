import React from 'react';
import { css } from 'emotion';
import Layout from './Layout';

const application = css`
  transition: color 0.5s;
  color: #ccc;
  font-size: 25px;
  cursor: pointer;

  &:hover {
    color: #aaa;
  }
`;

export default () => (
  <Layout>
    <div className={application}>
      Instabot
    </div>
  </Layout>
);
