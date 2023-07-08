import AIComponent from "./AIComponent.js";
import { time, dayLength } from '../Clock.js'

export default class TestAIComponent extends AIComponent {

	constructor() {
		super()
		this.schedule = [[0, 2, this.defaultAction], [2, dayLength, this.defaultAction3]]
	}

	update(deltaTime) {
		super.update(deltaTime)
	}

	defaultAction3() {
		//console.log("Doing default action 3")
	}
}