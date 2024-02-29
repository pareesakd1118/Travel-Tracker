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

export { fetchData };
