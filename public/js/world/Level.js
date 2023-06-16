import TileMap from './TileMap.js'
import SpriteComponent from '../components/SpriteComponent.js'
import TestComponent from '../components/TestComponent.js'
import MoveComponent from '../components/MoveComponent.js'
import PlayerComponent from '../components/PlayerComponent.js'
import GameObject from '../GameObject.js'
import TestAIComponent from '../components/TestAIComponent.js'
import RoofComponent from '../components/RoofComponent.js'
import { TILEWIDTH } from '../main.js'
import BuildingComponent from '../components/BuildingComponent.js'
import DoorComponent from '../components/DoorComponent.js'

export default class Level {

	// Levels will be loaded from a json maybe?
	constructor(levelFile) {
		this.levelFile = levelFile
		
		// The map is rotated 90 degrees counter clockwise
		this.spriteMap = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		]

		// For now there will be one level that is defined here

		// Creating tile map
		this.tileMap = new TileMap(20, TILEWIDTH, this.spriteMap)

		let testComponent = new TestComponent()
		let spriteComponent = new SpriteComponent(0, null, TILEWIDTH, TILEWIDTH)
		let moveComponent = new MoveComponent(this.tileMap)
		let testObject = new GameObject("test", 2, 2, [testComponent, spriteComponent, moveComponent])

		let spriteComponent2 = new SpriteComponent(0, null, TILEWIDTH, TILEWIDTH)
		let playerComponent = new PlayerComponent()
		let playerTestObject = new GameObject("player test", 2.4, 2.4, [spriteComponent2, playerComponent])

		let spriteComponent3 = new SpriteComponent(0, null, TILEWIDTH, TILEWIDTH)
		let testAIComponent = new TestAIComponent()
		let testAIObject = new GameObject("AI test", 2.8, 2.8, [spriteComponent3, testAIComponent])

		
		let spriteComponent4 = new SpriteComponent(1, {x:1.2, y:4.4}, TILEWIDTH*9, TILEWIDTH*7)
		let spriteComponent6 = new SpriteComponent(2, {x:2, y:4}, TILEWIDTH, TILEWIDTH)
		let roofComponent = new RoofComponent(playerTestObject, 1.2, 4, 4.8, 7.2, spriteComponent4)
		let doorComponent = new DoorComponent(playerTestObject, 2, 4, 2.4, 4.4, spriteComponent6, 2, 3)
		let buildingComponent = new BuildingComponent([roofComponent], [doorComponent], [])
		let testBuildingObject = new GameObject("Building test", 1.2, 4.4, [spriteComponent4, spriteComponent6, roofComponent, doorComponent, buildingComponent])

		// Creating list of game objects
		this.gameObjects = [testObject, playerTestObject, testAIObject, testBuildingObject]
	}

	update(deltaT) {
		this.tileMap.update(deltaT)
		for(let gameObject of this.gameObjects) {
			gameObject.update(deltaT)
		}
	}

}