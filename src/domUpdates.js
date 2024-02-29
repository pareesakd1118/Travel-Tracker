// IMPORTS
import { fetchData } from './apiCalls';




// QUERY SELECTORS 
let welcome = document.querySelector("#welcome-div")


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
    })
}

renderDom()



// fetchData(currentURL)
// .then(data => console.log("USER INFO:", data))

// fetch("http://localhost:3001/api/v1/trips")
// .then(res => res.json())
// .then(data => console.log('TRIPS:', data))

// fetch("http://localhost:3001/api/v1/destinations")
// .then(res => res.json())
// .then(data => console.log('DESTINATIONS:', data))

//I want to get single user data, then i want to get trips, then I want to get destinations