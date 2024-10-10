import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from "./MovieList"

const GptMovieSuggestions = () => {
  const {movieResults, movieName} = useSelector(store => store.gpt);
  if (!movieName) return null;
    return (
    <div className='p-4 m-4 text-white bg-opacity-80'>
      {movieName.map((movieName, index)=>(
        <MovieList 
        key={movieName} 
        title={movieName}
        movies = {movieResults[index]}/>
      ))}
    </div>
  )
}

export default GptMovieSuggestions
