import detab from "detab"
import { useLayoutEffect } from "react"

// <CSS> manually renders a <style> element once.
//
// Ex:
//
// function Component() {
//   const id = React.useMemo(() => {
//     return uuidv4()
//   }, [])
//
//   return (
//     <CSS id={id}>
//       {css`
//         ...
//       `}
//     </CSS>
//   )
// }
//
export default function CSS({ id, children: css }) {
	if (typeof id !== "string" || id === "") {
		const errorMessage = "<CSS>: Did you forget an ID prop? Try <CSS id={<string>}>."
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
