/* eslint-disable */

import * as React from "react"

import AbsoluteGitHubCallout from "AbsoluteGitHubCallout"
import DebugState from "DebugState"
import Element from "Element"
import StyleOnce from "lib/CSS/StyleOnce"
import createID from "utils/createID"
import css from "lib/x/tpl"
import px from "lib/CSS/px"
import useSorceryReducer from "useSorceryReducer2"

const appAreaID = createID()
const snapToEdgeID = createID()

export default function App() {
	const [state, dispatch] = useSorceryReducer()

	React.useEffect(() => {
		const handler = e => {
			const width = window.innerWidth
			const height = window.innerHeight
			dispatch.updateLayout({
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

	// Focuses state.activeElementKey.
	React.useLayoutEffect(() => {
		if (!state.activeElementKey) {
			// No-op
			return
		}
		const id = window.requestAnimationFrame(() => {
			const element = document.getElementById(state.activeElementKey)
			element.focus()
		})
		return () => {
			window.cancelAnimationFrame(id)
		}
	}, [state.activeElementKey])

	return (
		<>
			{/**/}

			<AbsoluteGitHubCallout />

			<StyleOnce id={appAreaID}>
				{css`
					.appAreaTabIndex__${appAreaID} {
						min-height: 100vh;
					}
					.appAreaTabIndex__${appAreaID}:focus {
						outline: none;
					}
				`}
			</StyleOnce>

			<div
				className={`appAreaTabIndex__${appAreaID}`}
				onPointerMove={e => {
					dispatch.pointerMove({
						x: e.clientX,
						y: e.clientY,
					})
				}}
				onPointerDown={dispatch.pointerDown}
				onPointerUp={dispatch.pointerUp}
				onKeyDown={e => {
					if (e.key === "Backspace") {
						dispatch.keyDownBackspace()
						return
					}

					if (e.key === "Shift") {
						dispatch.keyDownShiftKey()
					} // else if (e.key === "Control") {
					// 	dispatch.keyDownCtrlKey()
					// } else if (e.key === "Alt") {
					// 	dispatch.keyDownAltKey()
					// } else if (e.key === "Meta") {
					// 	dispatch.keyDownMetaKey()
					// }
				}}
				onKeyUp={e => {
					if (e.key === "Shift") {
						dispatch.keyUpShiftKey()
					} // else if (e.key === "Control") {
					// 	dispatch.keyUpCtrlKey()
					// } else if (e.key === "Alt") {
					// 	dispatch.keyUpAltKey()
					// } else if (e.key === "Meta") {
					// 	dispatch.keyUpMetaKey()
					// }
				}}
				tabIndex={0}
			>
				{state.elements.map(each => (
					<Element key={each.key} element={each} dispatch={dispatch} />
				))}
			</div>

			{state.showSnapToEdge && (
				<>
					{/**/}

					<StyleOnce id={snapToEdgeID}>
						{css`
							.absolute__${snapToEdgeID} {
								position: absolute;
								right: 0;
								bottom: 0;
								left: 0;
							}
							.center__${snapToEdgeID} {
								display: flex;
								justify-content: center;
							}
							.snapToEdge__${snapToEdgeID} {
								width: 100%;
								height: ${px(4)};
								background-color: hsl(${3.25 * 60}, 100%, 75%);
							}
						`}
					</StyleOnce>

					<div className={`absolute__${snapToEdgeID}`}>
						<div className={`center__${snapToEdgeID}`}>
							<div className={`snapToEdge__${snapToEdgeID}`} />
						</div>
					</div>

					{/**/}
				</>
			)}

			<DebugState state={state} />

			{/**/}
		</>
	)
}
