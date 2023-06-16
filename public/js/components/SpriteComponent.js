import Component from "../Component.js"

export default class SpriteComponent extends Component {

	constructor(sprite, pos, width, height) {
		super()
		this.show = true
		this.sprite = sprite
		this.pos = pos
		this.width = width
		this.height = height
		console.log("Sprite Component created")
		console.log(this.sprite)
		this.opacity = 1
	}
}