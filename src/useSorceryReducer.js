import useMethods from "use-methods"
import { v4 as uuidv4 } from "uuid"

const methods = state => ({
	handlePointerDown() {
		state.pointer.down = true

		const height = state.pointer.y - 6 - 6 / 2 // - offset
		if (!state.activeElement) {
			state.activeElement = {
				id: uuidv4().slice(0, 6),
				focusState: {
					element: true,
					handleBar: true,
				},
				focused: false, // TODO: Deprecate
				style: {
					display: "block",
					width: "100%",
					maxWidth: "100%",
					height,
				},
			}
		}

		// let offset = 0
		// if (state.elements.length > 0) {
		// 	offset = state.elements.reduce((acc, each) => acc + each.style.height, 0)
		// }

		// const height = state.pointer.y - 6 - 6 / 2 // - offset
		// state.activeElement = {
		// 	id: uuidv4().slice(0, 6),
		// 	focused: true,
		// 	style: {
		// 		display: "block",
		// 		width: "100%",
		// 		maxWidth: "100%",
		// 		height,
		// 	},
		// }
	},

	handlePointerMove({ x, y }) {
		state.pointer.x = x
		state.pointer.y = y

		// TODO: Check state.activeElement.focusState.element?
		if (state.pointer.down && state.activeElement.focusState.handleBar) {
			const height = Math.max(0, state.pointer.y - 6 - 6 / 2 /* - offset */)
			state.activeElement.style.height = height
		}

		// if (state.pointer.down) {
		// 	// if (state.elements.length > 0) {
		// 	// // NOTE: Use state.elements.length > 1.
		// 	// let offset = 0
		// 	// if (state.elements.length > 1) {
		// 	// 	offset = state.elements.slice(0, -1).reduce((acc, each) => acc + each.style.height, 0)
		// 	// }
		// 	const height = Math.max(0, state.pointer.y - 6 - 6 / 2 /* - offset */)
		// 	state.activeElement.style.height = height
		// 	// }
		// }
	},

	handlePointerUp() {
		state.pointer.down = false
		// this.blurActiveElement()
	},

	focusActiveElement() {
		state.activeElement.focusState.element = true
		// state.activeElement.focusState.handleBar = false
	},
	blurActiveElement() {
		state.activeElement.focusState.element = false
		// state.activeElement.focusState.handleBar = false
	},
	focusActiveElementHandleBar() {
		// state.activeElement.focusState.element = false
		state.activeElement.focusState.handleBar = true
	},
	blurActiveElementHandleBar() {
		// state.activeElement.focusState.element = false
		state.activeElement.focusState.handleBar = false
	},

	keyDownDeleteActiveElement() {
		state.activeElement = null
	},
})

const initialState = {
	pointer: {
		down: false,
		x: 0,
		y: 0,
	},
	activeElement: null,
	// elements: [],
}

export default function useSorceryReducer() {
	return useMethods(methods, initialState)
}
