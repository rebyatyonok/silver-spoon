/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import './assets/light-palette.css';
import './assets/spacings.css';
import App from './App';

render(() => <App />, document.getElementById('root') as HTMLElement);
