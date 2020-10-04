import * as React from "react"

import $$element from "./css/element.module.css"
import debugSize from "./css/debugSize.module.css"
import resizer from "./css/resizer.module.css"

function Resizer({ element, dispatch }) {
	return (
		<div className={resizer.absolute}>
			<div
				className={resizer.resizerTabIndex}
				onFocus={() => dispatch.focusActiveElementResizeByKey({ direction: "bottom", key: element.key })}
				onBlur={() => dispatch.blurActiveElementResizeByKey({ key: element.key })}
				tabIndex={0}
				data-has-focus={element.focusState.resizeBottom}
			>
				<div className={resizer.resizer} />
			</div>
		</div>
	)
}

export default function Element({ element, dispatch }) {
	return (
		<element.tag
			id={element.id}
			// prettier-ignore
			className={[
				$$element.element,
				element.className,
			].filter(Boolean).join(" ")}
			style={element.style}
			onFocus={() => dispatch.focusActiveElementByKey(element.key)}
			onBlur={e => {
				if (!e.target.contains(e.relatedTarget)) {
					dispatch.blurActiveElementByKey(element.key)
				}
			}}
			tabIndex={0}
			data-key={element.key}
			data-has-focus={element.hasFocus}
		>
			<div style={{ position: "relative", height: "100%" }}>
				{/**/}

				{element.hasFocus && <Resizer element={element} dispatch={dispatch} />}

				<div className={debugSize.absolute} data-show={element.style.height >= 32}>
					<div className={debugSize.text}>
						({element.style.width}, {element.style.height}px)
					</div>
				</div>

				{/**/}
			</div>
		</element.tag>
	)
}
