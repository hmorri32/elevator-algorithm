/* eslint-disable */

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

    elevator.elevatorLifeCycle(person);

    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [2, 5]);

    assert.equal(elevator.totalFloors, 5)
  });

  it('should bring a rider to a floor below their current floor', () => {
    let person = new Person({ name:'Brittany',currentFloor: 8, dropOffFloor: 3})

    elevator.elevatorLifeCycle(person);

    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [8, 3]);
  });

  it('should calculate amount of floors traversed going up', () => {
    let person = new Person({name:'Brittany', currentFloor: 2, dropOffFloor: 5})

    elevator.elevatorLifeCycle(person)

    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [2, 5]);


    assert.equal(elevator.totalFloors, 5)
  })

  it('should calculate amount of floors traversed going down', () => {
    let person = new Person({ name:'Brittany',currentFloor: 8, dropOffFloor: 3})
    elevator.elevatorLifeCycle(person)

    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [8, 3]);

    assert.equal(elevator.totalFloors, 13)
  })

  it('should reset', () => {
    let person = new Person({name: 'suhDude',currentFloor: 5, dropOffFloor: 2});

    elevator.elevatorLifeCycle(person);

    assert.equal(elevator.currentFloor, 2);
    assert.deepEqual(elevator.getStops(), [5, 2]);
    assert.equal(elevator.totalFloors, 8);

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

    elevator.elevatorLifeCycle(bob);
    assert.deepEqual(elevator.getStops(), [5, 3]);
    assert.equal(elevator.currentFloor, 3)

    elevator.elevatorLifeCycle(sue);
    assert.deepEqual(elevator.getStops(), [7, 1]);
    assert.equal(elevator.currentFloor, 1)

  });

  it('should ascertain elevator direction going up', () => {
    let person = new Person({ name: 'suhDude',currentFloor: 2, dropOffFloor: 10 })
    
    elevator.elevatorLifeCycle(person)
    assert.equal(elevator.direction, 'up')
    assert.equal(elevator.currentFloor, 10)
  })

  it('should ascertain elevator direction going down', () => {
    let person = new Person({ name: 'suhDude',currentFloor: 10, dropOffFloor: 2 })
    
    elevator.elevatorLifeCycle(person)
    assert.equal(elevator.direction, 'down')
    assert.equal(elevator.currentFloor, 2)
  })

  it('should allow a rider to exit the elevator', () => {
    let person = new Person({ name: 'suhDude',currentFloor: 10, dropOffFloor: 2 })

    elevator.elevatorLifeCycle(person)

    assert.equal(elevator.riders.length, 0)
  })

  it('LVL4 - should allow A to go up, then B to go up, then count stops and totalFloors', () => {
    let sallyMcgee = new Person({ 
      name: 'sally', currentFloor: 1, dropOffFloor: 5
    })
    let billyBob = new Person({
      name: 'billy', currentFloor: 2, dropOffFloor: 6
    })
    elevator.elevatorLifeCycle(sallyMcgee)

    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [1, 5]);
    assert.equal(elevator.totalFloors, 5)

    elevator.elevatorLifeCycle(billyBob)
    assert.equal(elevator.currentFloor, 6)
    assert.equal(elevator.motionStatus, 'idle')
    assert.deepEqual(elevator.getStops(), [2, 6]);
    assert.equal(elevator.totalFloors, 12)
    assert.equal(elevator.stops.length, 8)
  })

  it('LVL4 - should allow A to go up, then B to go down, then count stops and totalFloors', () => {
    let sallyMcgee = new Person({ 
      name: 'sally', currentFloor: 1, dropOffFloor: 5
    })
    let billyBob = new Person({
      name: 'billy', currentFloor: 7, dropOffFloor: 2
    })

    elevator.elevatorLifeCycle(sallyMcgee)

    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [1, 5]);
    assert.equal(elevator.totalFloors, 5)

    elevator.elevatorLifeCycle(billyBob)
    
    assert.equal(elevator.currentFloor, 2)
    assert.equal(elevator.motionStatus, 'idle')
    assert.deepEqual(elevator.getStops(), [7, 2]);
    assert.equal(elevator.totalFloors, 12)
    assert.equal(elevator.stops.length, 8)
  })

  it('LVL4 - should allow A to go down, then B to go up, then count stops and totalFloors', () => {
    let sallyMcgee = new Person({ 
      name: 'sally', currentFloor: 10, dropOffFloor: 5
    })
    let billyBob = new Person({
      name: 'billy', currentFloor: 2, dropOffFloor: 7
    })

    elevator.elevatorLifeCycle(sallyMcgee)

    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [10, 5]);
    assert.equal(elevator.totalFloors, 15)

    elevator.elevatorLifeCycle(billyBob)

    assert.equal(elevator.currentFloor, 7)
    assert.equal(elevator.motionStatus, 'idle')
    assert.deepEqual(elevator.getStops(), [2, 7]);
    assert.equal(elevator.totalFloors, 23)
    assert.equal(elevator.stops.length, 8)

  })

  it('LVL4 - should allow A to go down, then B to go down, then count stops and totalFloors', () => {
    let sallyMcgee = new Person({ 
      name: 'sally', currentFloor: 10, dropOffFloor: 5
    })
    let billyBob = new Person({
      name: 'billy', currentFloor: 5, dropOffFloor: 1
    })

    elevator.elevatorLifeCycle(sallyMcgee)

    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [10, 5]);
    assert.equal(elevator.totalFloors, 15)

    elevator.elevatorLifeCycle(billyBob)

    assert.equal(elevator.currentFloor, 1)
    assert.equal(elevator.motionStatus, 'idle')
    assert.deepEqual(elevator.getStops(), [5, 1]);
    assert.equal(elevator.totalFloors, 19)
    assert.equal(elevator.stops.length, 8)
  })

  it('elevator should return to lobby if before 12pm', () => {
    let chillGuy = new Person({
      name: 'chad', currentFloor: 5, dropOffFloor: 2, requestTime: '6am'
    })

    elevator.elevatorLifeCycle(chillGuy)
    assert.equal(elevator.currentFloor, 0)
  })

  it('elevator should not return to lobby if after 12pm', () => {
    let coolDude = new Person({
      name: 'rodrigo', currentFloor: 5, dropOffFloor: 10, requestTime: '6pm'
    })

    elevator.elevatorLifeCycle(coolDude)
    assert.equal(elevator.currentFloor, 10)
  })

});

describe('Unit tests', () => {
  let elevator  = new Elevator();
  let coolGuy   = new Person({
    name: 'ricoSuave', currentFloor: 2, dropOffFloor: 1
  })

  afterEach(function() {
    elevator.reset();
  });

  it('should make a request', () => {
    elevator.makeRequest(coolGuy)
    assert.equal(elevator.requests.length, 1)
  })

  it('should add a rider', () => {
    let rico = coolGuy.name
    elevator.addRider(rico)
    assert.equal(elevator.riders, 'ricoSuave')
  })

  it('should add a stop', () => {
    let ricosFloor = coolGuy.dropOffFloor
    elevator.addStop(ricosFloor)

    assert.equal(elevator.stops, 1)
  })

  it('should run through the elevatorLifeCycle', () => {
    elevator.elevatorLifeCycle(coolGuy)

    assert.equal(elevator.currentFloor, 1);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [2, 1]);
    assert.equal(elevator.totalFloors, 3)
  })

  it('should floorZero if time includes AM', () => {
    let punctualDude = new Person({ requestTime: '6am' })
    let coolGuysTime = punctualDude.requestTime;

    elevator.floorZero(coolGuysTime)
    assert.equal(elevator.currentFloor, 0)
  })

  it('should ascertain yung elevator direction', () => {
    const { currentFloor, dropOffFloor } = coolGuy
    
    assert.equal(elevator.elevatorDirection(currentFloor, dropOffFloor), 'down')
  })

  it('should allow rider to exit elevator', () => {
    elevator.riderExit(coolGuy)
    assert.equal(elevator.riders.length, 0)
  })

  it('should count floors', () => {
    let stops = [1, 4, 2, 1, 0]
    assert.equal(elevator.countFloors(stops), 8)
  })

  it('should get stops', () => {
    elevator.elevatorLifeCycle(coolGuy)

    assert.deepEqual(elevator.getStops(), [2, 1])
  })
})


















