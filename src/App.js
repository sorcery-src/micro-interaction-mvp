/* eslint-disable */

import * as React from "react"
import CSS from "./CSS" // FIXME
import css from "tpl"
import px from "px"
import useMethods from "use-methods"
import useSorceryReducer from "useSorceryReducer"
import { v4 as uuidv4 } from "uuid"

/****/

function newID(desc) {
	return (!desc ? "" : desc + "__") + uuidv4().slice(0, 6)
}

/****/

const debugID = newID()

function Debug({ debug }) {
	return (
		<>
			<CSS id={debugID}>
				{css`
					.debugAbsoluteContext__${debugID} {
						padding-top: ${px(12)};
						padding-right: ${px(12)};
						padding-bottom: ${px(12)};
						padding-left: ${px(12)};
						position: absolute;
						bottom: 0;
						left: 0;
						width: ${px(320)};
					}
					.debug__${debugID} {
						white-space: pre;
						font-family: monospace;
					}
				`}
			</CSS>

			<div className={`debugAbsoluteContext__${debugID}`}>
				<div className={`debug__${debugID}`}>{JSON.stringify(debug, null, 2)}</div>
			</div>
		</>
	)
}

const activeElementID = newID()
const handleBarDebugID = newID()
const handleBarID = newID()

export default function App() {
	const [state, actions] = useSorceryReducer()

	// Manages key down.
	React.useEffect(() => {
		const handler = e => {
			if (e.key === "Shift" || e.keyCode === 16 || e.shiftKey) {
				actions.keyDownShift()
			} else if (e.key === "Backspace" || e.keyCode === 8) {
				actions.keyDownDeleteActiveElement()
			}
		}
		document.addEventListener("keydown", handler)
		return () => {
			document.removeEventListener("keydown", handler)
		}
	}, [actions])

	// Manages key up.
	React.useEffect(() => {
		document.addEventListener("keyup", actions.keyUp)
		return () => {
			document.removeEventListener("keyup", actions.keyUp)
		}
	}, [actions])

	const dep = state.activeElement && state.activeElement.focusState.handleBar
	React.useEffect(
		React.useCallback(() => {
			const id = setTimeout(() => {
				const element = document.querySelector("[class^='handleBarFocusable']")
				if (element) {
					if (state.activeElement.focusState.handleBar) {
						element.focus()
					} else {
						element.blur()
					}
				}
			}, 0)
			return () => {
				clearTimeout(id)
			}
		}, [state]),
		[dep],
	)

	return (
		<div
			style={{ height: "100vh" }}
			onPointerDown={actions.handlePointerDown}
			onPointerMove={e => {
				actions.handlePointerMove({
					x: Math.round(e.clientX),
					y: Math.round(e.clientY),
				})
			}}
			onPointerUp={actions.handlePointerUp}
		>
			{state.activeElement && (
				<>
					<CSS id={activeElementID}>
						{css`
							.activeElement__${activeElementID}:focus {
								outline: none;
							}
							.activeElement__${activeElementID}[data-focus="false"] {
								background-color: hsl(${3.25 * 60}, 100%, 90%);
								transition-property: background-color;
								transition-duration: 100ms;
								transition-timing-function: ease-out;
							}
							.activeElement__${activeElementID}[data-focus="true"] {
								background-color: hsl(${3.25 * 60}, 100%, 75%);
								transition-property: background-color;
								transition-duration: 50ms;
								transition-timing-function: ease-out;
							}
						`}
					</CSS>

					<div
						className={`activeElement__${activeElementID}`}
						style={state.activeElement.style}
						onFocus={actions.focusActiveElement}
						onBlur={e => {
							if (!e.target.contains(e.relatedTarget)) {
								actions.blurActiveElement()
							}
						}}
						// onKeyDown={e => {
						// 	if (e.key === "Shift" || e.keyCode === 16) {
						// 		actions.keyDownShift()
						// 	} else if (e.key === "Alt" || e.keyCode === 18) {
						// 		actions.keyDownAlt()
						// 	} else if (e.key === "Backspace" || e.keyCode === 8) {
						// 		actions.keyDownDelete()
						// 	}
						// }}
						// onKeyUp={actions.keyUpActiveElement}
						data-focus={state.activeElement.focusState.element}
						tabIndex={0}
					>
						<div style={{ position: "relative", height: "100%" }}>
							{/**/}

							<CSS id={handleBarDebugID}>
								{css`
									.debugAbsoluteContext__${handleBarDebugID} {
										padding-top: ${px(8)};
										padding-right: ${px(8)};
										padding-bottom: ${px(8)};
										padding-left: ${px(8)};
										position: absolute;
										top: ${state.activeElement.style.height < 32 ? "100%" : "auto"};
										right: 0;
										/* NOTE: "0" must be a string (why?). */
										bottom: ${state.activeElement.style.height < 32 ? "auto" : "0"};
										user-select: none;
									}
									.debug__${handleBarDebugID} {
										white-space: pre;
										font-family: monospace;
									}
								`}
							</CSS>

							<div className={`debugAbsoluteContext__${handleBarDebugID}`}>
								<div className={`debug__${handleBarDebugID}`}>{state.activeElement.style.height}px</div>
							</div>

							{state.activeElement.focusState.element && (
								<>
									<CSS id={handleBarID}>
										{css`
											.handleBarAbsoluteContext__${handleBarID} {
												position: absolute;
												top: 100%;
												right: 0;
												left: 0;
												display: flex;
												justify-content: center;
												align-items: center;
											}
											.handleBarFocusable__${handleBarID} {
												padding-top: ${px(6)};
												padding-right: ${px(6)};
												padding-bottom: ${px(6)};
												padding-left: ${px(6)};
											}
											.handleBarFocusable__${handleBarID}:focus {
												outline: none;
											}
											.handleBar__${handleBarID} {
												width: ${px(72)};
												height: ${px(6)};
												border-radius: 9999px;
												background-color: hsl(${3.25 * 60}, 100%, 90%);
											}
											.handleBarFocusable__${handleBarID}[data-focus="true"] .handleBar__${handleBarID} {
												background-color: hsl(${3.25 * 60}, 100%, 80%);
											}
										`}
									</CSS>

									<div className={`handleBarAbsoluteContext__${handleBarID}`}>
										<div
											className={`handleBarFocusable__${handleBarID}`}
											onFocus={actions.focusActiveElementHandleBar}
											onBlur={actions.blurActiveElementHandleBar}
											data-focus={state.activeElement.focusState.handleBar}
											tabIndex={0}
										>
											<div className={`handleBar__${handleBarID}`} />
										</div>
									</div>
								</>
							)}

							{/**/}
						</div>
					</div>
				</>
			)}

			<Debug debug={state} />
		</div>
	)
}
