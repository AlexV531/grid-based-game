import Component from "../Component.js"

export default class SpriteComponent extends Component {

	constructor(sprite) {
		super()
		this.sprite = sprite
		console.log("Sprite Component created")
		console.log(this.sprite)
	}
}