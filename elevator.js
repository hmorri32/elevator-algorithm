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

  goToFloor(person){
  	this.requests.push(person)

  	const { name, currentFloor, dropOffFloor } = person

  	this.motionStatus = 'moving';
  	this.currentFloor = currentFloor
    this.direction    = this.elevatorDirection(currentFloor, dropOffFloor)
    this.riders.push(name)
  	this.stops.push(this.currentFloor)
    this.getStops()
  	this.motionStatus = 'idle'
  	this.riderExit()
  }

  elevatorDirection(currentFloor, dropOffFloor) {
  	return currentFloor < dropOffFloor ? 'up' : 'down';
  }

  riderExit() {
  	return this.riders.shift()
  }

  getTotalFloors(request) {

  	const { currentFloor, dropOffFloor } = request

    // WTF!?

  	this.totalFloors = Math.abs(this.currentFloor - currentFloor) + Math.abs(currentFloor - dropOffFloor)

  	this.currentFloor = dropOffFloor
  }

  getStops() {
    console.log(this.totalFloors)
    const { currentFloor, dropOffFloor } = this.requests

    return this.requests.reduce((arr, request) => {
      arr = []

      this.getTotalFloors(request)

  		arr.push(request.currentFloor, request.dropOffFloor)
  		return arr
  	}, [])
  }

  reset(){
  	this.constructor()
  }
}





