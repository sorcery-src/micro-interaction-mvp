import React from "react"
import StyleOnce from "lib/CSS/StyleOnce"
import createID from "utils/createID"
import css from "lib/x/tpl"
import px from "lib/CSS/px"

const id = createID()

// TODO
export default function DebugElement({ element }) {
	return (
		<>
			{/**/}

			<StyleOnce id={id}>
				{css`
					.absolute__${id} {
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
					.debugElement__${id} {
						white-space: pre;
						font-family: monospace;
					}
				`}
			</StyleOnce>

			<div className={`absolute__${id}`}>
				<div className={`debugElement__${id}`}>
					({element.style.width}, {element.style.height}px)
				</div>
			</div>

			{/**/}
		</>
	)
}
