import createID from "utils/createID"
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

		if (state.pointer.down) {
			const element = state.elements.find(each => (each.reactKey = state.activeElementReactKey))
			if (element) {
				element.style.height = state.pointer.y
			}
		}
	},
	pointerDown() {
		state.pointer.down = true

		if (!state.elements.length) {
			const reactKey = createID()
			state.activeElementReactKey = reactKey
			state.elements.push({
				tag: "div",
				reactKey,
				id: null,
				className: null,
				style: {
					display: "block",
					width: "100%",
					height: state.pointer.y,
				},
				// focus: {
				// 	element: true,
				// 	top: false,
				// 	right: false,
				// 	bottom: true,
				// 	left: false,
				// },
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
	activeElementReactKey: "",
	elements: [],
}

export default function useSorceryReducer() {
	return useMethods(methods, initialState)
}
