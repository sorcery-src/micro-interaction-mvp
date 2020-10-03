import { v4 as uuidv4 } from "uuid"

// Creates an ID.
//
// Ex:
//
// createID() // "abc123"
// createID("desc") // "desc__abc123"
//
export default function createID(desc) {
	return (!desc ? "" : desc + "__") + uuidv4().slice(0, 6)
}
