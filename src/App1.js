import logo from './logo.svg';
import './App.css';

async function FindMovie() {
  // zapytanie do API http://www.omdbapi.com/?i=tt3896198&apikey=117c0bad&type=movie&s=
  const name = document.getElementsByName("search")[0].value //[input] input
  // alert(name);
  // alert(fetch("http://www.omdbapi.com/?i=tt3896198&apikey=117c0bad&type=movie&s=" + name).json())
  let tabela;
  const response = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=117c0bad&type=movie&s=" + name);
  tabela = (await response.json()).Search;

  tabela.forEach(element => {
    console.log("tytul: "+element.Title)
    console.log("rok: "+element.Year)
  });

}

function App() {
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
        <h2>Wyszukiwarka: </h2>
        <input name="search" />
        <button onClick={FindMovie}>Szukaj</button>
      </header>
    </div>
  );
}

export default App;
