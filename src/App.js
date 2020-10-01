/* eslint-disable */

import * as React from "react"
import css from "tpl"
import Style from "Style"
import { v4 as uuidv4 } from "uuid"

/****/

function px(n) {
	const rem = n / 16
	return rem + "rem"
}

function createID(desc) {
	return (!desc ? "" : desc + "__") + uuidv4().slice(0, 6)
}

/****/

const debugID = createID()

function Debug({ debug }) {
	return (
		<>
			<Style id={debugID}>
				{css`
					.debug__${debugID} {
						padding-top: ${px(12)};
						padding-right: ${px(12)};
						padding-bottom: ${px(12)};
						padding-left: ${px(12)};
						position: absolute;
						bottom: 0;
						left: 0;
						width: ${px(320)};
					}
					.debug-pre__${debugID} {
						font-size: ${px(14)};
					}
				`}
			</Style>

			<div className={`debug__${debugID}`}>
				<pre className={`debug-pre__${debugID}`}>{JSON.stringify(debug, null, 2)}</pre>
			</div>
		</>
	)
}

const screenID = createID()
const rectID = createID()
const rectHandleContainerID = createID()
const rectHandleID = createID()

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

				<Style id={rectID}>
					{css`
						.rect__${rectID} {
							position: relative;
							height: ${!state.down ? "auto" : px(state.y)};
							background-color: hsl(${3.25 * 60}, 100%, 90%);
						}
						.rect-handle-absolute__${rectID} {
							padding: ${px(8)};
							position: absolute;
							top: 100%;
							right: 0;
							left: 0;
							display: flex;
							justify-content: center;
							align-items: center;
						}
						.rect-handle__${rectID} {
							width: ${px(80)};
							height: ${px(10)};
							background-color: hsl(${3.25 * 60}, 100%, 90%);
							border-radius: 9999px;
							transition-property: background-color;
							transition-duration: 100ms;
							transition-timing-function: ease-out;
						}
						.rect-handle__${rectID}:hover {
							background-color: hsl(${3.25 * 60}, 100%, 75%);
							/* transition: background-color 100ms ease-out; */
							transition-property: background-color;
							transition-duration: 100ms;
							transition-timing-function: ease-out;
						}
					`}
				</Style>

				<div className={`rect__${rectID}`}>
					<div className={`rect-handle-absolute__${rectID}`}>
						<div className={`rect-handle__${rectID}`} />
					</div>
				</div>

				<Debug debug={state} />

				{/**/}
			</div>

			{/**/}
		</>
	)
}
