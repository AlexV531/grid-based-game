import Component from "../Component.js";
import { TILEWIDTH } from "../main.js";

export default class DetectorComponent extends Component {

	constructor(gameObjects, x1, y1, x2, y2) {
		super()
		this.targets = gameObjects
		this.bounds = {
			xL:x1,
			xR:x2,
			yB:y1,
			yT:y2
		}
		this.detected = false
	}

	update(deltaTime) {
		for(let i = 0; i < this.targets.length; i++) {
			if(this.targets[i].x + TILEWIDTH > this.bounds.xL && this.targets[i].y + TILEWIDTH > this.bounds.yB && this.targets[i].x < this.bounds.xR && this.targets[i].y < this.bounds.yT) {
				this.detected = true
				break
			} else {
				this.detected = false
			}
		}
	}
}