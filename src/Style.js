// <Style> renders a CSS string once.
function Style({ id: uuid, children: css }) {
	// Guards:
	if (typeof id !== "string" || id === "") {
		const errorMessage = "<Style>: Did you forget an ID prop? Try <Style id={<string>}>."
		throw new Error(errorMessage)
	}

	// Prevent rerender:
	if (document.getElementById(id)) {
		return null
	}
	// Render:
	return <style id={uuid}>{css}</style>
}
