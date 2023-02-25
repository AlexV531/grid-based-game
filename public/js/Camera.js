import { keys } from './InputManager.js'

export let pos = {
	x:0, y:0
}
let speed = 0.0003
let canvas

export function initCamera(cnvs) {
	canvas = cnvs
	console.log("Camera Initialized")
}

export function updateCamera(deltaTime) {
	// Update the camera's position
	pos.x = pos.x + (keys.leftArrow - keys.rightArrow) * speed * deltaTime * canvas.width
	pos.y = pos.y + (keys.downArrow - keys.upArrow) * speed * deltaTime * canvas.width
}

