// Map objects are things that can be interacted with but do not need to be updated with an update method.
// Examples of map objects: Doors, containers, workstations, etc.
// Map objects are simple and do not need components, they just extend this map object class.

// I think all map objects should have a sprite, maybe add that to the constructor.

export default class MapObject {

	constructor(name, x, y, spriteIndex) {
		this.name = name
		this.x = x
		this.y = y
		this.spriteIndex = spriteIndex
	}
}