import { useEffect, useState } from 'react';
import './App.css';

const API_KEY = process.env.REACT_APP_NASA_KEY

function App() {
    const [apod, setApod] = useState(null);

    useEffect(() => {
            fetch("https://api.nasa.gov/planetary/apod?api_key=" + API_KEY)
            .then(response => {
            if (!response.ok){
                throw new Error("Could not fetch resource")
            }
            return response.json();
            }
        )
        .then((data) => setApod(data))
        .catch(error => console.error(error));
    }, [])

    if (apod == null) {
        return <p>Loading...</p>
    }
    return (
        <div className="App">
            <h1>{apod.title} {apod.date}</h1>
            <img src={apod.url} alt={apod.title} />
            <p>{apod.explanation}</p>
        </div>
    );
}

export default App;