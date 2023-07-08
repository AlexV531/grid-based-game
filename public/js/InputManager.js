import { pos } from './Camera.js'
import { level, SCALE } from './main.js'

let canvas

export let keys = {
	upArrow:0, downArrow:0, rightArrow:0, leftArrow:0,
	w:0, a:0, s:0, d:0,
	o:0, p:0, l:0, z:0, x:0
}

export let keysPressed = {
	p:false, o:false, l:false
}

export let mouse = {
	x:0, y:0
}

export let mouseTile = {
	x:0, y:0
}

export let mouseClicked = false

export let scaleInput = 5

export function initInputManager(cnvs) {
	canvas = cnvs
	window.addEventListener('keydown', handleKeyDown)
	window.addEventListener('keyup', handleKeyUp)
	window.addEventListener('mousemove', handleMouseMove)
	window.addEventListener('click', handleClick)
	console.log("Input Manager Initialized")
}

export function resetInputManager() {
	mouseClicked = false
	keysPressed.o = false
	keysPressed.p = false
	keysPressed.l = false
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
	// w
	if (code === 87) {
		keys.w = 1
	}
	// a
	if (code === 65) {
		keys.a = 1
	}
	// s
	if (code === 83) {
		keys.s = 1
	}
	// d
	if (code === 68) {
		keys.d = 1
	}
	//o
	if (code === 79) {
		keys.o = 1
	}
	//p
	if (code === 80) {
		keys.p = 1
	}
	//l
	if (code === 76) {
		keys.l = 1
	}
	// z
	if (code === 90) {
		keys.z = 1
	}
	// x
	if (code === 88) {
		keys.x = 1
	}
	// =
	if (code === 61) {
		scaleInput += 1
	}
	// - 
	if (code === 173) {
		scaleInput -= 1
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
	// w
	if (code === 87) {
		keys.w = 0
	}
	// a
	if (code === 65) {
		keys.a = 0
	}
	// s
	if (code === 83) {
		keys.s = 0
	}
	// d
	if (code === 68) {
		keys.d = 0
	}
	//o
	if (code === 79) {
		keys.o = 0
		keysPressed.o = true
	}
	//p
	if (code === 80) {
		keys.p = 0
		keysPressed.p = true
	}
	//l
	if (code === 76) {
		keys.l = 0
		keysPressed.l = true
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
		mouseClicked = true
	}
}