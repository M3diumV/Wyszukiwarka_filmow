import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

async function FindMovie(setMovies) {
  const name = document.getElementsByName("search")[0].value;
  const response = await fetch("http://www.omdbapi.com/?apikey=117c0bad&type=movie&s=" + name);
  const data = await response.json();

  if (data.Search) {
    setMovies(data.Search);
  } else {
    setMovies([]);
  }
}

async function MovieDetails(imdbID, setSelectedMovie) {
  const response = await fetch("http://www.omdbapi.com/?apikey=117c0bad&i=" + imdbID);
  const data = await response.json();
  setSelectedMovie(data);
  console.log(data); //sprawdzenie api
}

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        {!selectedMovie && (
        <>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Wyszukiwarka:</h2>
          <input name="search" />
          <button onClick={() => FindMovie(setMovies)}>Szukaj</button>

          <div className="movie-list">
            {movies.map((movie, index) => (
              <div
                key={index}
                className="movie-item"
                onClick={() => MovieDetails(movie.imdbID, setSelectedMovie)}
                style={{ cursor: 'pointer' }}
              >
                <h3>{movie.Title}</h3>
                <p>Rok: {movie.Year}</p>
                <img src={movie.Poster} alt={`plakat ${movie.Title}`} />
              </div>
            ))}
          </div>
        </>
      )}

        {selectedMovie && (
          <div className="movie-details">
             <h2>{selectedMovie.Title}</h2>
             <img src={selectedMovie.Poster} alt={`plakat ${selectedMovie.Title}`} />
          <div className="info">
              <p><h3>Opis fabuły: </h3> {selectedMovie.Plot}</p>
              <p><h3>Reżyser: </h3> {selectedMovie.Director}</p>
              <p><h3>Główne role: </h3>{selectedMovie.Actors}</p>
              <p><h3>Gatunek: </h3>{selectedMovie.Genre}</p>
              <p><h3>Ocena: </h3>{selectedMovie.imdbRating}</p>
            </div>
            
        </div>
        
        )}
      </header>
    </div>
  );
}

export default App;
