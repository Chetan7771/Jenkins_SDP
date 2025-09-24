import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import config from "./config";


const API_BASE = config.url;

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");

  const fetchMovies = async () => {
    try {
      const res = await axios.get(API_BASE, { withCredentials: false });
      setMovies(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch movies: " + (err.response?.data?.message || err.message));
    }
  };

  const addMovie = async () => {
    try {
      await axios.post(`${API_BASE}/add`, { title, director, year });
      setTitle("");
      setDirector("");
      setYear("");
      fetchMovies();
    } catch (err) {
      console.error(err);
      alert("Failed to add movie: " + (err.response?.data?.message || err.message));
    }
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`${API_BASE}/delete/${id}`);
      fetchMovies(); 
    } catch (err) {
      console.error(err);
      alert("Failed to delete movie: " + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>🎥 Movies Library</h1>
        <p>Keep track of your favorite movies</p>
      </header>

      <div className="form-card">
        <input
          type="text"
          placeholder="🎬 Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="🎭 Director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
        />
        <input
          type="number"
          placeholder="📅 Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button onClick={addMovie}>➕ Add Movie</button>
      </div>

      <h2>📽️ All Movies</h2>
      <div className="movie-list">
        {movies.length === 0 ? (
          <p className="empty">No movies found</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <h3>{movie.title}</h3>
              <p>🎭 {movie.director}</p>
              <p>📅 {movie.year}</p>
              <button
                className="delete-btn"
                onClick={() => deleteMovie(movie.id)}
              >
                🗑️ Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
