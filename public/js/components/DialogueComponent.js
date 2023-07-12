import Component from "../Component.js";
import { keysPressed, mouseClicked } from "../InputManager.js";
import { dialoguePause, dialogueUnpause, isDialoguePaused } from "../main.js";

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
		this.thisDialogueActive = false
		this.responsePos = 0
		this.stringAnimationDelay = 30 // ms
		this.currStringAnimationTime = 0
	}

	update(deltaTime) {
		// Temporary Dialogue box opening
		if(keysPressed.l) {
			this.openDialogue()
		}

		// If in this object's dialogue menu
		if(this.thisDialogueActive) {
		// Choosing an option
			if(mouseClicked && window.dialogue.optionChosen != -1) {
				if(this.responsePos < this.currentOption.value.response.length) {
					this.skipDialogueAnimation()
				} else {
					this.chooseOption(window.dialogue.optionChosen)
					window.dialogue.optionChosen = -1
				}
			}
			// Skip response animation (Also should activate with more keys in the future)
			else if(mouseClicked && this.responsePos < this.currentOption.value.response.length) {
				this.skipDialogueAnimation()
			}

			// Response animation
			if(this.currentOption.value.response != null && this.responsePos < this.currentOption.value.response.length) {
				// If delay reached, add a letter to the response
				this.currStringAnimationTime += deltaTime
				if(this.currStringAnimationTime > this.stringAnimationDelay) {
					this.currStringAnimationTime = 0
					this.responsePos++
					document.getElementById("dialogue-response").innerHTML = this.currentOption.value.response.substring(0, this.responsePos)
				}
			}
		}
		
	}

	skipDialogueAnimation() {
		this.responsePos = this.currentOption.value.response.length
		document.getElementById("dialogue-response").innerHTML = this.currentOption.value.response
	}

	openDialogue() {

		// If another dialogue menu open don't run
		if(isDialoguePaused()) {
			return
		}

		console.log("Open dialogue")
		this.thisDialogueActive = true
		dialoguePause()

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
		document.getElementById("dialogue-response").innerHTML = ""
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
		this.thisDialogueActive = false
		dialogueUnpause()
	}

	chooseOption(option) {
		// option is an integer and represents the dialogue option that was selected

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
		// Reset response animation
		this.startResponseAnimation()
	}

	startResponseAnimation() {
		this.responsePos = 0
		this.currStringAnimationTime = 0
		document.getElementById("dialogue-response").innerHTML = ""
	}
}