import DetectorComponent from "./DetectorComponent.js";

export default class DoorComponent extends DetectorComponent {

	constructor(gameObject, x1, y1, x2, y2, spriteComponent, closedIndex, openIndex) {
		super(gameObject, x1, y1, x2, y2)
		this.spriteComponent = spriteComponent
		this.openIndex = openIndex
		this.closedIndex = closedIndex
		this.open = false
	}
    
	update(deltaTime) {
		super.update(deltaTime)
		if(this.spriteComponent != null) {
			if(this.detected) {
				this.spriteComponent.sprite = this.openIndex
				this.open = true
			} else {
				this.spriteComponent.sprite = this.closedIndex
				this.open = false
			}
		}
	}
}