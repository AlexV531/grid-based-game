import DetectorComponent from "./DetectorComponent.js";
import SpriteComponent from "./SpriteComponent.js";


export default class RoofComponent extends DetectorComponent {
	constructor(gameObject, x1, y1, x2, y2, spriteComponent) {
		super(gameObject, x1, y1, x2, y2)
		this.spriteComponent = spriteComponent
	}

	// status is true or false
	show(status) {
		if(this.spriteComponent instanceof SpriteComponent) {
			this.spriteComponent.show = status
		}
	}
}