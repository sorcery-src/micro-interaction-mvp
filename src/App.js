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
					.absolute__${debugID} {
						padding-top: ${px(12)};
						padding-right: ${px(12)};
						padding-bottom: ${px(12)};
						padding-left: ${px(12)};
						position: absolute;
						bottom: 0;
						left: 0;
						width: ${px(320)};
					}
					.pre__${debugID} {
						font-size: ${px(14)};
					}
				`}
			</CSS>

			<div className={`absolute__${debugID}`}>
				<pre className={`pre__${debugID}`}>{JSON.stringify(debug, null, 2)}</pre>
			</div>
		</>
	)
}

const screenID = newID()
const handleBarDebugID = newID()
const handleBarID = newID()

export default function App() {
	const [state, actions] = useSorceryReducer()

	return (
		<>
			{/**/}

			<CSS id={screenID}>
				{css`
					.screen__${screenID} {
						height: 100vh;
					}
				`}
			</CSS>

			<div
				className={`screen__${screenID}`}
				onPointerDown={e => {
					actions.handlePointerDown()
				}}
				onPointerMove={e => {
					actions.handlePointerMove({
						x: Math.round(e.clientX),
						y: Math.round(e.clientY),
					})
				}}
				onPointerUp={e => {
					actions.handlePointerUp()
				}}
			>
				{/**/}

				{state.activeElement && (
					<div
						key={state.activeElement.id}
						id={state.activeElement.id}
						style={{
							...state.activeElement.style,
							"--backgroundColor": state.activeElement.style.backgroundColor,
						}}
					>
						<div style={{ position: "relative", height: "100%" }}>
							{/**/}

							<CSS id={handleBarDebugID}>
								{css`
									.absolute-debug__${handleBarDebugID} {
										padding-top: ${px(8)};
										padding-right: ${px(8)};
										position: absolute;
										right: 0;
										bottom: 0;
										user-select: none;
									}
									.debug__${handleBarDebugID} {
										font-size: ${px(14)};
									}
								`}
							</CSS>

							<div className={`absolute-debug__${handleBarDebugID}`}>
								<pre className={`debug__${handleBarDebugID}`}>{state.activeElement.style.height}px</pre>
							</div>

							{state.activeElement.focused && (
								<>
									<CSS id={handleBarID}>
										{css`
											.absolute-handle-bar__${handleBarID} {
												padding-top: ${px(8)};
												position: absolute;
												top: 100%;
												right: 0;
												left: 0;
												display: flex;
												justify-content: center;
												align-items: center;
											}
											.handle-bar__${handleBarID} {
												width: ${px(72)};
												height: ${px(8)};
												/* background-color: var(--backgroundColor); */
												border-radius: 9999px;
											}
											.handle-bar__${handleBarID} {
												background-color: var(--backgroundColor);
												transform: scale(1);
												transition-property: transform, background-color;
												transition-duration: 100ms;
												transition-timing-function: ease-out;
											}
											.handle-bar__${handleBarID}:hover {
												background-color: var(--backgroundColor);
												transform: scale(1.1);
												transition-property: transform, background-color;
												transition-duration: 100ms;
												transition-timing-function: ease-out;
											}
										`}
									</CSS>

									<div className={`absolute-handle-bar__${handleBarID}`}>
										<div className={`handle-bar__${handleBarID}`} />
									</div>
								</>
							)}

							{/**/}
						</div>
					</div>
				)}

				<Debug debug={state} />
			</div>

			{/**/}
		</>
	)
}
