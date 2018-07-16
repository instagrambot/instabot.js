import electron from 'electron';

export const openExternal = (event: any) => {
  event.preventDefault();
  electron.shell.openExternal(event.target.href);
};
