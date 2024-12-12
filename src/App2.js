import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

async function FindMovie(setMovies) {
  const name = document.getElementsByName("search")[0].value;
  const response = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=117c0bad&type=movie&s=" + name);
  const data = await response.json();

  if (data.Search) {
    setMovies(data.Search);
  } else {
    setMovies([]);
  }
}

function App() {
  const [movies, setMovies] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Wyszukiwarka:</h2>
        <input name="search" />
        <button onClick={() => FindMovie(setMovies)}>Szukaj</button>
        <div className="movie-list">
          {movies.map((movie, index) => (
            <div key={index} className="movie-item">
              <h3>{movie.Title}</h3>
              <p>Rok: {movie.Year}</p>
              <img src={movie.Poster}/>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
