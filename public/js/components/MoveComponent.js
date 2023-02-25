import Component from "../Component.js";
import { findPath } from "../world/Pathfinding.js";

export default class MoveComponent extends Component {

	// This class could definitly use some optimizations
	// It also should change how it gets the tileMap, maybe through the move command?

	constructor(tileMap) {
		super()
		// See above about tileMap problems
		this.tileMap = tileMap
		this.speed = 0.004
		this.moving = false
		this.tileWidth = this.tileMap.getTileWidth()
		console.log('Move Component Created')	
	}

	move(x, y) {
		// Converts the coords of the object to tileMap x and y coords
		this.curr = {
			x:this.parent.x/this.tileWidth, 
			y:this.parent.y/this.tileWidth
		}

		// Checks if the current position is already at target
		if(x === this.curr.x && y === this.curr.y) {
			return
		}

		// Checks if the path is not null before replacing the original path
		let tempPath = findPath(this.tileMap, this.curr.x, this.curr.y, x, y)
		if(tempPath === null) {
			return
		}
		this.path = tempPath

		this.target = {
			x:x, y:y
		}

		// Finds next node in path
		this.next = {
			x:this.path[0].getX(),
			y:this.path[0].getY()
		}
		this.nextNodeIndex = 0

		// Starts the update command
		this.moving = true
	}

	update(deltaTime) {
		if(this.moving) {
			if(this.path[this.nextNodeIndex].isObstructed() == true) {
				this.move(this.target.x, this.target.y)
				return
			}
			// Calculates the distance To Travel in one frame
			let distTT = this.speed * deltaTime
			while(true) {
				// Calculates the distance To Next Node from the current position
				let distTNN = {
					x:Math.abs(this.curr.x - this.next.x),
					y:Math.abs(this.curr.y - this.next.y)
				}
				// If the next node is reached, update the next node
				if(this.nodeIsReached(distTT, distTNN)) {
					// Update the current position to the next node
					this.curr.x = this.next.x
					this.curr.y = this.next.y
					// If this position is the target position, stop moving
					if(this.target.x === this.next.x && this.target.y === this.next.y) {
						this.moving = false
						this.updateParentPosition()
						return
					}
					// Update distance to travel to account for the movement to the next node 
					//(Maybe move this sqrt calc somewhere else, like before the nodeIsReached if)
					distTT - Math.sqrt(distTNN.x ** 2, distTNN.y ** 2)
					// Find the next next node
					this.nextNodeIndex++
					this.next.x = this.path[this.nextNodeIndex].getX()
					this.next.y = this.path[this.nextNodeIndex].getY()
				}
				else {
					break
				}
			}
			// The distance to travel is added to the current position
			let theta = Math.atan2(this.next.y - this.curr.y, this.next.x - this.curr.x)
			this.curr.x = this.curr.x + distTT * Math.cos(theta)
			this.curr.y = this.curr.y + distTT * Math.sin(theta)

			// Position is updated
			this.updateParentPosition()
		}
	}

	updateParentPosition() {
		this.parent.x = this.curr.x*this.tileWidth
		this.parent.y = this.curr.y*this.tileWidth
	}

	nodeIsReached(distTT, distTNN) {
		// If the distance to travel is greater or equal to the distance to the next node, return true
		// Or if the current position is equal to the next position
		if(distTT >= Math.sqrt(distTNN.x ** 2 + distTNN.y ** 2) || (this.curr.x === this.next.x && this.curr.y === this.next.y)) {
			return true
		}
		return false
	}
}