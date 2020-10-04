import createID from "utils/createID"
import quantize from "utils/quantize"
import useMethods from "use-methods"

// hints: {
// 	top: false,
// 	right: false,
// 	bottom: false,
// 	left: false,
// },

const methods = state => ({
	resize({ width, height }) {
		state.window.width = width
		state.window.height = height
	},

	pointerMove({ x, y }) {
		state.pointer.x = Math.round(x)
		state.pointer.y = Math.round(y)

		const transform = !state.keyboard.shiftKey ? n => n : quantize
		if (state.pointer.down && state.activeElementKey) {
			const activeElement = state.elements.find(each => each.key === state.activeElementKey)
			// TODO: Deprecate activeElement.hasFocus?
			if (activeElement && activeElement.hasFocus && activeElement.focusState.resizeBottom) {
				// TODO
				activeElement.style.height = transform(state.pointer.y)
			}
		}

		// if (state.pointer.down) {
		// 	const element = state.elements.find(each => (each.key = state.activeElementKey))
		// 	if (element) {
		// 		element.style.height = state.pointer.y
		// 	}
		// }
	},
	pointerDown() {
		state.pointer.down = true

		if (!state.elements.length) {
			const key = createID()
			state.activeElementKey = key
			state.elements.push({
				tag: "div",
				key,
				id: null,
				className: null,
				style: {
					display: "block",
					width: "100%",
					height: state.pointer.y,
				},
				hasFocus: true,
				focusState: {
					resizeTop: false,
					resizeRight: false,
					resizeBottom: true, // TODO
					resizeLeft: false,
				},
			})
		}
	},
	pointerUp() {
		state.pointer.down = false
	},

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
	activeElementKey: "",
	elements: [],
}

export default function useSorceryReducer() {
	return useMethods(methods, initialState)
}
