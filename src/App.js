import { useEffect, useState } from 'react';
import './App.css';

const API_KEY = process.env.REACT_APP_NASA_KEY

function App() {
    const [apod, setApod] = useState(null);
    const d = new Date();
    const [date, setDate] = useState(d.toISOString().split('T')[0]);

    useEffect(() => {
            fetch("https://api.nasa.gov/planetary/apod?api_key=" + API_KEY + (date ? "&date=" + date : ""))
            .then(response => {
            if (response.status === 404) {
                const errorPreviousDate = new Date(date);
                errorPreviousDate.setDate(errorPreviousDate.getDate() - 1);
                setDate(errorPreviousDate.toISOString().split('T')[0]);
                throw new Error("Resource not found, fetching previous day")
            }
            else if (!response.ok){
                throw new Error("Could not fetch resource")
            }
            return response.json();
        })
        .then((data) => setApod(data))
        .catch(error => console.error(error));
    }, [date])

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
    
    if (apod == null) {
        return <p>Loading...</p>
    }

    return (
        <div className="App">
            <h1>{apod.title} {apod.date}</h1>
            <div className="content">
                <div className="img">
                    <img src={apod.url} alt={apod.title} />
                </div>
                <div className="explanation">
                    <p>{apod.explanation}</p>
                    <button className="button" onClick = {handlepreviousDay}>Previous Day</button>
                    <button className="button" onClick = {handleNextDay}>Next Day</button>
                </div>
            </div>
        </div>
    );
}

export default App;