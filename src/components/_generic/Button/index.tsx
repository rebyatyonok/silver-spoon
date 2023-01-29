import { children, JSX, mergeProps, ParentComponent, splitProps } from 'solid-js';
import { mergeClasses } from '../../../helpers/mergeClasses';
import { sizeClasses } from '../../common';
import Spinner from '../Spinner';

import css from './index.module.css';

const colors = ['gray', 'blue', 'green', 'orange', 'red', 'purple'] as const;
const hues = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

namespace Kit {
	export namespace Button {
		type OwnProps = {
			size?: Size,
			variant?: Variant,
			leftIcon?: JSX.Element,
			rightIcon?: JSX.Element,
			color?: Color,
			isLoading?: boolean,
			loadingText?: string,
			spinnerPlacement?: 'start' | 'end'
		}
		export type Props = Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, keyof OwnProps> & OwnProps
		export type Size = keyof typeof sizeClasses
		export type Variant = keyof typeof variantClasses
		export type Color = typeof colors[number] // | { color: typeof colors[number], baseHue?: typeof hues[number]}
	}
}

const variantClasses = {
	filled: css.filled,
	outline: css.outline,
	ghost: css.ghost,
}

const defaultProps = {
	size: 'md',
	variant: 'filled',
	color: 'gray',
} satisfies Kit.Button.Props

function getColorVarsString(color: typeof colors[number], hue: typeof hues[number] = 500) {
	let hueIndex = hues.indexOf(hue);

	// TODO: move checks into dev mode
	if (hueIndex < 2) {
		if (hueIndex == -1) console.error(`Expected hue from config ${hue}`)
		else console.error(`Expected hue to be bigger than ${hue} to calculate colors correctly`)
	}

	let colorsToBuild = ['base', 'hover', 'active'];
	let result = '';

	for (let i = 0; i < colorsToBuild.length; i++) {
		result += `--${colorsToBuild[i]}-color: var(--${color}-${hues[hueIndex]});`;

		hueIndex = hueIndex === 0 ? 0 : hueIndex - 1;
	}

	return result;
}

const Button: ParentComponent<Kit.Button.Props> = (props) => {
	const merged = mergeProps(defaultProps, props)

	const [styling, loading, icons, others] = splitProps(
		merged,
		[...Object.keys(defaultProps), 'class'],
		['isLoading', 'loadingText', 'spinnerPlacement'],
		['leftIcon', 'rightIcon']
	)

	const mainContent = children(() => merged.children)

	// TODO: enable customization of hue
	const themeVars = getColorVarsString(styling.color)

	let classes = mergeClasses(css.button, styling.class, variantClasses[styling.variant], sizeClasses[styling.size])

	function getContent() {
		let leftSlot;
		let content;
		let rightSlot;

		if (loading.isLoading) {
			if (loading.spinnerPlacement == 'end') {
				rightSlot = <Spinner />
			} else {
				leftSlot = <Spinner />
			}
			if (loading.loadingText) {
				content = loading.loadingText
			}
		} else {
			if (icons.leftIcon) {
				leftSlot = icons.leftIcon
			}
			if (icons.rightIcon) {
				rightSlot = icons.rightIcon
			}

			content = mainContent()
		}

		return [leftSlot, content, rightSlot].filter(e => !!e)
	}

	const content = getContent()

	if (content.length > 1) {
		classes = mergeClasses(classes, css.mixed)
	}

	return (
		<button
			style={themeVars}
			{...others}
			class={classes}
		>
			{ getContent() }
		</button>
	);
};

export default Button;