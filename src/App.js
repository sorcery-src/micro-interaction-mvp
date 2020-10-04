/* eslint-disable */

import * as React from "react"

import AbsoluteGitHubCallout from "AbsoluteGitHubCallout"
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

const activeElementID = createID()
const handleBarID = createID()
const snapToEdgeID = createID()

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

	return (
		<>
			{/**/}

			<AbsoluteGitHubCallout />

			<>Hello, world!</>

			<DebugState state={state} />

			{/**/}
		</>
	)

	// return (
	// 	<>
	// 		{/**/}
	//
	// 		<AbsoluteGitHubCallout />
	//
	// 		<div
	// 			style={{ height: "100vh" }}
	// 			onPointerDown={dispatch.handlePointerDown}
	// 			onPointerMove={e => {
	// 				dispatch.handlePointerMove({
	// 					x: Math.round(e.clientX),
	// 					y: Math.round(e.clientY),
	// 				})
	// 			}}
	// 			onPointerUp={dispatch.handlePointerUp}
	// 		>
	// 			{state.activeElement && (
	// 				<>
	// 					{/**/}
	//
	// 					{/* activeElement */}
	// 					<StyleOnce id={activeElementID}>
	// 						{css`
	// 							.activeElement__${activeElementID}:focus {
	// 								outline: none;
	// 							}
	// 							.activeElement__${activeElementID}[data-focus="false"] {
	// 								background-color: hsl(${3.25 * 60}, 100%, 90%);
	// 								transition-property: background-color;
	// 								transition-duration: 100ms;
	// 								transition-timing-function: ease-out;
	// 							}
	// 							.activeElement__${activeElementID}[data-focus="true"] {
	// 								background-color: hsl(${3.25 * 60}, 100%, 75%);
	// 								transition-property: background-color;
	// 								transition-duration: 50ms;
	// 								transition-timing-function: ease-out;
	// 							}
	// 						`}
	// 					</StyleOnce>
	//
	// 					<div
	// 						className={`activeElement__${activeElementID}`}
	// 						style={state.activeElement.style}
	// 						onFocus={dispatch.focusActiveElement}
	// 						onBlur={e => {
	// 							if (!e.target.contains(e.relatedTarget)) {
	// 								dispatch.blurActiveElement()
	// 							}
	// 						}}
	// 						data-focus={state.activeElement.focusState.element}
	// 						tabIndex={0}
	// 					>
	// 						<div style={{ position: "relative", height: "100%" }}>
	// 							{/**/}
	//
	// 							{/* debugActiveElement */}
	// 							<DebugActiveElement activeElement={state.activeElement} />
	//
	// 							{/* activeElement */}
	// 							{state.activeElement.focusState.element && (
	// 								<>
	// 									<StyleOnce id={handleBarID}>
	// 										{css`
	// 											.absolute__${handleBarID} {
	// 												position: absolute;
	// 												top: 100%;
	// 												right: 0;
	// 												left: 0;
	// 												display: flex;
	// 												justify-content: center;
	// 												align-items: center;
	// 											}
	// 											.handleBarHitArea__${handleBarID} {
	// 												padding-top: ${px(6)};
	// 												padding-right: ${px(6)};
	// 												padding-bottom: ${px(6)};
	// 												padding-left: ${px(6)};
	// 											}
	// 											.handleBarHitArea__${handleBarID}:focus {
	// 												outline: none;
	// 											}
	// 											.handleBar__${handleBarID} {
	// 												width: ${px(72)};
	// 												height: ${px(6)};
	// 												border-radius: 9999px;
	// 												background-color: hsl(${3.25 * 60}, 100%, 90%);
	// 											}
	// 											.handleBarHitArea__${handleBarID}[data-focus="true"] .handleBar__${handleBarID} {
	// 												background-color: hsl(${3.25 * 60}, 100%, 75%);
	// 											}
	// 										`}
	// 									</StyleOnce>
	//
	// 									<div className={`absolute__${handleBarID}`}>
	// 										<div
	// 											className={`handleBarHitArea__${handleBarID}`}
	// 											onFocus={dispatch.focusActiveElementHandleBar}
	// 											onBlur={dispatch.blurActiveElementHandleBar}
	// 											data-focus={state.activeElement.focusState.handleBar}
	// 											tabIndex={0}
	// 										>
	// 											<div className={`handleBar__${handleBarID}`} />
	// 										</div>
	// 									</div>
	// 								</>
	// 							)}
	//
	// 							{/**/}
	// 						</div>
	// 					</div>
	//
	// 					{/* snapToEdge */}
	// 					{state.activeElement.snapToEdgeState.bottom && (
	// 						<>
	// 							{/**/}
	//
	// 							<StyleOnce id={snapToEdgeID}>
	// 								{css`
	// 									.absolute__${snapToEdgeID} {
	// 										position: absolute;
	// 										right: 0;
	// 										bottom: 0;
	// 										left: 0;
	// 									}
	// 									.center__${snapToEdgeID} {
	// 										display: flex;
	// 										justify-content: center;
	// 									}
	// 									.snapToEdge__${snapToEdgeID} {
	// 										width: 100%;
	// 										height: ${px(4)};
	// 										background-color: hsl(${3.25 * 60}, 100%, 75%);
	// 									}
	// 								`}
	// 							</StyleOnce>
	//
	// 							<div className={`absolute__${snapToEdgeID}`}>
	// 								<div className={`center__${snapToEdgeID}`}>
	// 									<div className={`snapToEdge__${snapToEdgeID}`} />
	// 								</div>
	// 							</div>
	//
	// 							{/**/}
	// 						</>
	// 					)}
	//
	// 					{/**/}
	// 				</>
	// 			)}
	// 		</div>
	//
	// 		<DebugState state={state} />
	//
	// 		{/**/}
	// 	</>
	// )
}
