// IMPORTS
import { fetchData, postData } from './apiCalls';
import { calculateTotalSpent, calculateTripCost } from './costs';

// QUERY SELECTORS 
const container = document.querySelector(".container")
const loginPage = document.querySelector("#login-page")
const loginButton = document.querySelector("#login-button")
const usernameField = document.querySelector("#username-field")
const passwordField = document.querySelector("#password-field")
const incorrectMessage = document.querySelector("#incorrect-login")
const header = document.querySelector("header")
const welcome = document.querySelector("#welcome-div")
const domName = document.querySelector("#name")
const pastTripsWidget = document.querySelector("#past-trips")
const pendingTripsWidget = document.querySelector("#pending-trips")
const noPastTrips = document.querySelector(".no-past-trips")
const noPendingTrips = document.querySelector(".no-pending-trips")
const pastGrid = document.querySelector(".past-grid")
const pendingGrid = document.querySelector(".pending-grid")
const totalSpent = document.querySelector("#total-spent")
const bookNowButton = document.querySelector(".book-now-button")
const bookingForm = document.querySelector(".form")
const pastBookButton = document.querySelector("#past-book-button")
const pendingBookButton = document.querySelector("#pending-book-button")
const costEstimate = document.querySelector("#cost-estimate")
const costButton = document.querySelector("#see-cost-button")
const destinationField = document.querySelector("#destination-field")
const dateField = document.querySelector("#date-field")
const travelersField = document.querySelector("#travelers-field")
const durationField = document.querySelector("#duration-field")
const submitBookingButton = document.querySelector("#submit-booking-button")
const bottom = document.querySelector("#bottom-div")


// GLOBAL VARIABLES 
let currentUserID;
let currentURL;
let postURL = "http://localhost:3001/api/v1/trips"
let tripID = 203 
 

// EVENT LISTENERS
loginButton.addEventListener("click", detectLogin)
bookNowButton.addEventListener("click", displayForm)
pastBookButton.addEventListener("click", displayForm)
pendingBookButton.addEventListener("click", displayForm)
costButton.addEventListener("click", function(event) {
    event.preventDefault(); 
    displayCost()
})
submitBookingButton.addEventListener("click", function(event) {
    event.preventDefault();
    tripID += 1
    console.log(tripID)
    postData(postURL, tripID, currentUserID, destinationField.value, travelersField.value, dateField.value, durationField.value)
    .then(data => {
        (console.log("we made it here"))
        renderDom()
        displayForm()
    })   
})



// DOM UPDATE FUNCTIONS
function renderDom() {
    destinationField.value = ""
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

function detectLogin(event) {
    event.preventDefault();
    let array = usernameField.value.split("")
    let firstHalf = array.slice(0,8).join("")
    let secondHalf = array.slice(8).join("")

    if (passwordField.value === "traveler" && firstHalf === "traveler" && parseInt(secondHalf) > 0 && parseInt(secondHalf) <= 50 && secondHalf.length <= 2) {
        loginPage.style.display = "none"
        header.classList.remove("hidden")
        container.classList.remove("hidden")
        bottom.classList.remove("hidden")
        currentUserID = secondHalf
        currentURL = "http://localhost:3001/api/v1/travelers/" + currentUserID
        incorrectMessage.innerText = "";
        usernameField.value = "";
        passwordField.value = "";
        renderDom();
    } else {
        incorrectMessage.innerText = `I'm sorry, we do not have record of that username and password combination. Please try again.`
        usernameField.value = "";
        passwordField.value = "";
    }
}

function displayForm() {
    container.classList.toggle("hidden")
    bookingForm.classList.toggle("hidden")

    if (bookNowButton.innerText === "Book Now!") {
        bookNowButton.innerText = "Back Home" 
    } else {
        bookNowButton.innerText = "Book Now!"
        destinationField.value = "";
        dateField.value = "";
        travelersField.value = "";
        durationField.value = "";
        costEstimate.innerText = "";
        submitBookingButton.classList.add("hidden")
    }
}

function displayCost() {
    submitBookingButton.classList.remove("hidden")
    fetchData(currentURL)
    .then(([userInfo, trips, destinations]) => {
        costEstimate.innerText = `The estimated cost of this trip is ${calculateTripCost(parseInt(destinationField.value), durationField.value, travelersField.value, destinations)} USD, including a 10% agent's fee. Submit booking request to agent below or update trip details.`
    }) 
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
    let total = calculateTotalSpent(id, {trips}, {destinations})
    if (typeof total === "number") {
        totalSpent.innerText = `You have spent a total of $${calculateTotalSpent(id, {trips}, {destinations})} with TravelTracker this year. Users save an average of 18% when booking with TravelTracker`
    } else {
        totalSpent.innerText = calculateTotalSpent(id, {trips}, {destinations})
    }
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


