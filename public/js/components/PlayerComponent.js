import Component from "../Component.js";


export default class PlayerComponent extends Component {

	constructor() {
		super()

		window.addEventListener('keydown', this.handleKeyDown);
		console.log("Player Component created")
	}

}