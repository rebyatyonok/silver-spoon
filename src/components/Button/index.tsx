import { children, JSX, mergeProps, ParentComponent, splitProps } from 'solid-js';
import { mergeClasses } from '../../helpers/mergeClasses';
import { sizeClasses } from '../common';

import css from './index.module.css';

namespace Kit {
	export namespace Button {
		export type Props = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
			size?: Size,
			look?: Look,
			content?: Content,
			whenClick?: (e: Event) => any
		}
		export type Event = PointerEvent & { currentTarget: HTMLButtonElement; target: Element; }
		export type Size = keyof typeof sizeClasses
		export type Look = keyof typeof lookClasses
		export type Content = keyof typeof contentClasses
	}
}

const lookClasses = {
	filled: css.filled,
	outline: css.outline,
	ghost: css.ghost
}

const contentClasses = {
	mixed: css.mixed,
	icon: css.icon
}

const Button: ParentComponent<Kit.Button.Props> = (props) => {
	const defaultProps = {
		size: 'medium',
		content: 'mixed',
		look: 'filled'
	} satisfies Kit.Button.Props;

	const merged = mergeProps(defaultProps, props);

	const [styling, others] = splitProps(merged, [...Object.keys(defaultProps), 'class'])
	const getChildren = children(() => merged.children)
	const classes = mergeClasses(css.button, styling.class, contentClasses[styling.content], lookClasses[styling.look], sizeClasses[styling.size]);

	// in chrome onClick generates PointerEvent instead of MouseEvent https://chromestatus.com/feature/5670732015075328
	// so here we emulate onClick behavior with onPointer events to have consistent behavior in all browsers
	let isDownEvent = false;

	function onPointerUp(e: Kit.Button.Event) {
		if (props.disabled || !props.whenClick) return

		if (isDownEvent) props.whenClick(e);

		isDownEvent = false;
	}

	function onPointerDown() {
		isDownEvent = true;
	}

	return (
		<button
			{...others}
			class={classes}
			onPointerDown={onPointerDown}
			onPointerUp={onPointerUp}
		>
			{ getChildren() }
		</button>
	);
};

export default Button;