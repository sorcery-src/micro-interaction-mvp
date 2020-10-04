import { v4 as uuid } from "uuid"

// Creates a new 6-character ID (UUID).
//
// Ex:
//
// newID() // abc123
//
export default function newID() {
	return uuid().slice(0, 6)
}
