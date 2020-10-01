/* eslint-disable */

import * as React from "react"
import css from "tpl"
import Style from "Style"
import useOnceID from "useOnceID"

// function Box({ children, ...props }) {
// 	const uuid = useOnceID()
//
// 	return (
// 		<div className={`box__${uuid}`} {...props}>
// 			<Style id={uuid}>
// 				{css`
// 					.box__${uuid} {
// 						width: ${320 / 16}rem;
// 						height: ${320 / 16}rem;
// 						background-color: hsl(${3.25 * 60}, 100%, 90%);
// 					}
// 				`}
// 			</Style>
// 			{children}
// 		</div>
// 	)
// }
//
// function Center({ children, ...props }) {
// 	const uuid = useOnceID()
//
// 	return (
// 		<div className={`center__${uuid}`} {...props}>
// 			<Style id={uuid}>
// 				{css`
// 					.center__${uuid} {
// 						display: flex;
// 						justify-content: center;
// 						align-items: center;
// 					}
// 				`}
// 			</Style>
// 			{children}
// 		</div>
// 	)
// }

function Rect({ children, ...props }) {
	const rectID = useOnceID()

	return (
		<>
			<Style id={rectID}>
				{css`
					.rect__${rectID} {
						background-color: hsl(${3.25 * 60}, 100%, 90%);
					}
				`}
			</Style>

			<div className={`rect__${rectID}`} {...props}>
				{children}
			</div>
		</>
	)
}

function Debug({ debug, ...props }) {
	const debugID = useOnceID()
	const debugTextID = useOnceID()

	return (
		<>
			<Style id={debugID}>
				{css`
					.debug__${debugID} {
						padding-top: ${12 / 16}rem;
						padding-right: ${12 / 16}rem;
						padding-bottom: ${12 / 16}rem;
						padding-left: ${12 / 16}rem;
						position: absolute;
						right: 0;
						bottom: 0;
						width: ${240 / 16}rem;
					}
				`}
			</Style>

			<div className={`debug__${debugID}`} {...props}>
				<pre className={`debug-text__${debugTextID}`}>
					<Style id={debugTextID}>
						{css`
							.debug-text__${debugTextID} {
								font-size: ${14 / 16}em;
							}
						`}
					</Style>
					{JSON.stringify(debug, null, 2)}
				</pre>
			</div>
		</>
	)
}

// <Center style={{ height: "100vh" }}>
// 	<Box />
// </Center>
//
export default function App() {
	const [state, setState] = React.useState({
		down: false,
		x: 0,
		y: 0,
	})

	const update = React.useMemo(() => {
		return next =>
			setState(current => ({
				...current,
				...next,
			}))
	}, [setState])

	return (
		<div
			style={{ height: "100vh" }}
			onPointerDown={e => {
				update({
					x: e.clientX,
					y: e.clientY,
				})
			}}
		>
			<Rect style={{ height: `${60 / 16}rem` }} />

			<Debug debug={state} />
		</div>
	)
}
