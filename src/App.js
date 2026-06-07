import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const API_KEY = process.env.REACT_APP_NASA_KEY
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
        <div className>="App"
            <h1>{apod.title}</h1>
        </div>
    );
}

export default App;