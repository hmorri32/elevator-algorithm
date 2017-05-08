require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert   = require('chai').assert;
const Elevator = require('../elevator').default;

describe('Elevator', function() {
  let elevator = new Elevator();

  afterEach(function() {
    elevator.reset();
  });

  it('should bring a rider to a floor above their current floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 };

    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.motionStatus, 'idle');
    assert.equal(elevator.getStops(), [2, 5]);
  });

  it('should bring a rider to a floor below their current floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 8, dropOffFloor: 3 };
    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.motionStatus, 'idle');
    assert.equal(elevator.getStops(), [8, 3]);
  });
});
