import logo from './logo.svg';
import './App.css';

function App() {
    const API_KEY = process.env.REACT_APP_NASA_KEY

    fetch("https://api.nasa.gov/planetary/apod?api_key=" + API_KEY)
        .then(response => {
        if (!response.ok){
            throw new Error("Could not fetch resource")
        }
        return response.json();
        }
    )
        .then((data) => console.log(data))
        .catch(error => console.error(error));
    return (
        <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
            Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
            </a>
        </header>
        </div>
    );
}

export default App;