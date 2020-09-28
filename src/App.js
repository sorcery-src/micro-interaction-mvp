import * as React from "react"

;(() => {
	console.clear()
})()

export default function App() {
	const [x, setX] = React.useState(0)
	const [y, setY] = React.useState(0)

	return (
		<>

			<div
				className="bg-blue-100 min-h-screen"
				onPointerMove={e => {
					setX(e.clientX)
					setY(e.clientY)
				}}
			/>

			{/* Debug */}
			<div className="p-2 fixed bottom-0 right-0">
				<p className="font-mono text-sm tabular-nums">
					({x.toFixed(0)}, {y.toFixed(0)})
				</p>
			</div>

		</>
	)
}
