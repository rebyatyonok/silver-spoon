import type { Component } from 'solid-js';

import styles from './App.module.css';
import Button from './components/Button';

const App: Component = () => {
	return (
		<div>
			<Button class={styles.button} onPointerDown={(e) => console.log(e)}>
				<span>first</span>
				<span>second</span>
			</Button>
		</div>
	);
};

export default App;
