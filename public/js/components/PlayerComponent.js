import Component from "../Component.js";

export default class MoveComponent extends Component {

	constructor() {
		super()
		window.addEventListener('keydown', function (e) {
			switch(e.key) {
			case "a":
				console.log("a Pressed")
					
			}
		})
		console.log("Sprite Component created")
	}

}