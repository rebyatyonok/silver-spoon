import type { Component } from 'solid-js';

import css from './index.module.css';

namespace Kit {
	export namespace Spinner {
		export type Props = {
			size?: 'inherit' | string,
		}
	}
}

const Spinner: Component<Kit.Spinner.Props> = () => {
	return (
		<svg class={css.spinner} viewBox="0 0 50 50">
			<circle class={css.path} cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
		</svg>
	);
};

export default Spinner;
