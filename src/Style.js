// <Style> renders a CSS string once.
function Style({ id, children: css }) {
	// Prevent rerender:
	if (document.getElementById(id)) {
		return null
	}
	// Render:
	return <style id={id}>{css}</style>
}
