import React from 'react'
import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=c65f6d14';

const movie1 = {
  "Title": "Batman: The Animated Series",
  "Year": "1992–1995",
  "imdbID": "tt0103359",
  "Type": "series",
  "Poster": "https://m.media-amazon.com/images/M/MV5BOTM3MTRkZjQtYjBkMy00YWE1LTkxOTQtNDQyNGY0YjYzNzAzXkEyXkFqcGdeQXVyOTgwMzk1MTA@._V1_SX300.jpg"
}

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    
    console.log(data);

    if(data.Response === 'True')
      setMovies(data.Search);
  }

  // useEffect to load movie list from API_URL when page loads
  useEffect(() =>{
    searchMovies('Batman');
  }, []);

  return (
      <div className='app'>
        <h1>MovieLand</h1>

        <div className='search'>
          <input placeholder='Search for movies' value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} />

          <img src={SearchIcon} alt="search" 
            onClick={() => searchMovies(searchTerm)} />
        </div>

        {movies.length > 0
          ? (
            <div className='container'>
                {movies.map((movie) => (
                  <MovieCard movie1={movie}/>
                ))}
            </div>
          ) :
          (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
          )
        }     
      </div>
  )
}

export default App