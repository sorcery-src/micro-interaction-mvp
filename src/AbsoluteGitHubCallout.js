import createID from "createID"
import css from "tpl"
import React from "react"
import StyleOnce from "StyleOnce"
import SVGGitHubCallout from "SVGGitHubCallout"

const id = createID()

export default function AbsoluteGitHubCallout() {
	return (
		<>
			{/**/}

			<StyleOnce id={id}>
				{css`
					.absolute__${id} {
						position: absolute;
						top: 0;
						right: 0;
					}
					.GitHubCallout__${id} {
						/* ... */
					}
				`}
			</StyleOnce>

			<div className={`absolute__${id}`}>
				<SVGGitHubCallout className={`GitHubCallout__${id}`} />
			</div>

			{/**/}
		</>
	)
}
