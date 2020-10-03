import detab from "detab"
import { useLayoutEffect } from "react"

// <StyleOnce> manually renders a <style> element once.
//
// Ex:
//
// const id = uuidv4()
//
// function Component() {
//   return (
//     <StyleOnce id={id}>
//       {css`
//         ...
//       `}
//     </StyleOnce>
//   )
// }
//
export default function StyleOnce({ id, children: css }) {
	if (typeof id !== "string" || id === "") {
		const errorMessage = "<StyleOnce>: Did you forget an ID prop? Try <StyleOnce id={<string>}>."
		throw new Error(errorMessage)
	}

	useLayoutEffect(() => {
		if (!document.getElementById(id)) {
			const style = document.createElement("style")
			style.id = id
			style.appendChild(document.createTextNode(detab(css)))
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
