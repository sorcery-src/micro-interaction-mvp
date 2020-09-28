import * as React from "react"
import useMethods from "use-methods"
import { v4 as uuidv4 } from "uuid"

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
	activeElement: null,
	elements: [],
}

const methods = state => ({
	setPointerDown(down) {
		state.pointer.down = down
		if (!down) {
			// No-op
			return
		}

		// Compute the offset from up to n previous elements:
		let offset = 0
		if (state.elements.length) {
			offset = state.elements.reduce((acc, each) => {
				return acc + each.styles.height
			}, 0)
		}

		state.elements.push({
			uuid: uuidv4(),
			parentElement: null,          // TODO
			previousElementSibling: null, // TODO
			nextElementSibling: null,     // TODO
			styles: {
				display: "block",
				width: "100%",
				height: state.pointer.y - offset,
			},
		})
	},
	setPointerRawXY({ rawX, rawY }) {
		const x = Math.round(rawX)
		const y = Math.round(rawY)

		state.pointer.x = x
		state.pointer.y = y

		if (state.pointer.down && state.elements.length) {

			// Compute the offset from up to n - 1 previous elements:
			const offset = state.elements.slice(0, state.elements.length - 1).reduce((acc, each) => {
				return acc + each.styles.height
			}, 0)
			state.elements[state.elements.length - 1].styles.height = y - offset

		}
	},
})

/* eslint-disable */
export default function App() {
	useLayoutClear()

	const [state, dispatch] = useMethods(methods, initialState)

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
					dispatch.setPointerRawXY({
						rawX: e.clientX,
						rawY: e.clientY,
					})
				}}
			>

				{state.elements.map(each => (
					<div
						key={each.uuid}
						className="bg-blue-200" // DEBUG
						style={each.styles}
					>
						<div className="relative h-full">
							<div className="p-2 absolute bottom-0 right-0">
								<p className="font-mono text-sm tabular-nums">
									({each.styles.width}, {each.styles.height + "px"})
								</p>
							</div>
						</div>
					</div>
				))}

			</div>

			{/* DEBUG */}
			<div className="p-2 fixed bottom-0 left-0">
				<p className="whitespace-pre font-mono text-sm tabular-nums">
					{JSON.stringify(state, null, 2)}
				</p>
			</div>

		</>
	)
}
