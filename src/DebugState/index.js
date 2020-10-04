import React from "react"
import styles from "./index.module.css"

export default function DebugState({ state }) {
	return (
		// prettier-ignore
		<div className={styles.absolute}>
			<p className={styles.text}>
				{JSON.stringify(state, null, "\t")}
			</p>
		</div>
	)
}
