import { useMemo } from "react"
import { v4 as uuidv4 } from "uuid"

// Ex:
//
// function Component() {
//   const id = useOnce(() => uuidv4())
//   ...
// }
//
function useOnce(once) {
	return useMemo(once, [])
}

// Ex:
//
// function Component() {
//   const id = useOnceShortID()
//   ...
// }
//
export default function useOnceShortID() {
	return useOnce(() => uuidv4().slice(0, 6))
}
