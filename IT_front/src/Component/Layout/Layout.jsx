import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import {  Outlet, useLocation, useNavigate } from 'react-router-dom'

// import { createBrowserHistory } from 'history';



export default function Layout() {

 

 
  return (
    <div>
        <Outlet />

    </div>
  )
}
