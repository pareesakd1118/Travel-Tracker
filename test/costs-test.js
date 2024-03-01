import chai from 'chai';
import { tripsSampleSet, costSampleSet } from '../src/data/costs-sample-data'; 
import { calculateTotalSpent } from '../src/costs'; 
const expect = chai.expect;

describe('costs-test.js', function() { 
  describe('calculate total amount user has spent', function() {
    it('should calculate the user’s total amount spent, including 10% agents fee', function() {
      const user1TotalSpent = calculateTotalSpent(1, tripsSampleSet, costSampleSet);
      const user2TotalSpent = calculateTotalSpent(2, tripsSampleSet, costSampleSet);

      expect(user1TotalSpent).to.equal(4686);
      expect(user2TotalSpent).to.equal(16797);
    });

    it('should return a message if the user is new', function(){
      const user3TotalSpent = calculateTotalSpent(3, tripsSampleSet, costSampleSet);

      expect(user3TotalSpent).to.equal(`You haven't taken any trips with us yet!`)
    })
  });

  describe('calculate sleep hours or sleep quality average', function() {
    it.skip('should calculate the user’s average number of hours slept or sleep quality per day', function() {
      const user1HoursAvg = calculateAvgSleepData(1, testSleepData, 'hoursSlept');
      const user2HoursAvg = calculateAvgSleepData(2, testSleepData, 'hoursSlept');
      const user1QualityAvg = calculateAvgSleepData(1, testSleepData, 'sleepQuality');
      const user2QualityAvg = calculateAvgSleepData(2, testSleepData, 'sleepQuality');

      expect(user1HoursAvg).to.equal('7.03');
      expect(user2HoursAvg).to.equal('8.34');
      expect(user1QualityAvg).to.equal('3.53');
      expect(user2QualityAvg).to.equal('3.01');
    });

    it.skip('should return a message if the user is new', function(){
      const user3Avg = calculateAvgSleepData(3, testSleepData, 'hoursSlept');

      expect(user3Avg).to.equal(`You do not have any data yet.`)
    })
  });
})

