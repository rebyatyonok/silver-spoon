import type { Component } from 'solid-js';

import styles from './App.module.css';
import Button from './components/Button';

const App: Component = () => {
	return (
		<div>
			<Button class={styles.button} onClick={(e) => console.log(e)} size="small">
				small text node
			</Button>

			<Button class={styles.button} onClick={(e) => console.log(e)} size="medium">
				<span>child span</span>
			</Button>

			<Button class={styles.button} onClick={(e) => console.log(e)} size="large">
				<span>child two</span>
				<span>spans</span>
			</Button>

			<Button size="large" content="icon">
				i
			</Button>
		</div>
	);
};

export default App;
