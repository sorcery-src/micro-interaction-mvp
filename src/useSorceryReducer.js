import useMethods from "use-methods"
import { v4 as uuidv4 } from "uuid"

const methods = state => ({
	handlePointerDown() {
		state.pointer.down = true

		let offset = 0
		if (state.elements.length > 0) {
			offset = state.elements.reduce((acc, each) => acc + each.style.height, 0)
		}

		const height = state.pointer.y - 8 - 8 / 2 - offset
		state.elements.push({
			id: uuidv4().slice(0, 6),
			style: {
				display: "block",
				width: "100%",
				maxWidth: "100%",
				height,
				backgroundColor: `hsl(${Math.floor(Math.random() * 360)}, 100%, 90%)`,
			},
		})
	},

	handlePointerMove({ x, y }) {
		state.pointer.x = x
		state.pointer.y = y
		if (state.pointer.down) {
			if (state.elements.length > 0) {
				// NOTE: Use state.elements.length > 1.
				let offset = 0
				if (state.elements.length > 1) {
					offset = state.elements.slice(0, -1).reduce((acc, each) => acc + each.style.height, 0)
				}

				const height = Math.max(0, state.pointer.y - 8 - 8 / 2 - offset)
				state.elements[state.elements.length - 1].style.height = height
			}
		}
	},

	handlePointerUp() {
		state.pointer.down = false
	},
})

const initialState = {
	pointer: {
		down: false,
		x: 0,
		y: 0,
	},
	elements: [],
}

export default function useSorceryReducer() {
	return useMethods(methods, initialState)
}
