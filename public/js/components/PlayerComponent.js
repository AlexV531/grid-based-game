import Component from "../Component.js";
import { keys } from "../InputManager.js"


export default class PlayerComponent extends Component {

	constructor() {
		super()
		this.speed = 0.0015;
		console.log("Player Component created")
	}

	update(deltaTime) {
		this.parent.x = this.parent.x + (keys.d - keys.a) * this.speed * deltaTime
		this.parent.y = this.parent.y + (keys.w - keys.s) * this.speed * deltaTime
	}

}