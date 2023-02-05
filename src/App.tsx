import type { Component } from 'solid-js';

import styles from "./app.module.css";
import Button from './components/_generic/Button';

const App: Component = () => {
	return (
		<div>
			<Button class={styles.button} onClick={(e) => console.log(e)} color="blue">
				Small text node <i>another</i>
			</Button>

			<Button class={styles.button} onClick={(e) => console.log(e)} color="green">
				Small text node <i>another</i>
			</Button>

			<Button class={styles.button} onClick={(e) => console.log(e)} color="orange">
				Small text node <i>another</i>
			</Button>

			<Button class={styles.button} onClick={(e) => console.log(e)} color="red">
				small text node <i>another</i>
			</Button>

			<Button class={styles.button} onClick={(e) => console.log(e)} color="purple">
				small text node <i>another</i>
			</Button>

			<Button class={styles.button} onClick={(e) => console.log(e)} color="red" disabled>
				disabled
			</Button>

			<Button class={styles.button} onClick={(e) => console.log(e)} color="red" isLoading={true} loadingText="Loading">
				loading
			</Button>

			<Button>
				i
			</Button>
		</div>
	);
};

export default App;
