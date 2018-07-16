/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */

import electron from 'electron';

export const openExternal = (event: any) => {
  event.preventDefault();
  electron.shell.openExternal(event.target.href);
};
