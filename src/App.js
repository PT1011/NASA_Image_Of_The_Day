import { useEffect, useState } from 'react';
import './App.css';

const API_KEY = process.env.REACT_APP_NASA_KEY

function App() {
    const [apod, setApod] = useState(null);
    const [date, setDate] = useState(null);

    useEffect(() => {
            fetch("https://api.nasa.gov/planetary/apod?api_key=" + API_KEY + (date ? "&date=" + date : ""))
            .then(response => {
            if (!response.ok){
                throw new Error("Could not fetch resource")
            }
            return response.json();
            }
        )
        .then((data) => setApod(data))
        .catch(error => console.error(error));
    }, [date])

    if (apod == null) {
        return <p>Loading...</p>
    }

    function handlepreviousDay() {
        const previousDate = new Date(date);
        previousDate.setDate(previousDate.getDate() - 1);
        setDate(previousDate.toISOString().split('T')[0]);
    }

    function handleNextDay() {
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        setDate(nextDate.toISOString().split('T')[0]);
    }

    return (
        <div className="App">
            <h1>{apod.title} {apod.date}</h1>
            <img src={apod.url} alt={apod.title} />
            <p>{apod.explanation}</p>
            <button onClick = {handlepreviousDay}>Previous Day</button>
            <button onClick = {handleNextDay}>Next Day</button>
        </div>
    );
}

export default App;