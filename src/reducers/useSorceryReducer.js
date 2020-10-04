import newID from "utils/newID"
import quantize from "utils/quantize"
import useMethods from "use-methods"

const MIN_HEIGHT = 6

const offsetResize = 6 + 6 / 2
const snapToEdgeBoundary = 64

const methods = state => ({
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
			if (activeElement && activeElement.resize.bottom) {
				const offset = state.elements.slice(0, x).reduce((acc, each) => acc + each.style.height, 0)
				activeElement.style.height = Math.max(MIN_HEIGHT, transform(state.pointer.y - offset - offsetResize))
				state.showSnapToEdgeHighlight = state.layout.height - (activeElement.style.height + offset) < snapToEdgeBoundary
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
					height: Math.max(MIN_HEIGHT, state.pointer.y - offset - offsetResize),
				},
				resize: {
					top: false,
					right: false,
					bottom: true, // TODO
					left: false,
				},
				hasFocus: true,
			}
			state.elements.push(activeElement)
			state.showSnapToEdgeHighlight = state.layout.height - (activeElement.style.height + offset) < snapToEdgeBoundary
		}
	},
	pointerUp() {
		state.pointer.down = false

		if (state.showSnapToEdgeHighlight) {
			const activeElement = state.elements.find(each => each.key === state.activeElementKey)
			if (activeElement) {
				activeElement.style.height = state.layout.height // TODO: Use height: 100%.
			}
			state.showSnapToEdgeHighlight = false
		}
	},

	/*
	 * Key down and up
	 */
	keyDownBackspace() {
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
	keyUpShiftKey() {
		state.keyboard.shiftKey = false
	},

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
			for (const k in activeElement.resize) {
				activeElement.resize[k] = false
			}
		}
		// (Reverse order)
		state.activeElementKey = ""
	},

	focusActiveElementResizeByKey({ direction, key }) {
		const activeElement = state.elements.find(each => each.key === key)
		if (activeElement) {
			// activeElement.hasFocus = false
			activeElement.resize[direction] = true
		}
	},
	blurActiveElementResizeByKey({ key }) {
		const activeElement = state.elements.find(each => each.key === key)
		if (activeElement) {
			activeElement.hasFocus = false
			for (const k in activeElement.resize) {
				activeElement.resize[k] = false
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
	showSnapToEdgeHighlight: false,
}

export default function useSorceryReducer() {
	return useMethods(methods, initialState)
}
