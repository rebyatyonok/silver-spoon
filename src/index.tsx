/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import './assets/colors.css';
import './assets/spacings.css';
import App from './app';

render(() => <App />, document.querySelector('#root') as HTMLElement);
