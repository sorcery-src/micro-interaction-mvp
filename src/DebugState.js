import React from "react"
import StyleOnce from "lib/CSS/StyleOnce"
import createID from "utils/createID"
import css from "lib/x/tpl"
import px from "lib/CSS/px"

const debugStateID = createID()

export default function DebugState({ state }) {
	return (
		<>
			{/**/}

			<StyleOnce id={debugStateID}>
				{css`
					.absolute__${debugStateID} {
						padding-top: ${px(12)};
						padding-right: ${px(12)};
						padding-bottom: ${px(12)};
						padding-left: ${px(12)};
						position: absolute;
						bottom: 0;
						left: 0;
						width: ${px(320)};
					}
					.debugState__${debugStateID} {
						white-space: pre;
						font-family: monospace;
					}
				`}
			</StyleOnce>

			<div className={`absolute__${debugStateID}`}>
				<div className={`debugState__${debugStateID}`}>{JSON.stringify(state, null, 2)}</div>
			</div>
		</>
	)
}
