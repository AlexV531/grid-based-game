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

		// TILE MAP //

		// Render the tile map starting at the top and ending at the bottom.
		// That way elements in front of other elements will be drawn correctly
		this.context.fillStyle = '#FFFFFF'
		let width = this.tileMap.tileWidth
		
		// Only render things that are visible to the camera
		let yStart = Math.floor(((-pos.y + this.canvas.height) / (this.canvas.width / SCALE)) / width)
		let yEnd = Math.floor((-pos.y / (this.canvas.width / SCALE)) / width)
		let xStart = Math.floor((-pos.x / (this.canvas.width / SCALE)) / width)
		let xEnd = Math.floor(((-pos.x + this.canvas.width) / (this.canvas.width / SCALE)) / width)
		for(let y = yStart; y >= yEnd; y--) {
			for(let x = xStart; x <= xEnd; x++) {
				// Each tile has an image index, which is used to find the asset needed to render the tile
				if(this.tileMap.tileList[x] != null && this.tileMap.tileList[x][y]) {
					this.context.drawImage(this.assets[0][this.tileMap.tileList[x][y].getImageIndex()], x*width, y*width, width, width)
				}
			}
		}
		
		/*
		// Render everything, not just in camera:
		for(let y = 0; y < this.tileMap.size; y++) {
			for(let x = 0; x < this.tileMap.size; x++) {
				// Each tile has an image index, which is used to find the asset needed to render the tile
				this.context.drawImage(this.assets[0][this.tileMap.tileList[x][y].getImageIndex()], x*width, y*width, width, width)
			}
		}
		*/

		for(let i = 0; i < this.gameObjects.length; i++) {
			let spriteIndex = this.gameObjects[i].getComponent(SpriteComponent).sprite
			this.context.drawImage(this.assets[spriteIndex], this.gameObjects[i].x, this.gameObjects[i].y, width, width)
		}
	}

}