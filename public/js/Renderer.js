import SpriteComponent from "./components/SpriteComponent.js"

export default class Renderer {

	constructor(level, assets, context) {
		this.context = context
		this.assets = assets
		this.level = level
		this.tileMap = level.tileMap

		// This line is just for testing the tilemap render (without level class implemented yet)
		//this.tileMap = level

		this.gameObjects = level.gameObjects
	}

	// UNTESTED
	switchLevel(level) {
		this.level = level
		this.tileMap = level.tileMap
		this.gameObjects = level.gameObjects
	}

	// The renderer will render the tilemap and all the gameobjects in a specified level.
	render() {

		// TILE MAP //

		// This render is just to visualize pathfinding for now
		this.context.fillStyle = '#FFFFFF'
		let width = this.tileMap.tileWidth
		for(let y = 0; y < this.tileMap.size; y++) {
			for(let x = 0; x < this.tileMap.size; x++) {
				// Each tile has an image index, which is used to find the asset needed to render the tile
				this.context.drawImage(this.assets[0][this.tileMap.tileList[x][y].getImageIndex()], x*width, y*width, width, width)
			}
		}

		for(let i = 0; i < this.gameObjects.length; i++) {
			//let spriteIndex = gameObject.getComponent(SpriteComponent).sprite
			this.context.drawImage(this.assets[1], this.gameObjects[i].x, this.gameObjects[i].y, width, width)
		}
	}

}