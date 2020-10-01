/* eslint-disable */

import * as React from "react"
import css from "tpl"
import Style from "Style"
// import useOnceID from "useOnceID"
import { v4 as uuidv4 } from "uuid"

/****/

function px(n) {
	const rem = n / 16
	return rem + "rem"
}

function newID(desc) {
	return (!desc ? "" : desc + "__") + uuidv4().slice(0, 6)
}

/****/

const debugID = newID()

function Debug({ debug }) {
	return (
		<>
			<Style id={debugID}>
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
			</Style>

			<div className={`debug-absolute__${debugID}`}>
				<pre className={`debug-absolute-pre__${debugID}`}>{JSON.stringify(debug, null, 2)}</pre>
			</div>
		</>
	)
}

const screenID = newID()
const rectID = newID()

export default function App() {
	const [state, setState] = React.useState({
		down: false,
		x: 0,
		y: 0,
	})

	const updateKeys = React.useMemo(() => {
		return next =>
			setState(current => ({
				...current,
				...next,
			}))
	}, [setState])

	return (
		<>
			{/**/}

			<Style id={screenID}>
				{css`
					.screen__${screenID} {
						height: 100vh;
					}
				`}
			</Style>

			<div
				className={`screen__${screenID}`}
				onPointerDown={e => {
					updateKeys({
						down: true,
					})
				}}
				onPointerMove={e => {
					updateKeys({
						x: Math.round(e.clientX),
						y: Math.round(e.clientY),
					})
				}}
				onPointerUp={e => {
					updateKeys({
						down: false,
					})
				}}
			>
				{/**/}

				{state.down && (
					<>
						<Style id={rectID}>
							{css`
								.rect__${rectID} {
									position: relative;
									height: ${!state.down ? "auto" : `calc(${px(state.y)} - ${px(8)} - ${px(10 / 2)})`};
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
									width: ${px(80)};
									height: ${px(10)};
									background-color: hsl(${3.25 * 60}, 100%, 90%);
									border-radius: 9999px;
									transition-property: background-color;
									transition-duration: 100ms;
									transition-timing-function: ease-out;
								}
								.rect-absolute-handle__${rectID}:hover {
									background-color: hsl(${3.25 * 60}, 100%, 75%);
									transition-property: background-color;
									transition-duration: 100ms;
									transition-timing-function: ease-out;
								}
							`}
						</Style>

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
