/* eslint-disable */

import * as React from "react"

import AbsoluteGitHubCallout from "components/AbsoluteGitHubCallout"
import DebugState from "components/DebugState"
import Element from "components/Element"
import SnapToEdgeHighlight from "components/SnapToEdgeHighlight"
import styles from "./App.module.css"
import useSorceryReducer from "reducers/useSorceryReducer"

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
			const element = document.querySelector(`[data-key="${state.activeElementKey}"]`)
			element.focus()
		})
		return () => {
			window.cancelAnimationFrame(id)
		}
	}, [state.activeElementKey])

	return (
		<>
			<AbsoluteGitHubCallout />

			<div
				className={styles.appTabIndex}
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
					}
				}}
				onKeyUp={e => {
					if (e.key === "Shift") {
						dispatch.keyUpShiftKey()
					}
				}}
				tabIndex={0}
			>
				{state.elements.map(each => (
					<Element key={each.key} element={each} dispatch={dispatch} />
				))}
			</div>

			{state.showSnapToEdge && <SnapToEdgeHighlight />}

			<DebugState state={state} />
		</>
	)
}
