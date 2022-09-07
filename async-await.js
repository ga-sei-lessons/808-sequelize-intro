const axios = require('axios')

const url = 'https://swasadfsadfpi.dev/api/people/?search=Leia'

// async/await and dot then are interchangable in js

// axios call handling the promise with dot then syntax
axios.get(url)
    .then(response => {
        console.log(response.data)
        
    })
    .catch(console.warn)

// axios call handling the promise with async/await syntax
// await tells javascript to LITERALLY JUST WAIT -- but it has to happen in an async function
async function myAsyncFunction() {}
const fetchStarWars = async () => {
    try {
        // if no errors: run this code
        const response = await axios.get(url)
        console.log(response.data)
    } catch(err) {
        // else if error, run this code: 
        console.log('oops, error!')
        console.warn(err)
    }
}

fetchStarWars()