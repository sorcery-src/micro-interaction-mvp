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
const handleID = newID()

export default function App() {
	const [state, actions] = useMethods(
		state => ({
			handlePointerDown() {
				state.pointer.down = true

				let offset = 0
				if (state.elements.length > 0) {
					offset = state.elements.reduce((acc, each) => acc + each.style.height, 0)
				}

				state.elements.push({
					id: uuidv4(),
					style: {
						display: "block",
						width: "100%",
						maxWidth: "100%",
						height: state.pointer.y - 8 - 8 / 2 - offset,
						// backgroundColor: `hsl(${3.25 * 60}, 100%, 90%)`,
						backgroundColor: `hsl(${Math.floor(Math.random() * 360)}, 100%, 90%)`,
					},
				})
			},
			handlePointerMove({ x, y }) {
				state.pointer.x = x
				state.pointer.y = y
				if (state.pointer.down) {
					if (state.elements.length > 0) {
						// NOTE: Use state.elements.length > 1.
						let offset = 0
						if (state.elements.length > 1) {
							offset = state.elements.slice(0, -1).reduce((acc, each) => acc + each.style.height, 0)
						}
						state.elements[state.elements.length - 1].style.height = state.pointer.y - 8 - 8 / 2 - offset
					}
				}
			},
			handlePointerUp() {
				state.pointer.down = false
			},
		}),
		{
			pointer: {
				down: false,
				x: 0,
				y: 0,
			},
			// activeElementIndex: -1,
			elements: [],
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

				{state.elements.map(each => (
					<div id={each.id} style={each.style}>
						{/**/}

						<CSS id={handleID}>
							{css`
								.relative__${handleID} {
									position: relative;
									height: 100%;
								}
								.absolute__${handleID} {
									padding: ${px(8)};
									position: absolute;
									top: 100%;
									right: 0;
									left: 0;
									display: flex;
									justify-content: center;
									align-items: center;
								}
								.handle__${handleID} {
									width: ${px(72)};
									height: ${px(8)};
									background-color: hsl(${3.25 * 60}, 100%, 90%);
									border-radius: 9999px;
									transform: scale(1);
									transition-property: transform, background-color;
									transition-duration: 100ms;
									transition-timing-function: ease-out;
								}
								.handle__${handleID}:hover {
									background-color: hsl(${3.25 * 60}, 100%, 75%);
									transform: scale(1.1);
									transition-property: transform, background-color;
									transition-duration: 100ms;
									transition-timing-function: ease-out;
								}
							`}
						</CSS>

						{/* {state.activeElement.focused && ( */}
						<div className={`relative__${handleID}`}>
							<div className={`absolute__${handleID}`}>
								<div className={`handle__${handleID}`} />
							</div>
						</div>

						{/**/}
					</div>
				))}

				<Debug debug={state} />
			</div>

			{/**/}
		</>
	)
}
