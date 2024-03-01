// IMPORTS
import { fetchData } from './apiCalls';
import { calculateTotalSpent } from './costs';

// QUERY SELECTORS 
let container = document.querySelector(".container")
let body = document.querySelector("body")
let welcome = document.querySelector("#welcome-div")
let domName = document.querySelector("#name")
let pastTripsWidget = document.querySelector("#past-trips")
let pendingTripsWidget = document.querySelector("#pending-trips")
let noPastTrips = document.querySelector(".no-past-trips")
let noPendingTrips = document.querySelector(".no-pending-trips")
let pastGrid = document.querySelector(".past-grid")
let pendingGrid = document.querySelector(".pending-grid")
let totalSpent = document.querySelector("#total-spent")
let bookNowButton = document.querySelector(".book-now-button")
let bookingForm = document.querySelector(".form")
let pastBookButton = document.querySelector("#past-book-button")
let pendingBookButton = document.querySelector("#pending-book-button")
let costEstimate = document.querySelector("#cost-estimate")

// GLOBAL VARIABLES 
let currentUserID = "3"
let currentURL = "http://localhost:3001/api/v1/travelers/" + currentUserID

// EVENT LISTENERS
window.addEventListener("load", renderDom)
bookNowButton.addEventListener("click", displayForm)
pastBookButton.addEventListener("click", displayForm)
pendingBookButton.addEventListener("click", displayForm)

// DOM UPDATE FUNCTIONS
function renderDom() {
    fetchData(currentURL)
    .then(([userInfo, trips, destinations]) => {
        console.log("userInfo:", userInfo)
        console.log("trips:", trips)
        console.log("destinations:", destinations)
        let id = userInfo.id
        displayName(userInfo)
        displayPastTrips(id, trips, destinations)
        displayPendingTrips(id, trips, destinations)
        displayTotalSpent(id, trips, destinations)
    })
}

function displayForm() {
    container.classList.toggle("hidden")
    bookingForm.classList.toggle("hidden")

    if (bookNowButton.innerText === "Book Now!") {
        bookNowButton.innerText = "Back Home" 
    } else {
        bookNowButton.innerText = "Book Now!"
    }
}

// As a traveler:

// I should be able to make a trip request:
// I will select a date, duration, number of travelers and choose from a list of destinations
// After making these selections, I should see an estimated cost (with a 10% travel agent fee) for the trip.
// Once I submit the trip request, it will show on my dashboard as “pending” so that the travel agency can approve or deny it.

function displayName({name}) {
    domName.innerText = name
}

function displayTotalSpent(id, {trips}, {destinations}) {
    totalSpent.innerText = `You have spent a total of $${calculateTotalSpent(id, {trips}, {destinations})} with TravelTracker. Users save an average of 18% when booking with TravelTracker`
}

function displayPastTrips(id, {trips}, {destinations}) {
    const pastTrips = trips.filter((trip) => {
        return trip.userID === id && trip.status === "approved"
    })

    if (pastTrips.length) {
        pastTrips.forEach((trip) => {
            trip.destinationName = destinations.find(destination => {
                return destination.id === trip.destinationID
            }).destination
            trip.image = destinations.find(destination => {
                return destination.id === trip.destinationID
            }).image
        })
        console.log('PAST TRIPS:', pastTrips)
    
        pastTrips.forEach((trip) => {
            pastGrid.innerHTML += `<div class="individual-trips">
                                        <h3>${trip.destinationName}</h3>
                                        <img class="trip-image" src=${trip.image} alt="picture of ${trip.destinationName}"
                                        <p>${trip.date}</p>
                                        <p>Party of ${trip.travelers}</p
                                    </div>`
        })
    } else {
        noPastTrips.classList.remove('hidden')
    }
}

function displayPendingTrips(id, {trips}, {destinations}) {
    const pendingTrips = trips.filter((trip) => {
        return trip.userID === id && trip.status !== "approved"
    })

    if (pendingTrips.length) {
        pendingTrips.forEach((trip) => {
            trip.destinationName = destinations.find(destination => {
                return destination.id === trip.destinationID
            }).destination
            trip.image = destinations.find(destination => {
                return destination.id === trip.destinationID
            }).image
        })
        console.log('PENDING TRIPS:', pendingTrips)
    
        pendingTrips.forEach((trip) => {
            pendingGrid.innerHTML += `<div>
                                        <h3>${trip.destinationName}</h3>
        
                                        <p>${trip.date}</p>
                                        <p>Party of ${trip.travelers}</p
                                    </div>`
        })

    } else {
        noPendingTrips.classList.remove('hidden')
    }
}


