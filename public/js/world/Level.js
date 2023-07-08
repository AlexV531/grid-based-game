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
import DialogueComponent from '../components/DialogueComponent.js'
import { DialogueNode } from '../util/Tree.js'

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
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 2, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 2, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 2, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 2, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 2, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 2, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 2, 0, 0],
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

		this.propMap = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		]

		// For now there will be one level that is defined here

		// Creating tile map
		this.tileMap = new TileMap(20, TILEWIDTH, this.spriteMap, this.propMap)

		let testComponent = new TestComponent()
		let spriteComponent = new SpriteComponent(0, null, TILEWIDTH, TILEWIDTH)
		let moveComponent = new MoveComponent(this.tileMap)
		let playerComponent = new PlayerComponent()
		let testObject = new GameObject("test", 2, 2, [testComponent, spriteComponent, moveComponent, playerComponent])

		// Dialogue tree
		var root = new DialogueNode(null, "Hello")
		root.addChild(new DialogueNode("Hi, how are you?", "I'm good thank you."))
		root.addChild(new DialogueNode("Huh?", "Hello?"))
		root.addChild(new DialogueNode("I don't want to talk to you. GO AWAY", "Ok... rude."))
		var children = root.getChildren()
		children[0].addChild(new DialogueNode("Good to hear.", "How are you?"))
		children[0].addChild(new DialogueNode("Oh. Woulda thought you would be worse... after the incident.", "... ya... I've tried to avoid thinking about it..."))
		var children0 = children[0].getChildren()
		children0[0].addChild(new DialogueNode("I'm good thanks.", null))
		children0[1].addChild(new DialogueNode("I'm sorry for bringing it up...", "No its ok... I'll get over it."))
		var children01 = children0[1].getChildren()
		children01[0].addChild(new DialogueNode("Ok then... goodbye.", null))

		children[1].addChild(new DialogueNode("Guh?", "What?"))
		var children1 = children[1].getChildren()
		children1[0].addChild(new DialogueNode("Buh?", "Ok you better stop this right now."))
		var children10 = children1[0].getChildren()
		children10[0].addChild(new DialogueNode("Wuh?", null))

		children[2].addChild(new DialogueNode("I'm sorry, can we start over?", "Ok fine."))
		children[2].addChild(new DialogueNode("You heard me.", null))
		var children2 = children[2].getChildren()
		children2[0].addChild(root)

		let spriteComponent3 = new SpriteComponent(0, null, TILEWIDTH, TILEWIDTH)
		let testAIComponent = new TestAIComponent()
		let dialogueComponent = new DialogueComponent("img/test-guy-photo.png", root)
		let testAIObject = new GameObject("AI test", 2.8, 2.8, [spriteComponent3, testAIComponent, dialogueComponent])

		let spriteComponent4 = new SpriteComponent(1, {x:1.2, y:4.4}, TILEWIDTH*9, TILEWIDTH*7)
		let spriteComponent6 = new SpriteComponent(2, {x:2, y:4}, TILEWIDTH, TILEWIDTH)
		let roofComponent = new RoofComponent([testObject, testAIComponent], 1.2, 4, 4.8, 7.2, spriteComponent4)
		let doorComponent = new DoorComponent([testObject, testAIComponent], 2, 4, 2.4, 4.4, spriteComponent6, 2, 3)
		let buildingComponent = new BuildingComponent([roofComponent], [doorComponent], [])
		let testBuildingObject = new GameObject("Building test", 1.2, 4.4, [spriteComponent4, spriteComponent6, roofComponent, doorComponent, buildingComponent])

		// Creating list of game objects
		this.gameObjects = [testObject, testAIObject, testBuildingObject]
	}

	update(deltaT) {
		this.tileMap.update(deltaT)
		for(let gameObject of this.gameObjects) {
			gameObject.update(deltaT)
		}
	}

}