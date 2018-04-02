import '@/styles/index.scss';

import React from 'react';
import { render } from 'react-dom';
import Instabot from './components/Instabot';
import '../../support/repl';

render(<Instabot />, document.getElementById('app'));
