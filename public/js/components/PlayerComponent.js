import Component from "../Component.js";
import { mouseTile, mouseClicked } from "../InputManager.js"
import { isDialoguePaused } from "../main.js";
import MoveComponent from "./MoveComponent.js";


export default class PlayerComponent extends Component {

	constructor() {
		super()
		//this.speed = 0.0015;
		console.log("Player Component created")
	}

	update(deltaTime) {
		if(mouseClicked && !isDialoguePaused()) {
			this.parent.getComponent(MoveComponent).move(mouseTile.x, mouseTile.y)
		}
	}
}