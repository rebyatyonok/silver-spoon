import { children, Component, JSX, splitProps } from 'solid-js';
import { mergeClasses } from '../../helpers/mergeClasses';

import styles from './index.module.css';

namespace Kit {
	export namespace Button {
		export type Props = JSX.ButtonHTMLAttributes<HTMLButtonElement>;
		export type Event = PointerEvent & { currentTarget: HTMLButtonElement; target: Element; };
		export type SizeTypes = keyof typeof SizeClasses
		export type LookTypes = 'filled' | 'outline' | 'ghost';
		export type ContentTypes = 'mixed' | 'icon';
		export type Kind = `${SizeTypes}-${LookTypes}-${ContentTypes}`;
	}
}

const SizeClasses = {
	'auto': styles.sizeAuto,
	'large': styles.sizeLarge,
	'medium': styles.sizeMedium,
	'small': styles.sizeSmall
}

const Button: Component<Kit.Button.Props> = (props) => {
	const c = children(() => props.children)

	function handleEvent<T extends keyof typeof props>(name: T, e: Parameters<typeof props[T]>[0]) {
		if (props.disabled || !props[name]) return

		props[name](e)
	}

	// Chrome onClick emits PointerEvent instead of MouseEvent so onClick usage will lead
	// to different events in different browsers
	// https://chromestatus.com/feature/5670732015075328

	function onPointerUp(e: Kit.Button.Event) {
		handleEvent('onPointerUp', e)
	}

	function onPointerDown(e: Kit.Button.Event) {
		handleEvent('onPointerDown', e)
	}

	return (
		<button
			{...props}
			class={mergeClasses(styles.button, props.class)}
			onPointerUp={onPointerUp}
			onPointerDown={onPointerDown}
		>
			{ c() }
		</button>
	);
};

export default Button;