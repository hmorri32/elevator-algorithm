export default class Person {
	constructor({ name, currentFloor, dropOffFloor, requestTime }) {
		this.name         = name;
		this.currentFloor = currentFloor;
		this.dropOffFloor = dropOffFloor;
		this.requestTime  = requestTime; 
	}
}