
export let time = 0;
export let day = 0;

export const dayLength = 10

// Maybe add an event system where every day change/important time change and event is sent out

export function updateClock(deltaTime) {
	time += deltaTime/1000
	//console.log(time)
	if(time >= dayLength) {
		time -= dayLength
		day++
		//console.log(day)
	}
}