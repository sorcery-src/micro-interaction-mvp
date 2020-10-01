/* eslint-disable */

import * as React from "react"
import CSS from "./CSS" // FIXME
import css from "tpl"
import px from "px"
import useMethods from "use-methods"
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
const handleBarID = newID()

export default function App() {
	const [state, actions] = useMethods(
		state => ({
			handlePointerDown() {
				state.pointer.down = true
				state.activeElement = {
					id: uuidv4(),
					style: {
						display: "block",
						width: "100%",
						maxWidth: "100%",
						height: state.pointer.y - 8 - 8 / 2,
						backgroundColor: `hsl(${3.25 * 60}, 100%, 90%)`,
					},
				}
			},
			handlePointerMove({ x, y }) {
				state.pointer.x = x
				state.pointer.y = y

				if (state.pointer.down) {
					state.activeElement.style.height = state.pointer.y - 8 - 8 / 2
				}
			},
			handlePointerUp() {
				state.pointer.down = false

				// state.activeElement = null
			},
		}),
		{
			pointer: {
				down: false,
				x: 0,
				y: 0,
			},
			activeElement: null,
		},
	)

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
					<div id={state.activeElement.id} style={state.activeElement.style}>
						{/**/}

						<CSS id={handleBarID}>
							{css`
								.relative__${handleBarID} {
									position: relative;
									height: 100%;
								}
								.absolute__${handleBarID} {
									padding: ${px(8)};
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
									background-color: hsl(${3.25 * 60}, 100%, 90%);
									border-radius: 9999px;
									transform: scale(1);
									transition-property: transform, background-color;
									transition-duration: 100ms;
									transition-timing-function: ease-out;
								}
								.handle-bar__${handleBarID}:hover {
									background-color: hsl(${3.25 * 60}, 100%, 75%);
									transform: scale(1.1);
									transition-property: transform, background-color;
									transition-duration: 100ms;
									transition-timing-function: ease-out;
								}
							`}
						</CSS>

						<div className={`relative__${handleBarID}`}>
							<div className={`absolute__${handleBarID}`}>
								<div className={`handle-bar__${handleBarID}`} />
							</div>
						</div>

						{/**/}
					</div>
				)}

				<Debug debug={state} />

				{/**/}
			</div>

			{/**/}
		</>
	)
}
