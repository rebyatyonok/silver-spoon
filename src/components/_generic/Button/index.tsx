import { children, JSX, mergeProps, ParentComponent, splitProps } from 'solid-js';
import { mergeClasses } from '../../../helpers/merge-classes';

import css from './index.module.css';

namespace Kit {
	export namespace Button {
		type OwnProps = {
			size?: Size,
			variant?: Variant,
			color?: Color,
		}
		export type Props = Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, keyof OwnProps> & OwnProps
		export type Size = keyof typeof sizesCSS
		export type Variant = keyof typeof variantsCSS
		export type Color = keyof typeof colorsCSS;
	}
}

const variantsCSS = {
	filled: css.filled,
	outline: css.outline,
	ghost: css.ghost,
	text: css.text,
}

const sizesCSS = {
	sm: css.sm,
	md: css.md,
	lg: css.lg,
}

const colorsCSS = {
	primary: css.primary,
	secondary: css.secondary,
	accent: css.accent,
}

const defaultProps = {
	size: 'md',
	variant: 'filled',
	color: 'primary',
} satisfies Kit.Button.Props

const Button: ParentComponent<Kit.Button.Props> = (props) => {
	const merged = mergeProps(defaultProps, props)

	const [styling, others] = splitProps(merged, [...Object.keys(defaultProps), 'class'])

	const mainContent = children(() => merged.children)

	return (
		<button
			{...others}
			class={mergeClasses(css.button, styling.class, variantsCSS[styling.variant], sizesCSS[styling.size], colorsCSS[styling.color])}
		>
			{ mainContent() }
		</button>
	);
};

export default Button;