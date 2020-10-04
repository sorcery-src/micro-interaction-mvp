/* eslint-disable */

import * as React from "react"

import StyleOnce from "lib/CSS/StyleOnce"
import createID from "utils/createID"
import css from "lib/x/tpl"
import px from "lib/CSS/px"

const debugElementID = createID()

function DebugElement({ element }) {
	return (
		<>
			{/**/}

			<StyleOnce id={debugElementID}>
				{css`
					.absolute__${debugElementID} {
						padding-top: ${px(8)};
						padding-right: ${px(8)};
						padding-bottom: ${px(8)};
						padding-left: ${px(8)};
						position: absolute;
						top: ${element.style.height < 32 ? "100%" : "auto"};
						right: 0;
						bottom: ${element.style.height < 32 ? "auto" : "0"};
						user-select: none;
					}
					.debugElement__${debugElementID} {
						white-space: pre;
						font-family: monospace;
					}
				`}
			</StyleOnce>

			<div className={`absolute__${debugElementID}`}>
				<div className={`debugElement__${debugElementID}`}>
					({element.style.width}, {element.style.height}px)
				</div>
			</div>

			{/**/}
		</>
	)
}

const elementID = createID()
const resizeElementID = createID()

export default function Element({ element, dispatch }) {
	return (
		<>
			{/**/}

			<StyleOnce id={elementID}>
				{css`
					[data-element="${elementID}"] {
						background-color: hsl(${3.25 * 60}, 100%, 95%);
					}
					[data-element="${elementID}"]:focus {
						outline: none;
					}
					[data-element="${elementID}"][data-has-focus="true"] {
						background-color: hsl(${3.25 * 60}, 100%, 75%);
					}
				`}
			</StyleOnce>

			{/* TODO: element.tag */}
			<div
				id={element.key} // TODO?
				style={element.style}
				onFocus={() => dispatch.focusActiveElementByKey(element.key)}
				onBlur={e => {
					if (!e.target.contains(e.relatedTarget)) {
						dispatch.blurActiveElementByKey(element.key)
					}
				}}
				tabIndex={0}
				data-element={elementID}
				data-has-focus={element.hasFocus}
			>
				<div style={{ position: "relative", height: "100%" }}>
					{/**/}

					{element.hasFocus && (
						<>
							<StyleOnce id={resizeElementID}>
								{css`
									.absolute__${resizeElementID} {
										position: absolute;
										top: 100%;
										right: 0;
										left: 0;
										display: flex;
										justify-content: center;
										align-items: center;
										z-index: 50;
									}
									.resizerTabIndex__${resizeElementID} {
										padding-top: ${px(6)};
										padding-right: ${px(6)};
										padding-bottom: ${px(6)};
										padding-left: ${px(6)};
									}
									.resizerTabIndex__${resizeElementID}:focus {
										outline: none;
									}
									.resizer__${resizeElementID} {
										width: ${px(72)};
										height: ${px(6)};
										border-radius: 9999px;
										background-color: hsl(${3.25 * 60}, 100%, 90%);
									}
									.resizerTabIndex__${resizeElementID}[data-has-focus="true"] .resizer__${resizeElementID} {
										background-color: hsl(${3.25 * 60}, 100%, 75%);
									}
								`}
							</StyleOnce>

							<div className={`absolute__${resizeElementID}`}>
								<div
									className={`resizerTabIndex__${resizeElementID}`}
									onFocus={() => dispatch.focusActiveElementResizeByKey({ direction: "bottom", key: element.key })}
									onBlur={() => dispatch.blurActiveElementResizeByKey({ key: element.key })}
									tabIndex={0}
									data-has-focus={element.focusState.resizeBottom}
								>
									<div className={`resizer__${resizeElementID}`} />
								</div>
							</div>
						</>
					)}

					<DebugElement element={element} />

					{/**/}
				</div>
			</div>

			{/**/}
		</>
	)
}
