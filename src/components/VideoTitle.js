import React from 'react'
import useMovieTrailer from '../hooks/useMovieTrailer'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='pt-[25%] px-6 md:px-12 w-screen aspect-video absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-2xl md:text-3xl font-bold w-1/4'>{title}</h1>
      <p className='hidden md:inline-block py-6 text-sm w-1/4'>{overview}</p>
      <div className='flex items-center'>
      <button className='bg-white text-black rounded-sm mt-2 mr-2 py-1 px-2 md:py-2 md:px-6 md:text-lg font-semibold flex items-center gap-x-2'>▶️Play</button>
      <button className='hidden md:flex md:gap-x-2 bg-gray-500 text-white bg-opacity-50 py-2 mt-[7px] px-7 rounded-sm mx-2 text-lg font-semibold md:h-[46px] sm:flex sm:items-center'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle
