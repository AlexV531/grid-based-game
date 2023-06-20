import SpriteComponent from "./components/SpriteComponent.js"
import { pos } from './Camera.js'
import { SCALE } from './main.js'
import { propImgInfo as propImgInfo } from "./assets.js"

export default class Renderer {

	constructor(level, assets, context, canvas) {
		this.canvas = canvas
		this.context = context
		this.assets = assets
		this.level = level
		this.tileMap = level.tileMap
		this.propMap = level.propMap
		this.gameObjects = level.gameObjects
	}

	// UNTESTED
	switchLevel(level) {
		this.level = level
		this.tileMap = level.tileMap
		this.propMap = level.propMap
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
		let buffer = 3
		
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
			// Tile images are rendered first because they are behind everything
			for(let x = xStart; x <= xEnd; x++) {
				// Each tile has an image index, which is used to find the asset needed to render the tile
				if(this.tileMap.tileList[x] != null && this.tileMap.tileList[x][y]) {
					this.context.drawImage(this.assets[0][this.tileMap.tileList[x][y].getTileImageIndex()], x*width, y*width, width, width)
				}
			}
		}

		// Loop through each row that is visible on the screen
		for(let y = yStart; y >= yEnd; y--) {
			
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
								
								// If the position is null then use the gameobject position
								if(spriteComponents[j].pos == null) {
									this.context.drawImage(this.assets[1][spriteIndex], this.gameObjects[i].x, this.gameObjects[i].y, spriteWidth, spriteHeight)
								} else {
									this.context.drawImage(this.assets[1][spriteIndex], spriteComponents[j].pos.x, spriteComponents[j].pos.y, spriteWidth, spriteHeight)
								}
							}
						}
					}
				}
			}

			// PROPS
			for(let x = xStart; x <= xEnd; x++) {
				if(this.propMap[x] != null && this.propMap[x][y] && this.propMap[x][y] != 0) {
					let propIndex = this.propMap[x][y]
					this.context.drawImage(this.assets[2][propIndex], 
						(x + propImgInfo[propIndex].xOff)*width, 
						(y + propImgInfo[propIndex].yOff)*width, 
						propImgInfo[propIndex].xWid*width, 
						propImgInfo[propIndex].yWid*width)
				}
			}
		}
	}
}