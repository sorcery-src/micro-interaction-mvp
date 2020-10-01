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
					.debug-absolute__${debugID} {
						padding-top: ${px(12)};
						padding-right: ${px(12)};
						padding-bottom: ${px(12)};
						padding-left: ${px(12)};
						position: absolute;
						bottom: 0;
						left: 0;
						width: ${px(320)};
					}
					.debug-absolute-pre__${debugID} {
						font-size: ${px(14)};
					}
				`}
			</CSS>

			<div className={`debug-absolute__${debugID}`}>
				<pre className={`debug-absolute-pre__${debugID}`}>{JSON.stringify(debug, null, 2)}</pre>
			</div>
		</>
	)
}

const screenID = newID()
const rectID = newID()

export default function App() {
	const [state, methods] = useMethods(
		state => ({
			setPointerDown(down) {
				state.pointer.down = down
			},
			setPointerXY({ x, y }) {
				state.pointer.x = x
				state.pointer.y = y
			},
		}),
		{
			pointer: {
				down: false,
				x: 0,
				y: 0,
			},
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
					methods.setPointerDown(true)
				}}
				onPointerMove={e => {
					methods.setPointerXY({
						x: Math.round(e.clientX),
						y: Math.round(e.clientY),
					})
				}}
				onPointerUp={e => {
					methods.setPointerDown(false)
				}}
			>
				{/**/}

				{state.pointer.down && (
					<>
						<CSS id={rectID}>
							{css`
								.rect__${rectID} {
									position: relative;
									height: ${!state.pointer.down ? "auto" : `calc(${px(state.pointer.y)} - ${px(8)} - ${px(8 / 2)})`};
									background-color: hsl(${3.25 * 60}, 100%, 90%);
								}
								.rect-absolute__${rectID} {
									padding: ${px(8)};
									position: absolute;
									top: 100%;
									right: 0;
									left: 0;
									display: flex;
									justify-content: center;
									align-items: center;
								}
								.rect-absolute-handle__${rectID} {
									width: ${px(72)};
									height: ${px(8)};
									background-color: hsl(${3.25 * 60}, 100%, 90%);
									border-radius: 9999px;
									transform: scale(1);
									transition-property: transform, background-color;
									transition-duration: 100ms;
									transition-timing-function: ease-out;
								}
								.rect-absolute-handle__${rectID}:hover {
									background-color: hsl(${3.25 * 60}, 100%, 75%);
									transform: scale(1.1);
									transition-property: transform, background-color;
									transition-duration: 100ms;
									transition-timing-function: ease-out;
								}
							`}
						</CSS>

						<div className={`rect__${rectID}`}>
							<div className={`rect-absolute__${rectID}`}>
								<div className={`rect-absolute-handle__${rectID}`} />
							</div>
						</div>
					</>
				)}

				<Debug debug={state} />

				{/**/}
			</div>

			{/**/}
		</>
	)
}
