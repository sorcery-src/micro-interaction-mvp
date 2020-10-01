// <Style> renders a <style> element once.
//
// Ex:
//
// function Component() {
//   const id = React.useMemo(() => {
//     return uuidv4()
//   }, [])
//
//   return (
//     <Style id={id}>
//       {css`
//         ...
//       `}
//     </Style>
//   )
// }
//
export default function Style({ id, children: css }) {
	// Guard:
	if (typeof id !== "string" || id === "") {
		const errorMessage = "<Style>: Did you forget an ID prop? Try <Style id={<string>}>."
		throw new Error(errorMessage)
	}

	// Prevent rerender:
	if (document.getElementById(id)) {
		return null
	}
	// Render:
	return <style id={id}>{css}</style>
}
