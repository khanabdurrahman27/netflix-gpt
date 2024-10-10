import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name:'movies',
  initialState:{
    trailerVideo:null,
    nowPlayingMovies : null,
    popularMovies:null,
    topratedmovies:null,
    upcomingmovies:null,
  },
  reducers:{
  
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addNowPlayingMovies : (state, action)=>{
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies :(state, action)=>{
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topratedmovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingmovies = action.payload;
    },
  },
});
export const{ addTrailerVideo, addNowPlayingMovies, addPopularMovies, addTopRatedMovies, addUpcomingMovies}= moviesSlice.actions;

export default moviesSlice.reducer;