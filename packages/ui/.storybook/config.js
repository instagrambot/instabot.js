import { configure } from '@storybook/react';

const stories = () => {
  require('../stories/button.js');
}

configure(stories, module);
