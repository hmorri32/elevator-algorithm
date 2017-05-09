require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert   = require('chai').assert;
const Elevator = require('../elevator').default;
const Person   = require('../person').default;

describe('Elevator', function() {
  let elevator = new Elevator();

  afterEach(function() {
    elevator.reset();
  });

  it('should bring a rider to a floor above their current floor', () => {
    let person = new Person('Brittany', 2, 5)

    elevator.goToFloor(person);

    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [2, 5]);

    elevator.getTotalFloors(person)
    assert.equal(elevator.totalFloors, 6)
  });

  it('should bring a rider to a floor below their current floor', () => {
    let person = new Person('Brittany', 8, 3)

    elevator.goToFloor(person);

    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [8, 3]);
  });

  it('should calculate amount of floors traversed going up', () => {
    let person = new Person('Brittany', 2, 5)

    elevator.goToFloor(person)

    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [2, 5]);

    elevator.getTotalFloors(person)

    assert.equal(elevator.totalFloors, 6)
  })

  it('should calculate amount of floors traversed going down', () => {
    let person = new Person('Brittany', 8, 3)

    elevator.goToFloor(person)

    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [8, 3]);

    elevator.getTotalFloors(person)

    assert.equal(elevator.totalFloors, 10)
  })

  it('should reset', () => {
    let person = new Person('suhDude', 5,  2);

    elevator.goToFloor(person);

    assert.equal(elevator.currentFloor, 2);
    assert.deepEqual(elevator.getStops(), [5, 2]);
    assert.equal(elevator.totalFloors, 6);

    elevator.reset();

    assert.equal(elevator.currentFloor, 0);
    assert.deepEqual(elevator.getStops(), []);
    assert.equal(elevator.totalFloors, 0);
    assert.deepEqual(elevator.riders, []);
    assert.deepEqual(elevator.requests, []);
  });


});

describe('elveator unit tests', () => {
  it('testing reset', () => {

  })
})


















