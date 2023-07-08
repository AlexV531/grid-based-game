import { keysPressed } from "./InputManager.js";
import { pauseGame, unpauseGame } from "./main.js";

let uiElement = null

export function updateUI(deltaTime) {
	if(keysPressed.o) {
		if(document.getElementById("dialogue").style.visibility == "visible") {
			document.getElementById("dialogue").style.visibility = "hidden"
			unpauseGame()
		} else {
			document.getElementById("dialogue").style.visibility = "visible"
			pauseGame()
		}
	}
}