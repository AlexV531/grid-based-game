import Component from "../Component.js";
import { keysPressed } from "../InputManager.js";
import { pauseGame, unpauseGame } from "../main.js";

/* Dialogue terms: 
option: one of the players dialogue options, a choice they can make in a dialogue session.
response: what the character says to the player.
root: the first node in a dialogue tree.
*/

export default class DialogueComponent extends Component {

	constructor(photo, dialogueRoot) {
		super()
		this.photo = photo
		this.dialogueRoot = dialogueRoot
		this.currentOption = dialogueRoot
	}

	update(deltaTime) {
		if(keysPressed.l) {
			this.openDialogue()
			pauseGame()
		}
	}

	openDialogue() {
		// Remove all dialogue options before adding the correct ones
		let dialogueOptions = document.getElementById("dialogue-options")
		while (dialogueOptions.hasChildNodes()) {
			dialogueOptions.removeChild(dialogueOptions.firstChild);
		}
		// Add all correct dialogue options
		let nextOptions = this.dialogueRoot.getChildren()
		for(var i = 0; i < nextOptions.length; i++) {
			dialogueOptions.appendChild(this.createOption(nextOptions[i].value.option))
		}
		// Add correct photo
		document.getElementById("dialogue-photo").src = this.photo
		// Show dialogue screen
		document.getElementById("dialogue").style.visibility = "visible"
		
	}

	createOption(text) {
		let highlight = document.createElement("span")
		highlight.classList.add("highlight")
		highlight.innerHTML = text
		let div = document.createElement("div")
		div.classList.add("dialogue-option")
		div.appendChild(highlight)
		console.log(div)
		return div
	}

	closeDialogue() {

	}

	chooseOption(option) {
		// option is an integer and represents the dialogue option that was selected

	}
}