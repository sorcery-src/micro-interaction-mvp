/* eslint-disable */

import * as React from "react"

import AbsoluteGitHubCallout from "AbsoluteGitHubCallout"
import DebugState from "DebugState"
import Element from "Element"
import useSorceryReducer from "useSorceryReducer2"

export default function App() {
	const [state, dispatch] = useSorceryReducer()

	// state.window
	React.useEffect(() => {
		const handler = e => {
			const width = window.innerWidth
			const height = window.innerHeight
			dispatch.resize({
				width,
				height,
			})
		}
		handler() // Once
		window.addEventListener("resize", handler, false)
		return () => {
			window.removeEventListener("resize", handler, false)
		}
	}, [dispatch])

	// state.pointer
	React.useEffect(() => {
		const handlerPointerMove = e => {
			dispatch.pointerMove({
				x: e.clientX,
				y: e.clientY,
			})
		}
		window.addEventListener("pointermove", handlerPointerMove, false)
		window.addEventListener("pointerdown", dispatch.pointerDown, false)
		window.addEventListener("pointerup", dispatch.pointerUp, false)
		return () => {
			window.removeEventListener("pointermove", handlerPointerMove, false)
			window.removeEventListener("pointerdown", dispatch.pointerDown, false)
			window.removeEventListener("pointerup", dispatch.pointerUp, false)
		}
	}, [dispatch])

	// state.keyboard
	React.useEffect(() => {
		const keyDownHandler = e => {
			if (e.key === "Shift") {
				dispatch.keyDownShiftKey()
			} else if (e.key === "Control") {
				dispatch.keyDownCtrlKey()
			} else if (e.key === "Alt") {
				dispatch.keyDownAltKey()
			} else if (e.key === "Meta") {
				dispatch.keyDownMetaKey()
			}
		}
		const keyUpHandler = e => {
			if (e.key === "Shift") {
				dispatch.keyUpShiftKey()
			} else if (e.key === "Control") {
				dispatch.keyUpCtrlKey()
			} else if (e.key === "Alt") {
				dispatch.keyUpAltKey()
			} else if (e.key === "Meta") {
				dispatch.keyUpMetaKey()
			}
		}
		window.addEventListener("keydown", keyDownHandler)
		window.addEventListener("keyup", keyUpHandler)
		return () => {
			window.removeEventListener("keydown", keyDownHandler)
			window.removeEventListener("keyup", keyUpHandler)
		}
	}, [dispatch])

	// Focuses state.activeElementKey.
	React.useEffect(() => {
		if (state.activeElementKey) {
			const element = document.getElementById(state.activeElementKey)
			element.focus()
		}
	}, [state.activeElementKey])

	return (
		<>
			{/**/}

			<AbsoluteGitHubCallout />

			{state.elements.map(each => (
				<Element key={each.key} element={each} dispatch={dispatch} />
			))}

			<DebugState state={state} />

			{/**/}
		</>
	)
}

// 	<StyleOnce id={snapToEdgeID}>
// 		{css`
// 			.absolute__${snapToEdgeID} {
// 				position: absolute;
// 				right: 0;
// 				bottom: 0;
// 				left: 0;
// 			}
// 			.center__${snapToEdgeID} {
// 				display: flex;
// 				justify-content: center;
// 			}
// 			.snapToEdge__${snapToEdgeID} {
// 				width: 100%;
// 				height: ${px(4)};
// 				background-color: hsl(${3.25 * 60}, 100%, 75%);
// 			}
// 		`}
// 	</StyleOnce>
//
// 	<div className={`absolute__${snapToEdgeID}`}>
// 		<div className={`center__${snapToEdgeID}`}>
// 			<div className={`snapToEdge__${snapToEdgeID}`} />
// 		</div>
// 	</div>
