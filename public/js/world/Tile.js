export default class Tile {

	constructor(x, y, obstructed, tileImageIndex) {
		this.x = x
		this.y = y
		this.obstructed = obstructed
		// gCost, hCost and parent will be set during the pathfinding algorithm and do not need to be set on creation
		this.gCost = 0
		this.hCost = 0
		this.parent = null
		this.highlightImageIndex = 0
		this.tileImageIndex = tileImageIndex
		this.associatedObject = null
	}

	getX() {
		return this.x
	}

	getY() {
		return this.y
	}

	isObstructed() {
		return this.obstructed
	}

	getFCost() {
		return this.gCost + this.hCost
	}

	getHighlightImageIndex() {
		return this.highlightImageIndex
	}

	getTileImageIndex() {
		return this.tileImageIndex
	}
}