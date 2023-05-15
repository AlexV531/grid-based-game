
import Component from "../Component.js";
import { time, dayLength } from "../Clock.js";

export default class AIComponent extends Component {

	constructor() {
		super()
		// Every AI component has at least one schedule, a list of actions with a start time and an end time
		// Default action is to stand still
		// Actions can be added in the specific AI Component (ie. EnemyAIComponent)
		// Maybe add a day system in the future (days are either built into the schedule or the schedule is changed based on the day)
		// schedule[x][0] = startTime
		// schedule[x][1] = endTime
		// schedule[x][2] = action
		this.schedule = [[0, 2, "Action 1"], [2, dayLength, "Action 2"]]
	}

	changeSchedule(newSchedule) {
		// Maybe add a checker to make sure its a valid schedule
		// Definition of valid: each start time is less than day length,
		// each end time is less than or equal to day length,
		// there is no overlap between pairs of start and end times
		this.schedule = newSchedule
	}

	getSchedule() {
		return this.schedule
	}

	update(deltaTime) {
		// Find the correct schedule item based on the time
		for(let i = 0; i < this.schedule.length; i++) {
			if(this.schedule[i][0] <= time && time < this.schedule[i][1]) {
				// Do action in that schedule item
				//console.log(this.schedule[i][2])
				break
			}
		}
	}
}