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

  makeRequest(person) {
    this.requests.push(person);
  }

  addRider(name) {
    this.riders.push(name);
  }

  addStop(floor) {
    this.stops.push(floor);
  }

  elevatorLifeCycle(person) {
    const { name, currentFloor, dropOffFloor, requestTime } = person;

    this.makeRequest(person);
    this.motionStatus = 'moving';
    this.direction    = this.elevatorDirection(currentFloor, dropOffFloor);
    this.currentFloor = currentFloor;
    this.addRider(name);
    this.addStop(this.currentFloor);
    this.getStops();
    this.riderExit(person);
    this.floorZero(requestTime);
  }

  floorZero(time) {
    if(!time){ return;}

    time.includes('am') ? this.currentFloor = 0 : this.currentFloor;
  }

  elevatorDirection(current, drop) {
    return current < drop ? 'up' : 'down';
  }

  riderExit(person) {
    const { dropOffFloor } = person;

    this.currentFloor = dropOffFloor;
    this.addStop(this.currentFloor);
    this.riders.shift();
    this.motionStatus = 'idle';
  }

  countFloors(stops) {
    let temp = 0;
    stops.unshift(0);

    for(let i = (stops.length - 1); i >= 1; i--) {
      temp = temp + Math.abs(stops[i] - stops[i-1]);
    }    
    return this.totalFloors = temp;
  }

  getStops() {
    this.countFloors(this.stops);
    
    return this.requests.reduce((arr, request) => {
      arr = [];
      arr.push(request.currentFloor, request.dropOffFloor);
      return arr;
    }, []);
  }

  reset() {
    this.constructor();
  }
}





