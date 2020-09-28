import * as React from "react"

function useLayoutClear() {
	React.useLayoutEffect(() => {
		setTimeout(() => {
			console.clear()
		}, 1e3)
	}, [])
}

/* eslint-disable */
export default function App() {
	useLayoutClear()

	const [state, setState] = React.useState({
		pointerCoords: {
			x: 0,
			y: 0,
		},
		pointerDown: false,
		elements: [],
	})

	const update = React.useMemo(() => {
		return replace => setState(current => ({
			...current,
			...replace,
		}))
	}, [setState])

	return (
		<>

			<div
				className="bg-blue-100 min-h-screen"
				onPointerDown={e => {
					update({ pointerDown: true })
				}}
				onPointerUp={() => {
					update({ pointerDown: false })
				}}
				onPointerMove={e => {
					update({
						x: Math.round(e.clientX),
						y: Math.round(e.clientY),
					})
				}}
			>
				<div
					className="bg-blue-200"
					// style={{ height: y }}
				>

					<div className="relative h-full">
						<div className="p-2 absolute bottom-0 right-0">
							<p className="font-mono text-sm tabular-nums">
								{/* ({x}, {y}) */}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Debug */}
			<div className="p-2 fixed bottom-0 left-0">
				<p className="whitespace-pre font-mono text-sm tabular-nums">
					{JSON.stringify(state, null, 2)}
				</p>
			</div>

		</>
	)
}
