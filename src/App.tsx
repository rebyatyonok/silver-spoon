import type { Component } from 'solid-js';

import Button from './components/_generic/Button';

const App: Component = () => {
	return (
		<div>
			<h1>Sizes</h1>
			<Button size="sm">
				Button sm
			</Button>
			<Button size="md">
				Button md
			</Button>
			<Button size="lg">
				Button lg
			</Button>

			<h1>Colors</h1>
			<Button color="primary">
				Primary
			</Button>
			<Button color="secondary">
				Secondary
			</Button>
			<Button color="accent">
				Accent
			</Button>

			<h1>Variants</h1>
			<Button variant="filled">
				Filled
			</Button>
			<Button variant="outline">
				Outline
			</Button>
			<Button variant="ghost">
				Ghost
			</Button>
			this is a<Button variant="text">
				text button
			</Button>

			<h1>Mixed</h1>
			<Button variant="outline" color="secondary">
				Outline secondary
			</Button>
			<Button variant="ghost" color="accent">
				accent ghost
			</Button>
		</div>
	);
};

export default App;
