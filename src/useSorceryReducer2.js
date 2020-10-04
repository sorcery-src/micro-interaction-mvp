import createID from "utils/createID"
import quantize from "utils/quantize"
import useMethods from "use-methods"

// hints: {
// 	top: false,
// 	right: false,
// 	bottom: false,
// 	left: false,
// },

const ELEMENT_MIN_HEIGHT = 6
const RESIZE_OFFSET = 6 + 6 / 2

const methods = state => ({
	pointerMove({ x, y }) {
		state.pointer.x = Math.round(x)
		state.pointer.y = Math.round(y)

		// let offset = state.elements.reduce((acc, each) => acc + each.style.height, 0)
		// 	offset += activeElement.style.height

		const transform = !state.keyboard.shiftKey ? n => n : quantize
		if (state.pointer.down && state.activeElementKey) {
			const x = state.elements.findIndex(each => each.key === state.activeElementKey)
			const activeElement = state.elements[x]
			// TODO: Too many guards?
			if (activeElement && activeElement.hasFocus && activeElement.focusState.resizeBottom) {
				const offset = state.elements.slice(0, x).reduce((acc, each) => acc + each.style.height, 0)
				activeElement.style.height = Math.max(ELEMENT_MIN_HEIGHT, transform(state.pointer.y - offset - RESIZE_OFFSET))
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

		const sum = state.elements.reduce((acc, each) => acc + each.style.height, 0)
		if (state.pointer.y <= sum) {
			// No-op
			return
		}

		if (!state.activeElementKey) {
			state.activeElementKey = createID()
			const offset = state.elements.reduce((acc, each) => acc + each.style.height, 0)
			state.elements.push({
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
