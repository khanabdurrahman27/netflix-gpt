import React, { useRef } from 'react'
import client from '../utils/openai';
import { useDispatch, useSelector } from 'react-redux';
import lang from '../utils/languageConstants';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
  const dispatch = useDispatch();

  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) =>{
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+ movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS);
    const json = await data.json()
    return json.results;
  };

  const handleGPTSearchClick = async()=>{
    console.log(searchText.current.value);
    //Make an API call to GPT API and get Movies Results

    const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query" + searchText.current.value + "only give me name of 5 movies, comma separated like the example result given a head. Example Result: Gadar, Sholay, Don, Golamaal, Koi mil Gaya";

    const gptResult = await client.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });
    if (!gptResult.choices){
      //TODO: Write Error Handling
    }
    console.log(gptResult.choices?.[0]?.message?.content
    );
    const gptMovies = gptResult.choices?.[0]?.message?.content.split(',');

    //["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaare", "Padosan"]
    // For each movie I will search TMDB API

    const promiseArray = gptMovies.map((movie)=> searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise,]

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(addGptMovieResult({movieNames:gptMovies, movieResults: tmdbResults}));
  }
  return (
    <div className='md:pt-[10%] pt-[50%] flex justify-center mx-2 sm:mx-0'>
      <form className='w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg shadow-xl' onSubmit={(e)=>e.preventDefault()}>
        <input ref={searchText} type='text' className='p-4 m-4 col-span-9' placeholder={lang[langKey].gptSearchPlaceholder}/>
        <button className='col-span-3 m-4  px-3 bg-red-700 text-white rounded-lg text-sm flex justify-center items-center' onClick={handleGPTSearchClick}>{lang[langKey].search}</button>
      </form>
    </div>
  );
};

export default GptSearchBar;
