export default class Elevator {
  constructor(){
  	this.riders 			= [];
  	this.requests			= [];
  	this.currentFloor = 0;
  	this.totalFloors  = 0; 
  	this.stops 		    = [];
  	this.motionStatus = 'idle';
  	this.direction 	 	= '';
  }

  goToFloor(person) {
  	this.requests.push(person)

  	const { name, currentFloor, dropOffFloor } = person

  	this.motionStatus = 'moving';
  	this.currentFloor = currentFloor
    this.direction    = this.elevatorDirection(currentFloor, dropOffFloor)
    this.riders.push(name)
  	this.stops.push(this.currentFloor)
    this.getStops()
    this.currentFloor = dropOffFloor
    this.stops.push(this.currentFloor)
  	this.motionStatus = 'idle'
  	this.riderExit()
  }

  elevatorDirection(currentFloor, dropOffFloor) {
  	return currentFloor < dropOffFloor ? 'up' : 'down';
  }

  riderExit() {
  	return this.riders.shift()
  }

  // getTotalFloors(request) {

  // 	const { currentFloor, dropOffFloor } = request

  //   // WTF!?

  // 	this.totalFloors = Math.abs(this.currentFloor - currentFloor) + Math.abs(currentFloor - dropOffFloor)
  // }

  countFloors(array) {
    let temp = 0
    array.unshift(0)

    for(let i = (array.length - 1); i >= 1; i--) {
      temp = temp + Math.abs(array[i] - array[i-1])
    }

    console.log(temp)
    return this.totalFloors = temp
  }

  getStops() {
    this.countFloors(this.stops)
    
    const { currentFloor, dropOffFloor } = this.requests

    return this.requests.reduce((arr, request) => {
      arr = []

  		arr.push(request.currentFloor, request.dropOffFloor)
  		return arr
  	}, [])
  }

  reset() {
  	this.constructor()
  }
}





