/* eslint-disable */

import * as React from "react"

import AbsoluteGitHubCallout from "AbsoluteGitHubCallout"
import DebugElement from "DebugElement"
import DebugState from "DebugState"
import StyleOnce from "lib/CSS/StyleOnce"
import createID from "utils/createID"
import css from "lib/x/tpl"
import px from "lib/CSS/px"
import useSorceryReducer from "useSorceryReducer2"

// // Manages key down.
// React.useEffect(() => {
// 	const handler = e => {
// 		if (e.key === "Shift" || e.keyCode === 16 || e.shiftKey) {
// 			dispatch.keyDownShift()
// 		} else if (e.key === "Backspace" || e.keyCode === 8) {
// 			dispatch.keyDownDeleteActiveElement()
// 		}
// 	}
// 	document.addEventListener("keydown", handler)
// 	return () => {
// 		document.removeEventListener("keydown", handler)
// 	}
// }, [dispatch])

// // Manages key up.
// React.useEffect(() => {
// 	document.addEventListener("keyup", dispatch.keyUp)
// 	return () => {
// 		document.removeEventListener("keyup", dispatch.keyUp)
// 	}
// }, [dispatch])

// const dep = state.activeElement && state.activeElement.focusState.handleBar
// React.useEffect(
// 	React.useCallback(() => {
// 		const id = setTimeout(() => {
// 			const element = document.querySelector("[class^='handleBarHitArea']")
// 			if (element) {
// 				if (state.activeElement.focusState.handleBar) {
// 					element.focus()
// 				} else {
// 					element.blur()
// 				}
// 			}
// 		}, 0)
// 		return () => {
// 			clearTimeout(id)
// 		}
// 	}, [state]),
// 	[dep],
// )

const elementID = createID()
const resizeElementID = createID()

function Element({ element, dispatch }) {
	return (
		<>
			{/**/}

			<StyleOnce id={elementID}>
				{css`
					[data-element="${elementID}"] {
						background-color: hsl(${3.25 * 60}, 100%, 90%);
					}
					[data-element="${elementID}"]:focus {
						outline: none;
					}
					[data-element="${elementID}"][data-has-focus="true"] {
						background-color: hsl(${3.25 * 60}, 100%, 75%);
					}
				`}
			</StyleOnce>

			{/* TODO: element.tag */}
			<div
				id={element.key} // TODO?
				style={element.style}
				onFocus={() => dispatch.focusActiveElementByKey(element.key)}
				// onBlur={() => dispatch.blurActiveElementByKey(element.key)} // TODO
				onBlur={e => {
					if (!e.target.contains(e.relatedTarget)) {
						dispatch.blurActiveElementByKey(element.key)
					}
				}}
				tabIndex={0}
				data-element={elementID}
				data-has-focus={element.hasFocus}
			>
				<div style={{ position: "relative", height: "100%" }}>
					{/**/}

					{element.hasFocus && (
						<>
							<StyleOnce id={resizeElementID}>
								{css`
									.absolute__${resizeElementID} {
										position: absolute;
										top: 100%;
										right: 0;
										left: 0;
										display: flex;
										justify-content: center;
										align-items: center;
									}
									.resizerTabIndex__${resizeElementID} {
										padding-top: ${px(6)};
										padding-right: ${px(6)};
										padding-bottom: ${px(6)};
										padding-left: ${px(6)};
									}
									.resizerTabIndex__${resizeElementID}:focus {
										outline: none;
									}
									.resizer__${resizeElementID} {
										width: ${px(72)};
										height: ${px(6)};
										border-radius: 9999px;
										background-color: hsl(${3.25 * 60}, 100%, 90%);
									}
									.resizerTabIndex__${resizeElementID}[data-has-focus="true"] .resizer__${resizeElementID} {
										background-color: hsl(${3.25 * 60}, 100%, 75%);
									}
								`}
							</StyleOnce>

							<div className={`absolute__${resizeElementID}`}>
								<div
									className={`resizerTabIndex__${resizeElementID}`}
									onFocus={() => dispatch.focusActiveElementResizeByKey({ direction: "bottom", key: element.key })}
									onBlur={() => dispatch.blurActiveElementResizeByKey({ key: element.key })}
									tabIndex={0}
									data-has-focus={element.focusState.resizeBottom}
								>
									<div className={`resizer__${resizeElementID}`} />
								</div>
							</div>
						</>
					)}

					<DebugElement element={element} />

					{/**/}
				</div>
			</div>

			{/**/}
		</>
	)
}

// -------------------------

// const handleBarID = createID()
// const snapToEdgeID = createID()

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
