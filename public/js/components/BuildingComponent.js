import Component from "../Component.js";


export default class RoofComponent extends Component {

	constructor(rooves, doors, windows) {
		super()
		this.rooves = rooves
		this.doors = doors
		this.windows = windows
		this.detected
	}

	update() {
		
		// Check child detectors
		let undetected = true
		for(let i = 0; i < this.rooves.length; i++) {
			if(this.rooves[i].detected) {
				this.detected = true
				undetected = false
			}
		}
		// Check if no detectors detect the player
		if(undetected) {
			this.detected = false
		}
		// Update the roof sprite components
		if(this.detected) {
			for(let i = 0; i < this.rooves.length; i++) {
				this.rooves[i].show(false)
			}
		} else {
			for(let i = 0; i < this.rooves.length; i++) {
				this.rooves[i].show(true)
			}
		}
	}
	

}