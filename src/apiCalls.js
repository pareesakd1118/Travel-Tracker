//fetch one users data, url will be the main url + current user 

function runGet(url) {
    let gets = [
        fetch(url),
        fetch("http://localhost:3001/api/v1/trips"),
        fetch("http://localhost:3001/api/v1/destinations"),
    ]

    return gets
}

function fetchData(url) {
    return Promise.all(runGet(url))
    .then(res => {
        return Promise.all(res.map(item => {
            return item.json()
        }))
    })   
}

function postData(number, id, destinationID, numTravelers, date, numDays) {
    let body = {
        id: number, 
        userID: id, 
        destinationID: parseInt(destinationID), 
        travelers: numTravelers, 
        date: date, 
        duration: numDays, 
        status: "pending", 
        suggestedActivities: []
    }
    console.log("body:", body)
    return fetch(`http://localhost:3001/api/v1/trips`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
            }
    })
    .then(res => res.json())
}

export { fetchData, postData };
