import React from "react"
import SVGGitHubCallout from "./SVGGitHubCallout"
import styles from "./index.module.css"

// TODO: Add {...target_blank}.
export default function AbsoluteGitHubCallout() {
	return (
		<div className={styles.absolute}>
			<a href="https://github.com/sorcery-src/mvp" /* {...target_blank} */>
				<SVGGitHubCallout className={styles.svg} />
			</a>
		</div>
	)
}
