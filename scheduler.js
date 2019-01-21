/**
 * Class for storing schedule data and finding gaps for meetings
 */
class Scheduler {
  /**
   * Creates a scheduler instance with the combined schedule
   * @param {array} schedules - A 3d array containing user schedules
   */
  constructor(schedules) {
    Object.assign(this, {
      startOfDay: 9,
      endOfDay: 19
    });

    const schedulesInMinutes = this.convertScheduleToMinutes(schedules);
    const combinedSchedule = schedulesInMinutes.reduce(Scheduler.combineUserSchedules, null);

    this.combinedSchedule = combinedSchedule;
  }

  /**
   * Merges passed user schedules to identify only gaps in all three schedules
   * @param {array} sharedSchedule - Accumulater, null on start, assumed value of first schedule on iteration 1
   * @param {array} userSchedule - Current users schedule in minutes
   * @param {number} idx
   * @return {array} - Combined users schedule
   */
  static combineUserSchedules(sharedSchedule, userSchedule, idx) {
    if (idx === 0) return userSchedule;
    else {
      const combinedSchedules = userSchedule.reduce((sharedSched, currentMin, idx2) => {
        if (!currentMin) sharedSched[idx2] = currentMin;
        return sharedSched;
      }, sharedSchedule);
      return combinedSchedules;
    }
  }

  /**
   * Converts the the 3d array of user schedule arrays of strings into a 2d array of user schedules (arrays of booleans) - denoting minute by minute availability
   * @param {array} schedules - 3d array of user schedules containing arrays of strings
   * @return {array} - 2d array of booleans representing each user schedule in minutes
   */
  convertScheduleToMinutes(schedules) {
    return schedules.map((schedule) => {
      const dayInMinutes = this.getDayInMinutes();
      const timeIdxs = schedule.map((meeting) => meeting.map((time) => this.timeToIndex(time)));
      const populatedUserDayInMinutes = Scheduler.populateSchedule(timeIdxs, dayInMinutes);
      return populatedUserDayInMinutes;
    });
  }

  /**
   * Finds available gap in combined schedule for passed meeting length, calls self recursively to identify gap until no more available minutes are unchecked.
   * @param {number} meetingLength - Minute length of meeting as integer
   * @param {number} offset - Used for recursive calls to change search start
   * @return {number|null} - returns the index of the appropriate start time or null if none.
   */
  findGap(meetingLength, offset = 0) {
    const { combinedSchedule } = this;
    const gapStart = combinedSchedule.indexOf(true, offset);
    const slot = combinedSchedule.slice(gapStart, (gapStart + meetingLength));

    if (Scheduler.validateMeetingTime(slot, meetingLength)) return gapStart;
    else if (gapStart < 0) return null;
    else return this.findGap(meetingLength, gapStart + 1);
  }

  /**
   * Invokes findGap to find meeting slot, converts answer index to time string
   * @param {number} meetingLength - Minute length of meeting as integer
   * @return {string|null} - Time string for meeting start time or null if none
   */
  findMeetingSlot(meetingLength) {
    const meetingIdx = this.findGap(meetingLength);
    if (meetingIdx) return this.idxToTime(meetingIdx);
    else return null;
  }

  /**
   * Creates day as minutes array using start and endOfDay config in constructor.
   * @return {array} - array of length of minutes in day, all elements marked true for available
   */
  getDayInMinutes() {
    const { startOfDay, endOfDay } = this;
    const hrsInDay = endOfDay - startOfDay;
    const minutesInDay = hrsInDay * 60;
    const available = true;
    const dayInMinutes = Array.from({ length: minutesInDay }).fill(available);
    return dayInMinutes;
  }
  
  /**
   * Converts index to time string based on startOfDay in constructor config.
   * @param {number} idx - Index of time position
   * @return {string} - Time string for index
   */
  idxToTime(idx) {
    const { startOfDay } = this;
    const addHrs = Math.floor(idx / 60);
    const hrs = startOfDay + addHrs;
    const mins = idx - (addHrs * 60);
    return [hrs, mins]
      .map(Scheduler.to2DigitString)
      .join(':');
  }

  /**
   * Populates meetings into user day minutes array
   * @param {array} idxs - Array of index numbers corresponding to meeting starts and finishes
   * @param {array} userDayInMinutes - Empty user day array, all elements set to true for available
   * @return {array} - The filled user day array, some elements set to false for unavailable
   */
  static populateSchedule(idxs, userDayInMinutes) {
    const populatedSchedule = idxs.reduce((acc, [start, end]) => {
      const available = false;
      return acc.fill(available, start, end);
    }, userDayInMinutes);
    return populatedSchedule;
  }

  /**
   * Convert time string to index based on startOfDay in constructor config
   * @param {string} time - Time string to convert to index
   * @return {number} - Index corresponding to passed time string
   */
  timeToIndex(time) {
    const { startOfDay } = this;
    const [hrs, mins] = time.split(':').map(n => parseInt(n, 10));
    const idx = ((hrs - startOfDay) * 60) + mins;
    return idx;
  }

  /**
   * Converts number representation of minutes or hours to 2 digit string
   * @param {number} n - Number respresenting hours or minutes
   * @return {string} - 2 digit string
   */
  static to2DigitString(n) {
    return (n / 100).toFixed(2).toString().slice(-2);
  }
  
  /**
   * Validates that meeting slot is suitable by confirming so unavailable (false) minutes in window
   * @param {array} meetingSlot - array of length of meeting time taken from populated user schedule
   * @param {number} meetingLength - length of meeting in minutes integer
   * @return {boolean} - true (is valid meeting start) | false (invalid meeting start)
   */
  static validateMeetingTime(meetingSlot, meetingLength) {
    if (meetingSlot.filter(Boolean).length === meetingLength) return true;
    else return false;
  }
}

module.exports = Scheduler;