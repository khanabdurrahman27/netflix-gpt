import { useDispatch, useSelector } from "react-redux"; 
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies =()=>{
  
  //Fetch Data from TMDM API and update store
  const dispatch = useDispatch();
  const topratedmovies = useSelector((store)=>store.movies.topratedmovies);

  const getTopRatedMovies = async ()=>{
    const data =await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTIONS);
  const json =await data.json();
  dispatch(addTopRatedMovies(json.results));
};
 useEffect(()=>{
  !topratedmovies && getTopRatedMovies();
 },[])
}
export default useTopRatedMovies;