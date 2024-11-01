import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import "../../components/css/adminNav.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser , faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


export default function Navbar(props) {
  let navigate = useNavigate()
  

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light shadow-lg p-2  bg-white rounded  no-print p">
        <div className={`container-fluid  d-flex  align-items-center  `}>

            <div className="ml-1 d-flex justify-content-center align-items-center flex-column">
            <div className={`icon ${localStorage.getItem("role") === 'SuperAdmin' ? 'bg-danger' : localStorage.getItem("role") === 'admin' ? 'bg-primary' : 'bg-success' } mt-0 `}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className={ `fs-5 font-monospace ${localStorage.getItem("role")  === 'SuperAdmin' ? 'text-danger' : localStorage.getItem("role") === 'admin' ? 'text-primary' : 'text-success' } `}>{localStorage.getItem("user")}</div>
            </div>
            <span >{props.hello}</span>
            <button className={ `logOut font-monospace ${localStorage.getItem("role")  === 'SuperAdmin' ? 'text-danger' : localStorage.getItem("role") === 'admin' ? 'text-primary' : 'text-success' } `} onClick={()=>{
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              navigate("/")

            }} > تسجيل الخروج   <FontAwesomeIcon  icon = {faRightFromBracket} /></button>
          <button
            className="navbar-toggler"  
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-5 ">
              
   
             
            {localStorage.getItem("role") === "admin" &&   
            <>
                <li className="nav-item mx-2">
                <NavLink className="nav-link mylink " to="addDevices">
                اضافة جهاز
                </NavLink>
              </li>

              <li className="nav-item mx-2">
                <NavLink className="nav-link mylink" to="showDevices">
                عرض الأجهزه
                </NavLink>
              </li>
            

              <li className="nav-item mx-2">
                <NavLink className="nav-link mylink" to="showLocations">
                   مواقع الجهاز
                {/* اضافة مواقع  */}
                </NavLink>
                
              </li>
          
              <li className="nav-item mx-2">
                <NavLink className="nav-link mylink" to="ShowWorkshops">
                   الورش
                </NavLink>
              </li>
              {/* <li className="nav-item mx-2">
                <NavLink className="nav-link mylink" to="Transactions">
                نقل الجهاز
                </NavLink>
              </li> */}

              <li className="nav-item mx-2">
                <NavLink className="nav-link mylink" to="showTypes">
                انواع الأجهزه
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink className="nav-link mylink" to="showSpareparts">
                  قطع الغيار
                </NavLink>
              </li>

              <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="ShowTools">
                   أدوات الصيانه
                </NavLink>
              </li>
              {/* <li className="nav-item mx-2">
                <NavLink className="nav-link mylink" to="scanning">
                  فحص الباركود
                </NavLink>
              </li> */}
              <li className="nav-item mx-2">
                <NavLink className="nav-link mylink" to="barcodes">
                باركود الأجهزه
                </NavLink>
              </li>
              </>
              }
            {localStorage.getItem("role") === "user" &&   
            <>
               

              <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="showDevices">
                عرض الأجهزه
                </NavLink>
              </li>
            

              <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="showLocations">
                   مواقع الجهاز
                {/* اضافة مواقع  */}
                </NavLink>
                
              </li>
          
              <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="ShowWorkshops">
                   الورش
                </NavLink>
              </li>
              {/* <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="Transactions">
                نقل الجهاز
                </NavLink>
              </li> */}

              <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="showTypes">
                انواع الأجهزه
                </NavLink>
              </li>
              <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="showSpareparts">
                  قطع الغيار
                </NavLink>
              </li>

              <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="ShowTools">
                   أدوات الصيانه
                </NavLink>
              </li>
             
           
              {/* <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="scanning">
                  فحص الباركود
                </NavLink>
              </li> */}
              <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="barcodes">
                باركود الأجهزه
                </NavLink>
              </li>
              </>
              }

              {/* with admin */}
              {localStorage.getItem("role") === "SuperAdmin" &&   
            <>
              <li className="nav-item mx-1">
                <NavLink className="nav-link mylink " to="addDevices">
                اضافة جهاز
                </NavLink>
              </li>

              <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="showDevices">
                عرض الأجهزه
                </NavLink>
              </li>
              <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="allTransactions">
                الصيانه
                </NavLink>
              </li>

              <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="showLocations">
                   مواقع الجهاز
                {/* اضافة مواقع  */}
                </NavLink>
                
              </li>
          
              <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="ShowWorkshops">
                   الورش
                </NavLink>
              </li>
              {/* <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="Transactions">
                نقل الجهاز
                </NavLink>
              </li> */}

              <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="showTypes">
                انواع الأجهزه
                </NavLink>
              </li>
              <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="showSpareparts">
                  قطع الغيار
                </NavLink>
              </li>

              <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="ShowTools">
                   أدوات الصيانه
                </NavLink>
              </li>
              {/* <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="scanning">
                  فحص الباركود
                </NavLink>
              </li> */}
              <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="barcodes">
                   باركود الأجهزه
                </NavLink>
              </li>
              <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="allUserTransactions">
                  جميع العمليات
                </NavLink>
              </li>

              <>

              {/* <li className="nav-item mx-1">
                <NavLink className="nav-link mylink" to="talkReservers/:id">
                نداء المرضى
                </NavLink>
              </li> */}
              </>
              <li className="nav-item mx-1">
              <NavLink className="nav-link mylink"  to="addRole">
                اضافة مستخدم
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink className="nav-link mylink"  to="showRole">
                عرض المستخدمين 
              </NavLink>
            </li>

            </>
              }

            
            <li className="nav-item mx-1">
              <NavLink className="nav-link mylink" >
              <button className={ `LogOut ${localStorage.getItem("role") === 'admin' ? 'text-danger' : 'text-success' }`} onClick={()=>{
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              navigate("/")

            }} > تسجيل الخروج    <FontAwesomeIcon  icon = {faRightFromBracket} /></button>
              </NavLink>
            </li> 
           

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
