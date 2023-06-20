import { loadAssets } from './assets.js'
import { pos, initCamera, updateCamera } from './Camera.js'
import { updateClock } from './Clock.js'
import { initInputManager, keysPressed, resetInputManager } from './InputManager.js'
import Renderer from './Renderer.js'
import Level from './world/Level.js'

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('canvas.main-canvas')
/** Drawing Context */
const context = canvas.getContext('2d')
/** Size of our drawing area */
const viewport = {
	width: 320, height: 240 // These will be determined later..
}

let prevT = Date.now()

/** Scene scaling */
export const SCALE = 8.0
export const TILEWIDTH = 0.4
/** Background */
const BG_COLOR = '#000000'

let testOnce = true
let paused = false
export let level
let renderer

/** Handles initial canvas sizing, and all resizing thereafter */
function resize() {
	// Whenever the window is resized we need to update
	// the canvas resolution.
	const rc = canvas.getBoundingClientRect()
	canvas.width = viewport.width = rc.width
	canvas.height = viewport.height = rc.height
	render()
}


/** Call this once on application startup */
async function initApp() {
	// Listen for window resize events
	window.addEventListener('resize', resize)

	initCamera(canvas)
	initInputManager(canvas)

	const assets = await loadAssets()
	level = new Level("test.json")
	renderer = new Renderer(level, assets, context, canvas)
}

/** Render the scene */
// NEED RENDERER CLASS
function render() {
	// Clear the screen
	context.imageSmoothingEnabled = false;
	context.beginPath()
	context.fillStyle = BG_COLOR
	context.fillRect(0, 0, viewport.width, viewport.height)

	// Set up a cartesian-style coordinate system with 0,0
	// at the centre of the screen, and Y axis up.
	context.save()
	context.translate(pos.x, viewport.height - pos.y)

	context.scale(viewport.width / SCALE, -viewport.width / SCALE)
	
	context.getTransform()

	// Render the tilemap and gameobjects
	renderer.render()

	context.restore()
}

//start animation loop
function update() {
	const curT = Date.now()
	const deltaT = curT - prevT
	//const fT = deltaT/1000
	//SCALE = scaleInput

	if(!paused) {
		updateClock(deltaT)
		updateCamera(deltaT)
	}

	//console.log(time)
	
	/*
	if(keys.z == 1) {
		let obsTile = level.tileMap.getTileAt(mouseTile.x, mouseTile.y)
		if(obsTile != null) {
			obsTile.obstructed = true
		}
	}
	else if(keys.x == 1) {
		let obsTile = level.tileMap.getTileAt(mouseTile.x, mouseTile.y)
		if(obsTile != null) {
			obsTile.obstructed = false
		}
	}
	*/
	if(keysPressed.p) {
		console.log("test")
		if(paused) {
			paused = false
		} else {
			paused = true
		}
	}

	if(!paused) {
		level.update(deltaT)
	}

	if(testOnce) {
		testOnce = false
	}

	resetInputManager()

	prevT = curT
	render()
	requestAnimationFrame(update)
}

initApp().then(() => {
	resize()
	console.log('Starting animation loop')
	requestAnimationFrame(update)
})
