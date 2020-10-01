import * as React from "react"
import css from "tpl"
import Style from "Style"
import useOnceShortID from "useOnceShortID"

function Box({ children, ...props }) {
	const uuid = useOnceShortID()

	return (
		<div className={`box__${uuid}`} {...props}>
			<Style id={uuid}>
				{css`
					.box__${uuid} {
						width: ${320 / 16}rem;
						height: ${320 / 16}rem;
						background-color: hsl(${3.25 * 60}, 100%, 90%);
					}
				`}
			</Style>
			{children}
		</div>
	)
}

function Center({ children, ...props }) {
	const uuid = useOnceShortID()

	return (
		<div className={`center__${uuid}`} {...props}>
			<Style id={uuid}>
				{css`
					.center__${uuid} {
						display: flex;
						justify-content: center;
						align-items: center;
					}
				`}
			</Style>
			{children}
		</div>
	)
}

export default function App() {
	return (
		<Center style={{ height: "100vh" }}>
			<Box />
		</Center>
	)
}
