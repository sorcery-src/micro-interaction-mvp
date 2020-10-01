import { useLayoutEffect } from "react"

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
	if (typeof id !== "string" || id === "") {
		const errorMessage = "<Style>: Did you forget an ID prop? Try <Style id={<string>}>."
		throw new Error(errorMessage)
	}

	useLayoutEffect(() => {
		if (!document.getElementById(id)) {
			const style = document.createElement("style")
			style.id = id
			style.appendChild(document.createTextNode(css))
			document.head.append(style)
		}
		return () => {
			const style = document.getElementById(id)
			if (style) {
				style.remove()
			}
		}
	}, [id, css])

	return null
}
