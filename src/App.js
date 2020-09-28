import * as React from "react"
import useMethods from "use-methods"

function useLayoutClear() {
	React.useLayoutEffect(() => {
		setTimeout(() => {
			console.clear()
		}, 1e3)
	}, [])
}

const initialState = {
	pointer: {
		down: false,
		x: 0,
		y: 0,
	},
	elements: [],
}

const methods = state => ({
	setPointerDown(down) {
		state.pointer.down = down
	},
	setPointerCoords({ x, y }) {
		state.pointer.x = Math.round(x)
		state.pointer.y = Math.round(y)
	}
})

/* eslint-disable */
export default function App() {
	useLayoutClear()

	const [state, dispatch] = useMethods(methods, initialState)

	// const update = React.useMemo(() => {
	// 	return replace => setState(current => ({
	// 		...current,
	// 		...replace,
	// 	}))
	// }, [setState])

	return (
		<>

			<div
				className="bg-blue-100 min-h-screen"
				onPointerDown={e => {
					dispatch.setPointerDown(true)
				}}
				onPointerUp={() => {
					dispatch.setPointerDown(false)
				}}
				onPointerMove={e => {
					dispatch.setPointerCoords({
						x: e.clientX,
						y: e.clientY,
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
