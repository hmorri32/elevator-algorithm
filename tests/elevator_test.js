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
    let person = new Person({name:'Brittany',currentFloor: 2, dropOffFloor: 5})

    elevator.goToFloor(person);

    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [2, 5]);

    elevator.getTotalFloors(person)
    assert.equal(elevator.totalFloors, 6)
  });

  it('should bring a rider to a floor below their current floor', () => {
    let person = new Person({ name:'Brittany',currentFloor: 8, dropOffFloor: 3})

    elevator.goToFloor(person);

    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [8, 3]);
  });

  it('should calculate amount of floors traversed going up', () => {
    let person = new Person({name:'Brittany', currentFloor: 2, dropOffFloor: 5})

    elevator.goToFloor(person)

    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [2, 5]);

    elevator.getTotalFloors(person)

    assert.equal(elevator.totalFloors, 6)
  })

  it('should calculate amount of floors traversed going down', () => {
    let person = new Person({ name:'Brittany',currentFloor: 8, dropOffFloor: 3})
    elevator.goToFloor(person)

    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [8, 3]);

    elevator.getTotalFloors(person)

    assert.equal(elevator.totalFloors, 10)
  })

  it('should reset', () => {
    let person = new Person({name: 'suhDude',currentFloor: 5, dropOffFloor: 2});

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

  it('getStops should deliver a person, reset, then deliver the next', () => {
    let bob  = new Person({
      name: 'Brittany', currentFloor: 5,dropOffFloor: 3
    });

    let sue = new Person({
      name: 'Robbie', currentFloor: 7,  dropOffFloor: 1
    });

    elevator.goToFloor(bob);
    assert.deepEqual(elevator.getStops(), [5, 3]);
    assert.equal(elevator.currentFloor, 3)
    elevator.goToFloor(sue);
    assert.deepEqual(elevator.getStops(), [7, 1]);
    assert.equal(elevator.currentFloor, 1)

  });

  it('should ascertain elevator direction going up', () => {
    let person = new Person({ name: 'suhDude',currentFloor: 2, dropOffFloor: 10 })
    
    elevator.goToFloor(person)
    assert.equal(elevator.direction, 'up')
    assert.equal(elevator.currentFloor, 10)
  })

  it('should ascertain elevator direction going down', () => {
    let person = new Person({ name: 'suhDude',currentFloor: 10, dropOffFloor: 2 })
    
    elevator.goToFloor(person)
    assert.equal(elevator.direction, 'down')
    assert.equal(elevator.currentFloor, 2)
  })

  it('should allow a rider to exit the elevator', () => {
    let person = new Person({ name: 'suhDude',currentFloor: 10, dropOffFloor: 2 })

    elevator.goToFloor(person)
    
    assert.equal(elevator.riders.length, 0)
  })


});


















