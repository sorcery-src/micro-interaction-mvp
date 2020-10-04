import React from "react"
import styles from "./index.module.css"

export default function SnapToEdgeHighlight() {
	return (
		<div className={styles.absolute}>
			<div className={styles.snapToEdgeHighlight} />
		</div>
	)
}
