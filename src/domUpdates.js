// IMPORTS
import { fetchData } from './apiCalls';


// QUERY SELECTORS 
let welcome = document.querySelector("#welcome-div")
let domName = document.querySelector("#name")
let pastTripsWidget = document.querySelector("#past-trips")
let pendingTripsWidget = document.querySelector("#pending-trips")
let noTripsMessage = document.querySelector(".no-past-trips")

// GLOBAL VARIABLES 
let currentUserID = "1"
let currentURL = "http://localhost:3001/api/v1/travelers/" + currentUserID



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
    })
}

renderDom()

function displayName({name}) {
    domName.innerText = name
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
        })
        console.log('PAST TRIPS:', pastTrips)
    
        pastTrips.forEach((trip) => {
            pastTripsWidget.innerHTML += `<div>
                                            <h3>${trip.destinationName}</h3><br>
                                            <p>${trip.date}</p>
                                            <p>Party of ${trip.travelers}</p
                                        </div>`
        })
    } else {
        noTripsMessage.classList.remove('hidden')
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
        })
        console.log('PENDING TRIPS:', pendingTrips)
    
        pendingTrips.forEach((trip) => {
            pendingTripsWidget.innerHTML += `<div>
                                            <h3>${trip.destinationName}</h3><br>
                                            <p>${trip.date}</p>
                                            <p>Party of ${trip.travelers}</p
                                        </div>`
        })

    } else {
        pendingTripsWidget.innerHTML += `<h3>You have no pending trips at this time</h3>`
    }
}


