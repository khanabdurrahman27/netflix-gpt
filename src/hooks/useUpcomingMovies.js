import { useDispatch, useSelector } from "react-redux"; 
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies =()=>{
  
  //Fetch Data from TMDM API and update store
  const dispatch = useDispatch();
  const upcomingmovies = useSelector((store)=>store.movies.upcomingmovies);

  const getUpcomingMovies = async ()=>{
    const data =await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTIONS);
  const json =await data.json();
  dispatch(addUpcomingMovies(json.results));
};
 useEffect(()=>{
  !upcomingmovies && getUpcomingMovies();
 },[])
}
export default useUpcomingMovies;