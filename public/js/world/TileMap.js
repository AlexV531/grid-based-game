import Tile from './Tile.js'
import { tileImgObsList, propImgInfo } from '../assets.js'

// This map currently only works for square layouts for now
export default class TileMap {

	constructor(size, tileWidth, spriteMap, propMap) {
		this.size = size
		this.tileWidth = tileWidth
		this.tileList = [...Array(size)].map(e => Array(size))
		let tempObstructed = []
		// Create a 2D array of the size of the tilemap and set them all to false
		for(var i = 0; i < size; i++) {
			tempObstructed.push([])
			for(var j = 0; j < size; j++) {
				tempObstructed[i].push(false)
			}
		}
		// Determining which tiles are obstructed due to props
		// using tileImgInfo, which has a list of nodes that are obstructed by the prop.
		// The obstructed nodes positions are given with x and y offsets from the
		// prop's origin
		for(var i = 0; i < size; i++) {
			for(var j = 0; j < size; j++) {
				if(propMap[i][j] != 0) {
					for(var k = 0; k < propImgInfo[propMap[i][j]].obs.length; k++) {
						tempObstructed[i+propImgInfo[propMap[i][j]].obs[k].xOff][j+propImgInfo[propMap[i][j]].obs[k].yOff] = true
					}
				}
			}
		}
		console.log(tempObstructed)
		for(var i = 0; i < size; i++) {
			for(var j = 0; j < size; j++) {
				// Combining the obstacles caused by props and obstacles caused by tiles
				tempObstructed[i][j] = tempObstructed[i][j] || tileImgObsList[spriteMap[i][j]]
				this.tileList[i][j] = new Tile(i, j, tempObstructed[i][j], spriteMap[i][j])
			}
		}
		// This variable is temporary and is just used to test pathfinding
		this.testPath = []
		this.start = {
			x:null, y:null
		}
	}

	getTileWidth() {
		return this.tileWidth
	}

	getMapSizeX() {
		return this.size
	}

	getMapSizeY() {
		return this.size
	}

	getTileList() {
		return this.tileList
	}

	getTileAt(x, y) {
		if(!((0 > x || x > this.size - 1 || x % 1 != 0) || (0 > y || y > this.size - 1 || y % 1 != 0))) {
			return this.tileList[x][y]
		}
		return
	}

	update(deltaTime) {
		// Updates all the tiles image indexes (their textures)
		for(let y = 0; y < this.size; y++) {
			for(let x = 0; x < this.size; x++) {
				if(this.testPath != null && this.testPath.includes(this.getTileAt(x, y))) {
					this.tileList[x][y].imageIndex = 2
				} else if(this.start.x === x && this.start.y === y) {
					this.tileList[x][y].imageIndex = 3
				} else if(this.getTileAt(x, y).isObstructed()) {
					this.tileList[x][y].imageIndex = 1
				} else {
					this.tileList[x][y].imageIndex = 0
				}
			}
		}
	}

	getDistance(tileA, tileB) {
		let difX = Math.abs(tileA.getX() - tileB.getX());
		let difY = Math.abs(tileA.getY() - tileB.getY());

		if(difX > difY) {
			return 14*difY + 10*(difX - difY);
		}
		else {
			return 14*difX + 10*(difY - difX);
		}
	}
}