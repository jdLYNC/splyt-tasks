const { expect } = require('chai');
const Scheduler = require('../scheduler');

describe('Scheduler', () => {
  
  let scheduler = null;

  before(() => {
    const schedules = [
      [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
      [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
      [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
    ];

    scheduler = new Scheduler(schedules);
  });

  it('should be able to find the earliest meeting time', () => {
    expect(scheduler.findMeetingSlot(60)).to.equal('12:15');
  });

});