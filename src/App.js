const API_KEY = process.env.REACT_APP_NASA_KEY

fetch("https://api.nasa.gov/planetary/apod")
    .then(response => {
        if (!response.ok){
            throw new Error("Could not fetch resource")
        }
        return response.json();
    })
    .then((data) => console.log(data))
    .catch(error => console.error(error));