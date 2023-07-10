import Component from "../Component.js";
import { keysPressed, mouseClicked } from "../InputManager.js";
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
			//pauseGame()
		}

		if(mouseClicked && window.dialogue.optionChosen != -1) {

			this.chooseOption(window.dialogue.optionChosen)

			window.dialogue.optionChosen = -1
		}
	}

	openDialogue() {

		// IMPORTANT PART: MAY NEED TO CHANGE!!!!
		this.currentOption = this.dialogueRoot

		// Remove all dialogue options before adding the correct ones
		let dialogueOptions = document.getElementById("dialogue-options")
		while (dialogueOptions.hasChildNodes()) {
			dialogueOptions.removeChild(dialogueOptions.firstChild);
		}
		// Add all correct dialogue options
		let nextOptions = this.dialogueRoot.getChildren()
		for(var i = 0; i < nextOptions.length; i++) {
			dialogueOptions.appendChild(this.createOption(nextOptions[i].value.option, i))
		}
		// Add correct photo
		document.getElementById("dialogue-photo").src = this.photo
		// Add initial "response" (not a rersponse because the character talks first but whatever)
		// (I guess it is kinda a response because its a response to the player clicking on the character)
		document.getElementById("dialogue-response").innerHTML = this.dialogueRoot.value.response
		// Show dialogue screen
		document.getElementById("dialogue").style.visibility = "visible"
		
	}

	createOption(text, optionNum) {
		let highlight = document.createElement("span")
		highlight.classList.add("highlight")
		highlight.innerHTML = text
		let div = document.createElement("div")
		div.classList.add("dialogue-option")
		div.appendChild(highlight)
		div.addEventListener("click", function() { window.dialogue.optionChosen = optionNum })
		//console.log(div)
		return div
	}

	closeDialogue() {
		console.log("Close dialogue")
		document.getElementById("dialogue").style.visibility = "hidden"
	}

	chooseOption(option) {
		// option is an integer and represents the dialogue option that was selected
		console.log(option)

		// New current option chosen
		this.currentOption = this.currentOption.getChildren()[option]
		let nextOptions = this.currentOption.getChildren()
		// If no new options
		if(nextOptions.length <= 0) {
			this.closeDialogue()
		}

		// Remove all dialogue options before adding the correct ones
		let dialogueOptions = document.getElementById("dialogue-options")
		while (dialogueOptions.hasChildNodes()) {
			dialogueOptions.removeChild(dialogueOptions.firstChild);
		}
		// Add all correct dialogue options
		for(var i = 0; i < nextOptions.length; i++) {
			dialogueOptions.appendChild(this.createOption(nextOptions[i].value.option, i))
		}
		// Change response
		document.getElementById("dialogue-response").innerHTML = this.currentOption.value.response
	}
}