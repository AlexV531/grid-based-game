import TileMap from './TileMap.js'
import SpriteComponent from '../components/SpriteComponent.js'
import TestComponent from '../components/TestComponent.js'
import MoveComponent from '../components/MoveComponent.js'
import PlayerComponent from '../components/PlayerComponent.js'
import GameObject from '../GameObject.js'

export default class Level {

	// Levels will be loaded from a json maybe?
	constructor(levelFile) {
		this.levelFile = levelFile

		// For now there will be one level that is defined here

		// Creating tile map
		this.tileMap = new TileMap(20, 0.4)

		let testComponent = new TestComponent()
		let spriteComponent = new SpriteComponent(1)
		let moveComponent = new MoveComponent(this.tileMap)
		let playerComponent = new PlayerComponent()
		let testObject = new GameObject("test", 2, 2, [testComponent, spriteComponent, moveComponent, playerComponent])
		
		// Creating list of game objects
		this.gameObjects = [testObject]
	}

	update(deltaT) {
		this.tileMap.update(deltaT)
		for(let gameObject of this.gameObjects) {
			gameObject.update(deltaT)
		}
	}

}