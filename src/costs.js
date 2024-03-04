function calculateTotalSpent(id, {trips}, {destinations}) {
    let total = 0;
    const array = trips.filter((trip) => {
        return trip.userID === id && trip.status === "approved" && trip.date.includes("2022");
    });

    if (array.length) {
        array.forEach((trip) => {
            let destination = destinations.find((destination) => {
                return trip.destinationID === destination.id
            })
    
            total += ((trip.travelers * destination.estimatedFlightCostPerPerson) + (trip.travelers * trip.duration * destination.estimatedLodgingCostPerDay))
        });
    
        return total * 1.1;
    } else {
        return `You haven't booked any trips with us this year!`;
    } 
}

function calculateTripCost(destinationID, numDays, numTravelers, {destinations}) {
    const destination = destinations.find((destination) => {
        return destination.id === destinationID;
    })

    if (destination) {
        return Math.round(((numTravelers * destination.estimatedFlightCostPerPerson) + (numDays * numTravelers * destination.estimatedLodgingCostPerDay)) * 1.1);
    } else {
        return `I'm sorry! Travel Trackers does not service that destination at this time.`;
    }
}


export {
    calculateTotalSpent,
    calculateTripCost
 };