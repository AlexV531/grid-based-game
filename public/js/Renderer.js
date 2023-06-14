import SpriteComponent from "./components/SpriteComponent.js"
import { pos } from './Camera.js'
import { SCALE } from './main.js'

export default class Renderer {

	constructor(level, assets, context, canvas) {
		this.canvas = canvas
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

		// Render the tile map starting at the top and ending at the bottom.
		// That way elements in front of other elements will be drawn correctly
		this.context.fillStyle = '#FFFFFF'
		let width = this.tileMap.tileWidth
		// This buffer makes the renderer draw tiles and game objects 2 tiles off screen to 
		// avoid game objects disappearing if their origin point is off screen
		let buffer = 2
		
		// Only render things that are visible to the camera
		let yStart = Math.floor(((-pos.y + this.canvas.height) / (this.canvas.width / SCALE)) / width) + buffer
		let yEnd = Math.floor((-pos.y / (this.canvas.width / SCALE)) / width) - buffer
		let xStart = Math.floor((-pos.x / (this.canvas.width / SCALE)) / width) - buffer
		let xEnd = Math.floor(((-pos.x + this.canvas.width) / (this.canvas.width / SCALE)) / width) + buffer
		// yStart is at the top of the canvas, yEnd is at the bottom.
		// xStart is at the left side of the canvas, xEnd is at the right.

		// Loop through each row that is visible on the screen
		for(let y = yStart; y >= yEnd; y--) {
			// TILE MAP //
			// Tile images
			for(let x = xStart; x <= xEnd; x++) {
				// Each tile has an image index, which is used to find the asset needed to render the tile
				if(this.tileMap.tileList[x] != null && this.tileMap.tileList[x][y]) {
					this.context.drawImage(this.assets[1][this.tileMap.tileList[x][y].getTileImageIndex()], x*width, y*width, width, width)
				}
			}
			// Highlights
			// Loop through each tile in the row
			for(let x = xStart; x <= xEnd; x++) {
				// Each tile has an image index, which is used to find the asset needed to render the tile
				if(this.tileMap.tileList[x] != null && this.tileMap.tileList[x][y]) {
					if(this.tileMap.tileList[x][y].getHighlightImageIndex() > 1) {
						this.context.drawImage(this.assets[0][this.tileMap.tileList[x][y].getHighlightImageIndex()], x*width, y*width, width, width)
					}
				}
			}
			// GAME OBJECTS //
			// Loop through each game object, check if it is on the current row
			// If so, render it
			for(let i = 0; i < this.gameObjects.length; i++) {
				if(Math.floor(this.gameObjects[i].y / width)  == y && Math.floor(this.gameObjects[i].x / width) > xStart && Math.floor(this.gameObjects[i].x / width) < xEnd) {
					let spriteComponents = this.gameObjects[i].getAllComponents(SpriteComponent)
					if(spriteComponents != null) {
						for(let j = 0; j < spriteComponents.length; j++) {
							if(spriteComponents[j].show) {
								let spriteIndex = spriteComponents[j].sprite
								let spriteWidth = spriteComponents[j].width
								let spriteHeight = spriteComponents[j].height
								this.context.drawImage(this.assets[spriteIndex], this.gameObjects[i].x, this.gameObjects[i].y, spriteWidth, spriteHeight)
							}
						}
					}
				}
			}
		}
	}
}