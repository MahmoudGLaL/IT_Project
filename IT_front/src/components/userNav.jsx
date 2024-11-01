import React from 'react'
import "./css/userNav.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser , faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const UserNav = (props) => {




  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mynav p-2">
        <div className="container-fluid m-auto d-flex align-items-center hello p-2">
            <div className='myicon'><FontAwesomeIcon icon={faUser} /></div>
            <span className='userName'>{props.hello} </span>
            <button className='logout' >LogOut  <FontAwesomeIcon  icon = {faRightFromBracket} /></button>
        </div>
    </nav>
  )
}

export default UserNav