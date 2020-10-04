// Converts 1px -> 0.0625rem.
export default function px(n) {
	const rem = n / 16
	return rem + "rem"
}
