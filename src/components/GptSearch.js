import React from 'react'
import GptMovieSuggestions from './GptMovieSuggestions'
import GptSearchBar from './GptSearchBar'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
  return (
    <>
      <div className='fixed -z-10'>
        <img className="min-h-screen object-cover bg-cover bg-center" src={BG_URL} alt='background-img'/>
      </div>
      <div>
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
    </>
  );
};

export default GptSearch;
