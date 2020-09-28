import * as React from "react"

;(() => {
	console.clear()
})()

export default function App() {
	const pointerDownRef = React.useRef(false)

	// const [state, setAppState] = React.useState({
	// 	x: 0,
	// 	y: 0,
	// })

	const [x, setX] = React.useState(0)
	const [y, setY] = React.useState(0)

	return (
		<>

			<div
				className="bg-blue-100 min-h-screen"
				onPointerDown={() => {
					pointerDownRef.current = true
				}}
				onPointerUp={() => {
					pointerDownRef.current = false
				}}
				onPointerMove={e => {
					if (!pointerDownRef.current) {
						// No-op
						return
					}
					setX(e.clientX)
					setY(e.clientY)
				}}
			>
				<div
					className="bg-blue-200"
					style={{ height: y }}
				>

					<div className="relative h-full">
						<div className="p-2 absolute bottom-0 right-0">
							({x.toFixed(0)}, {y.toFixed(0)})
						</div>
					</div>
				</div>
			</div>

			{/* Debug */}
			<div className="p-2 fixed bottom-0 right-0">
				<p className="font-mono text-sm tabular-nums">
					({x.toFixed(0)}, {y.toFixed(0)})
				</p>
			</div>

		</>
	)
}
