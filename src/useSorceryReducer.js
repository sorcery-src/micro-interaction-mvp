import useMethods from "use-methods"
import { v4 as uuidv4 } from "uuid"

// function quantize(number) {
// 	return Math.floor(number / 2)
// }

const methods = state => ({
	handlePointerDown() {
		state.pointer.active = true

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

		function quantize(n) {
			// return Math.max(0, Math.floor(number / 16) * 16)
			if (n > 2 && n < 4) {
				return 2
			} else if (n > 4 && n < 8) {
				return 4
			} else if (n > 8 && n < 16) {
				return 8
			} else if (n > 16 && n < 32) {
				return 16
			} else if (n > 32 && n < 64) {
				return 32
			} else if (n > 64 && n < 128) {
				return 64
			} else if (n > 128 && n < 256) {
				return 128
			} else if (n > 256 && n < 512) {
				return 256
			} else if (n > 512 && n < 1024) {
				return 512
			} else if (n > 1024 && n < 2048) {
				return 1024
			}
			return n
		}

		// TODO: Check state.activeElement.focusState.element?
		if (state.pointer.active && state.activeElement.focusState.handleBar) {
			const height = Math.max(0, state.pointer.y - 6 - 6 / 2 /* - offset */)

			const fn = !state.keys.shift ? n => n : quantize
			state.activeElement.style.height = fn(height)
		}

		// if (state.pointer.active) {
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
		state.pointer.active = false
		// this.blurActiveElement()
	},

	focusActiveElement() {
		state.activeElement.focusState.element = true
	},
	blurActiveElement() {
		state.activeElement.focusState.element = false
	},
	focusActiveElementHandleBar() {
		state.activeElement.focusState.handleBar = true
	},
	blurActiveElementHandleBar() {
		state.activeElement.focusState.handleBar = false
	},

	keyDownShiftActiveElement() {
		state.keys.shift = true
	},
	keyDownAltActiveElement() {
		state.keys.alt = true
	},
	keyUpActiveElement() {
		state.keys.shift = false
		state.keys.alt = false
	},

	keyDownDeleteActiveElement() {
		state.activeElement = null
	},
})

const initialState = {
	pointer: {
		active: false,
		x: 0,
		y: 0,
	},
	keys: {
		shift: false,
		alt: false,
	},
	activeElement: null,
	// elements: [],
}

export default function useSorceryReducer() {
	return useMethods(methods, initialState)
}
