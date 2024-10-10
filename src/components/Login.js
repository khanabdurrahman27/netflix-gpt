import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL, USER_AVATAR } from '../utils/constants';

const Login = () => {
  const[isSignInForm, setisSignInForm]=useState(true) ;
  const[errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  
  const handleButtonClick=()=>{
    //validate the form data
    const message = checkValidData(email.current.value, password.current.value)
    setErrorMessage(message)
    if(message) return; 
      //signin /sign up logic
      if(!isSignInForm){
        //sign Up Logic
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, photoURL: USER_AVATAR,
    }).then(() => {
      // Profile updated!
      const {uid, email, displayName, photoURL} = auth.currentUser;
      dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL:photoURL,}));
    }).catch((error) => {
      setErrorMessage(error.message);
      // An error occurred
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode +"-"+ errorMessage);
    // ..
  });
      }else{
        //sign In Logic
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage)
  });

      }

  }
  const toggleSignInForm =()=>{
    setisSignInForm(!isSignInForm);
  }
  return (
    <div>
      <Header/>
      <div className='absolute'>
        <img className='min-h-screen object-cover bg-center bg-cover' src={BG_URL} alt='background-img'/>
      </div>
      <form 
      onSubmit={(e)=>e.preventDefault()}
      className='w-full absolute md:w-4/12 bg-black bg-opacity-75 my-36 mx-auto left-0 right-0 p-20 rounded-lg'>
      <h1 className='font-bold text-3xl pb-4 text-white'>{isSignInForm ? " Sign In" : "Sign Up"}</h1>
      {!isSignInForm &&(<input ref={name} type='text' placeholder='Full Name' className='p-4 my-2 w-full rounded-md bg-[#333]'/> )}
        <input 
        ref={email}
        type='text' 
        placeholder='Email Address' 
        className='p-4 my-2 w-full rounded-md bg-[#333]'/> 
        <input 
        ref={password}
        type='password' 
        placeholder='Password' 
        className='p-4 my-2 w-full rounded-md bg-[#333]'/> 
        <p className='text-red-700'>{errorMessage}</p>
        <button className='p-4 my-6 bg-red-700 text-white w-full rounded-md font-bold' onClick={handleButtonClick}>{isSignInForm ? " Sign In" : "Sign Up"}</button>
        <p className='text-gray-400 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? " New to Netflix? Sign Up Now" : "Already Registered?Sign In Now"}</p>
      </form>
    </div>
  )
}

export default Login
