import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import lang from '../utils/languageConstants';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
  const handleSignOut = ()=>{
    signOut(auth).then(()=>{
      //sign-out successful.
    }).catch((error)=>{
      navigate('/error');
      //An error happened.
    });
  };
  useEffect(()=>{
    const unsubcribe = onAuthStateChanged(auth,(user)=>{
      if(user){
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL:photoURL,}));
        navigate('/browse');
      }else{
        // user is signed out
        dispatch(removeUser());
        navigate('/');
        
      }
      
    });
    return () => unsubcribe();
  },[]);

   const handleGptSearchClick=()=>{
    //Toggle Gpt Search 
    dispatch(toggleGptSearchView());
   };
  
   const handleLanguageChange=(e)=>{
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
   }
  return (
    <div className='flex flex-col md:flex-row justify-between px-5 py-2 absolute bg-gradient-to-b from-black w-full z-10'>
      <img className='w-40 mx-auto md:mx-0' src={LOGO}
      alt='logo'/>
  {user &&( <div className='flex p-2 justify-between'>
    {showGptSearch && (<select className=' bg-white px-4 py-1 md:m-4 m-2 text-black rounded-md font-semibold' onChange={handleLanguageChange}>
      {SUPPORTED_LANGUAGES.map((lang) => (<option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
    ))}
    </select>
  )}
    <button className='border border-solid border-white bg-purple-700 px-7 py-1 md:m-4 m-2 text-white rounded-md font-semibold' onClick={handleGptSearchClick}>{showGptSearch ? "Homepage" : "GPT Search"}</button>
    <img 
    className='hidden md:block w-12 h-12'
    alt='usericon' 
    src={user?.photoURL}/>
    <button onClick={handleSignOut} className='bg-red-500 text-white px-4 py-1 m-2 md:px-4 md:py-1 md:m-4 rounded-md'>(Sign Out)</button>
  </div>)}
    </div>
  );
};

export default Header;

