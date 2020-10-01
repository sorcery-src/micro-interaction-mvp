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
//   const id = useOnceID("component") // "component__<uuid>"
//   ...
// }
//
export default function useOnceID(desc) {
	return useOnce(() => (!desc ? "" : desc + "__") + uuidv4().slice(0, 6))
}
