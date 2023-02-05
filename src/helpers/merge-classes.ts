export function mergeClasses(...classes: (string | undefined)[]): string {
	return classes.filter(Boolean).join(" ")
}