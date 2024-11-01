import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function Main() {

  let navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem("token")){
        navigate("/")
    }
  },[])
  return (
    <>
<Navbar/>
<Outlet />
      
    </>
  );
}

export default Main;