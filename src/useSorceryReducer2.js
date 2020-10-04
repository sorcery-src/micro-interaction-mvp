import quantize from "utils/quantize"
import useMethods from "use-methods"
import { v4 as uuidv4 } from "uuid"

const methods = state => ({
	// state.window
	resize({ width, height }) {
		state.window.width = width
		state.window.height = height
	},

	// state.pointer
	pointerMove({ x: rawX, y: rawY }) {
		state.pointer.x = Math.round(rawX)
		state.pointer.y = Math.round(rawY)
	},
	pointerDown() {
		state.pointer.down = true
	},
	pointerUp() {
		state.pointer.down = false
	},

	// state.keyboard (1 of 2)
	keyDownShiftKey() {
		state.keyboard.shiftKey = true
	},
	keyDownCtrlKey() {
		state.keyboard.ctrlKey = true
	},
	keyDownAltKey() {
		state.keyboard.altKey = true
	},
	keyDownMetaKey() {
		state.keyboard.metaKey = true
	},

	// state.keyboard (2 of 2)
	keyUpShiftKey() {
		state.keyboard.shiftKey = false
	},
	keyUpCtrlKey() {
		state.keyboard.ctrlKey = false
	},
	keyUpAltKey() {
		state.keyboard.altKey = false
	},
	keyUpMetaKey() {
		state.keyboard.metaKey = false
	},

	// ...
})

const initialState = {
	window: {
		width: 0,
		height: 0,
	},
	pointer: {
		down: false,
		x: 0,
		y: 0,
	},
	keyboard: {
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
	},
	// activeElement: null,
	// // elements: [],
}

export default function useSorceryReducer() {
	return useMethods(methods, initialState)
}
