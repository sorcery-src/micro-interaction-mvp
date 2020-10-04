import quantize from "utils/quantize"
import useMethods from "use-methods"
import { v4 as uuid } from "uuid"

const ELEMENT_MIN_HEIGHT = 6
const RESIZE_OFFSET = 6 + 6 / 2
const SNAP_TO_EDGE_SIZE = 64

// Creates a new 6-character ID (UUID).
//
// Ex:
//
// newID() // abc123
//
function newID() {
	return uuid().slice(0, 6)
}

const methods = state => ({
	/*
	 * Layout
	 */
	updateLayout({ width, height }) {
		state.layout.width = width
		state.layout.height = height
	},

	/*
	 * Pointer
	 */
	pointerMove({ x, y }) {
		state.pointer.x = Math.round(x)
		state.pointer.y = Math.round(y)

		const transform = !state.keyboard.shiftKey ? n => n : quantize
		if (state.pointer.down && state.activeElementKey) {
			const x = state.elements.findIndex(each => each.key === state.activeElementKey)
			const activeElement = state.elements[x]
			if (activeElement && activeElement.focusState.resizeBottom) {
				const offset = state.elements.slice(0, x).reduce((acc, each) => acc + each.style.height, 0)
				activeElement.style.height = Math.max(ELEMENT_MIN_HEIGHT, transform(state.pointer.y - offset - RESIZE_OFFSET))
				state.showSnapToEdge = state.layout.height - (activeElement.style.height + offset) < SNAP_TO_EDGE_SIZE
			}
		}
	},
	pointerDown() {
		state.pointer.down = true

		const sum = state.elements.reduce((acc, each) => acc + each.style.height, 0)
		if (state.pointer.y <= sum) {
			// No-op
			return
		}

		if (!state.activeElementKey) {
			const offset = state.elements.reduce((acc, each) => acc + each.style.height, 0)
			state.activeElementKey = newID()
			const activeElement = {
				tag: "div",
				key: state.activeElementKey,
				id: null,
				className: null,
				style: {
					display: "block",
					width: "100%",
					height: Math.max(ELEMENT_MIN_HEIGHT, state.pointer.y - offset - RESIZE_OFFSET),
				},
				hasFocus: true,
				focusState: {
					resizeTop: false,
					resizeRight: false,
					resizeBottom: true, // TODO
					resizeLeft: false,
				},
			}
			state.elements.push(activeElement)
			state.showSnapToEdge = state.layout.height - (activeElement.style.height + offset) < SNAP_TO_EDGE_SIZE
		}
	},
	pointerUp() {
		state.pointer.down = false

		if (state.showSnapToEdge) {
			const activeElement = state.elements.find(each => each.key === state.activeElementKey)
			if (activeElement) {
				activeElement.style.height = state.layout.height // TODO: Use height: 100%.
			}
			state.showSnapToEdge = false
		}
	},

	/*
	 * Key down
	 */
	keyDownBackspace() {
		// NOTE: No such state.keyboard.backspace.
		if (state.activeElementKey) {
			const x = state.elements.findIndex(each => each.key === state.activeElementKey)
			if (x >= 0) {
				state.elements.splice(x, 1)
				state.activeElementKey = null
			}
		}
	},

	keyDownShiftKey() {
		state.keyboard.shiftKey = true
	},
	// keyDownCtrlKey() {
	// 	state.keyboard.ctrlKey = true
	// },
	// keyDownAltKey() {
	// 	state.keyboard.altKey = true
	// },
	// keyDownMetaKey() {
	// 	state.keyboard.metaKey = true
	// },

	/*
	 * Key up
	 */
	keyUpShiftKey() {
		state.keyboard.shiftKey = false
	},
	// keyUpCtrlKey() {
	// 	state.keyboard.ctrlKey = false
	// },
	// keyUpAltKey() {
	// 	state.keyboard.altKey = false
	// },
	// keyUpMetaKey() {
	// 	state.keyboard.metaKey = false
	// },

	/*
	 * Focus
	 */
	focusActiveElementByKey(key) {
		state.activeElementKey = key
		const activeElement = state.elements.find(each => each.key === state.activeElementKey)
		if (activeElement) {
			activeElement.hasFocus = true
		}
	},
	blurActiveElementByKey(key) {
		const activeElement = state.elements.find(each => each.key === key)
		if (activeElement) {
			activeElement.hasFocus = false
			for (const k in activeElement.focusState) {
				activeElement.focusState[k] = false
			}
		}
		// (Reverse order)
		state.activeElementKey = ""
	},

	focusActiveElementResizeByKey({ direction, key }) {
		const activeElement = state.elements.find(each => each.key === key)
		if (activeElement) {
			// activeElement.hasFocus = false
			const titleCase = direction[0].toUpperCase() + direction.slice(1)
			activeElement.focusState["resize" + titleCase] = true
		}
	},
	blurActiveElementResizeByKey({ key }) {
		const activeElement = state.elements.find(each => each.key === key)
		if (activeElement) {
			activeElement.hasFocus = false
			for (const k in activeElement.focusState) {
				activeElement.focusState[k] = false
			}
		}
	},
})

const initialState = {
	layout: {
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
	activeElementKey: "",
	elements: [],
	showSnapToEdge: false,
}

export default function useSorceryReducer() {
	return useMethods(methods, initialState)
}
