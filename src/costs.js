function calculateTotalSpent(id, {trips}, {destinations}) {
    let total = 0;
    const array = trips.filter((trip) => {
        return trip.userID === id && trip.status === "approved" && trip.date.includes("2022");
    });

    if (array.length) {
        array.forEach((trip) => {
            let destination = destinations.find((destination) => {
                return trip.destinationID === destination.id;
            })
    
            total += ((trip.travelers * destination.estimatedFlightCostPerPerson) + (trip.travelers * trip.duration * destination.estimatedLodgingCostPerDay));
        });
    
        return total * 1.1;
    } else {
        return `<p>You haven't booked any trips with <span>TravelTracker</span> this year!</p>`;
    } 
}

function calculateTripCost(destinationID, numDays, numTravelers, {destinations}) {
    const destination = destinations.find((destination) => {
        return destination.id === destinationID;
    })

    if (destination) {
        return Math.round(((numTravelers * destination.estimatedFlightCostPerPerson) + (numDays * numTravelers * destination.estimatedLodgingCostPerDay)) * 1.1);
    } else {
        return `I'm sorry! TravelTracker does not service that destination at this time.`;
    }
}

function reformatDate(date) {
    const array = date.split("");
    const firstHalf = array.slice(-5).join("");
    const secondHalf = array.slice(0, 4).join("");
    const reformattedDate = firstHalf + "/" + secondHalf;

    if (array[4] === "/" && array[7] === "/") {
        return reformattedDate;
    } else {
        return date;
    }
}

function reformatDestination(destination) {
    const array = destination.split(",");

    if (array.length > 1) {
        return `${array[0]},<br>${array[1]}`;
    } else {
        return destination; 
    }
}

export {
    calculateTotalSpent,
    calculateTripCost,
    reformatDate,
    reformatDestination
 };