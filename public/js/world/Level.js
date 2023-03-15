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
		let testObject = new GameObject("test", 2, 2, [testComponent, spriteComponent, moveComponent])

		let spriteComponent2 = new SpriteComponent(1)
		let playerComponent = new PlayerComponent()
		let moveComponent2 = new MoveComponent(this.tileMap)
		let playerTestObject = new GameObject("player test", 2.4, 2.4, [spriteComponent2, playerComponent, moveComponent2])
		
		// Creating list of game objects
		this.gameObjects = [testObject, playerTestObject]
	}

	update(deltaT) {
		this.tileMap.update(deltaT)
		for(let gameObject of this.gameObjects) {
			gameObject.update(deltaT)
		}
	}

}