import DetectorComponent from "./DetectorComponent.js";
import SpriteComponent from "./SpriteComponent.js";


export default class RoofComponent extends DetectorComponent {
	constructor(gameObject, x1, y1, x2, y2) {
		super(gameObject, x1, y1, x2, y2)
		this.spriteComponent = 0
	}

	update(deltaTime) {
		super.update(deltaTime)
		if(this.spriteComponent == 0) { // Initialize sprite component
			this.spriteComponent = this.parent.getComponent(SpriteComponent)
		}
		if(this.spriteComponent != null) {
			if(this.detected) {
				this.spriteComponent.show = false
			} else {
				this.spriteComponent.show = true
			}
		}
	}
}