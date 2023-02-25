import { pos } from './Camera.js'
import { level, SCALE } from './main.js'
import { findPath } from './world/Pathfinding.js'
import MoveComponent from './components/MoveComponent.js'

let canvas

export let keys = {
	upArrow:0, downArrow:0, rightArrow:0, leftArrow:0,
	z:0, x:0
}

export let mouse = {
	x:0, y:0
}

export let mouseTile = {
	x:0, y:0
}

export function initInputManager(cnvs) {
	canvas = cnvs
	window.addEventListener('keydown', handleKeyDown)
	window.addEventListener('keyup', handleKeyUp)
	window.addEventListener('mousemove', handleMouseMove)
	window.addEventListener('click', handleClick)
	console.log("Input Manager Initialized")
}

// For test display purposes
let startTest = {
	x:null, y:null
}
let targetTest = {
	x:null, y:null
}

/** @param {KeyboardEvent} e */
function handleKeyDown(e) {
	let code = e.keyCode
	// Up
	if(code === 38) {
		keys.upArrow = 1
	}
	// Down
	if(code === 40) {
		keys.downArrow = 1
	}
	// Left
	if(code === 37) {
		keys.leftArrow = 1
	}
	// Right
	if(code === 39) {
		keys.rightArrow = 1
	}
	// z
	if (code === 90) {
		keys.z = 1
	}
	// x
	if (code === 88) {
		keys.x = 1
	}
}

/** @param {KeyboardEvent} e */
function handleKeyUp(e) {
	let code = e.keyCode
	// Up
	if(code === 38) {
		keys.upArrow = 0
	}
	// Down
	if(code === 40) {
		keys.downArrow = 0
	}
	// Left
	if(code === 37) {
		keys.leftArrow = 0
	}
	// Right
	if(code === 39) {
		keys.rightArrow = 0
	}
	// z
	if (code === 90) {
		keys.z = 0
	}
	// x
	if (code === 88) {
		keys.x = 0
	}
}

/** @param {MouseEvent} e */
function handleMouseMove(e) {
	mouse = {
		x:(e.clientX - pos.x) / (canvas.width / SCALE),
		y:-(e.clientY + pos.y - canvas.height) / (canvas.width / SCALE)
	}
	mouseTile = {
		x:Math.floor(mouse.x / level.tileMap.getTileWidth()),
		y:Math.floor(mouse.y / level.tileMap.getTileWidth())
	}
}

/** @param {MouseEvent} e */
function handleClick(e) {
	if(!(mouseTile.x < 0 || mouseTile.y < 0 || mouseTile.x > level.tileMap.getMapSizeX() || mouseTile.y > level.tileMap.getMapSizeY())) {
		// Move player
		if(e.shiftKey) {
			level.gameObjects[0].getComponent(MoveComponent).move(mouseTile.x, mouseTile.y)
			return
		}
		// Pathfinding tester
		if(startTest.x === null) {
			startTest.x = mouseTile.x
			startTest.y = mouseTile.y
			level.tileMap.start.x = mouseTile.x
			level.tileMap.start.y = mouseTile.y
			level.tileMap.testPath = []
		} else if(targetTest.x === null) {
			targetTest.x = mouseTile.x
			targetTest.y = mouseTile.y
			level.tileMap.testPath = findPath(level.tileMap, startTest.x, startTest.y, targetTest.x, targetTest.y)
		} else {
			startTest.x = mouseTile.x
			startTest.y = mouseTile.y
			level.tileMap.start.x = mouseTile.x
			level.tileMap.start.y = mouseTile.y
			level.tileMap.testPath = []
			targetTest.x = null
		}
	}
}