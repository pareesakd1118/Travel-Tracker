import { displayErrorMessage } from './domUpdates';

function runGet(url) {
    let gets = [
        fetch(url),
        fetch("http://localhost:3001/api/v1/trips"),
        fetch("http://localhost:3001/api/v1/destinations"),
    ];

    return gets;
}

function fetchData(url) {
    return Promise.all(runGet(url))
        .then(res => {
            const allResponsesOk = res.every(item => item.ok);
            
            if (allResponsesOk) {
                return Promise.all(res.map(item => item.json()));
            } else {
                displayErrorMessage("ERROR:");
            }
        }); 
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
    };
    return fetch(`http://localhost:3001/api/v1/trips`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
            }
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        } else {
            displayErrorMessage("ERROR:")
        }
    });
}

export { fetchData, postData };
