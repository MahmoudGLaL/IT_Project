
import React, { useContext, useEffect, useState } from 'react'
import "./css/login.css"
import axios, { Axios } from 'axios';
import { useNavigate } from 'react-router-dom/dist';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { authcontext } from '../Context/authContext';
import { useFormik } from 'formik';

const Login = () => {
  
  const [isKeyDown, setIsKeyDown] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  let [isLoading , setisLoading] = useState(false)

   let { LoginAPi}=useContext(authcontext)
    let navigate = useNavigate()

    const handleKeyDown = (pass) => {
      if (pass !== '') {
        setIsKeyDown(true);
      }
      else {
        setIsKeyDown(false);
        setPasswordVisible(false);
      }
    };
  
    const handleKeyUp = (pass) => {
      if (pass !== '') {
        setIsKeyDown(true);
      }
      else {
        setIsKeyDown(false);
        setPasswordVisible(false);
      }
    };
  
    // showPassword
  
    const showPassword = () => {
      setPasswordVisible(!passwordVisible)
    }
  
   
   let LoginFormik = useFormik({
    initialValues:{
      username:"",
      password:'',

    },
    onSubmit: (values)=>{
      setisLoading(true)
        LoginAPi(values , navigate , setisLoading)
    }
   })
  return (
    <>
      <form className='my-form mt-1 ' onSubmit={LoginFormik.handleSubmit} >
        <div className="row d-flex justify-content-center align-items-center m-auto ">
          <div className='col-md-5 mb-3 log-in '>
            <div className="card w-100 p-5 border-0 rounded-4 m-auto">
              <h5 class>تسجيل الدخول</h5>
              <span className=".under-line"></span>
              <label>اسم المستخدم </label>
              <input className='in-log input text-dark w-100 ' onChange={LoginFormik.handleChange} type="text" name="username"
                required
                 />
             
              <label>الرقم السرى</label>
              <div className='pass'>
                <input className='in-log input text-dark w-100 ' onChange={LoginFormik.handleChange}  name="password"
                type={passwordVisible ? "text" : "password"}
                  required
                  onKeyDown={()=>handleKeyDown(LoginFormik.values.password)}
                  onKeyUp={()=>handleKeyUp(LoginFormik.values.password)}
                  />
                <span className='eye' onClick={showPassword} >
                  <FontAwesomeIcon icon={faEye} style={{width : 20 , height : 30 , display : isKeyDown ? "block" : "none"}} />
                </span>

                
                 <button type='submit' className=" btn mybtn m-auto w-50  mt-4"  >{isLoading ?  "....Loading":"دخول"}</button>
              </div>
            </div>
          </div>

        </div>
      </form>
      <ToastContainer />
    </>
  )
}

export default Login

// alert("تم تسجيل الدخول بنجاح")