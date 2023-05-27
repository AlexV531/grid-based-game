import Component from "../Component.js";
import { TILEWIDTH } from "../main.js";

export default class DetectorComponent extends Component {

	constructor(gameObject, x1, y1, x2, y2) {
		super()
		this.target = gameObject
		this.bounds = {
			xL:x1,
			xR:x2,
			yB:y1,
			yT:y2
		}
		this.detected = false
	}

	update(deltaTime) {
		if(this.target.x + TILEWIDTH >= this.bounds.xL && this.target.y + TILEWIDTH >= this.bounds.yB && this.target.x <= this.bounds.xR && this.target.y <= this.bounds.yT) {
			this.detected = true
		} else {
			this.detected = false
		}
		console.log(this.detected)
	}
}