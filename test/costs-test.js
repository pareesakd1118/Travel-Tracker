import chai from 'chai';
import { tripsSampleSet, costSampleSet } from '../src/data/costs-sample-data'; 
import { calculateTotalSpent, calculateTripCost } from '../src/costs'; 
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

  describe('calculate cost of trip', function() {
    it('should calculate the total cost of a described trip', function() {
      const trip1Cost = calculateTripCost(49, 7, 2, costSampleSet);
      const trip2Cost = calculateTripCost(3, 5, 4, costSampleSet);

      expect(trip1Cost).to.equal(2530);
      expect(trip2Cost).to.equal(6050);
    });

    it('should return a message if the location is not included', function(){
      const trip3Cost = calculateTripCost(101, 8, 1, costSampleSet);

      expect(trip3Cost).to.equal(`I'm sorry! Travel Trackers does not service that destination at this time.`)
    })
  });
})

