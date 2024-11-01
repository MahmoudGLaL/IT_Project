import React, { useContext, useEffect, useState } from 'react'
import "./css/login.css"
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast ,ToastContainer } from 'react-toastify';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { authcontext } from '../Context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
export default function Addrole() {
 let  {allUser, GetAllUser} = useContext(authcontext)
    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState('');

      
  const [isKeyDown, setIsKeyDown] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);


    const handleDropdownChange = (event) => {
      setSelectedOption(event.target.value);
      
    };
    console.log(selectedOption);
    // console.log(selectedOption);
                                                                                                                                                                                                                                                                                                      
const initialValues = {
    username : '',
    password : '',
    role: "" ,
    name: "string",
    isBlocked: false,
};

 async function addRole(values) {
        values.role = selectedOption
        // console.log({values});
      await axios.post("http://localhost:5137/api/Users", values).then((res)=> {
        // console.log(res);
            toast.success("تمت اضافة مستخدم جديد ب نجاح")
            GetAllUser()

        }).catch(err=>{
            console.log(err);
            if(err.response.status === 500)
            {
              toast.error(" هذا المستخدم موجود بالفعل")
            }
        })
        // navigate("/main/showRole")
    }

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

    let formik = useFormik({
        initialValues,
        onSubmit: addRole
            
          

        
})  
  return (
    <>
      <form className='mt-5 ' onSubmit={formik.handleSubmit} >
        <div className="row d-flex justify-content-center align-items-center m-auto">
          <div className='col-md-5 mt-5  role'>
            <div className="card w-100 p-5 border-0 rounded-4 ">
              <h5>إضافة مستخدم</h5>
              

              <div className="dropdown mb-5 selected fs-4 " >

              
                    <select value={selectedOption} onBlur={formik.handleBlur}  onChange={handleDropdownChange} className='input text-black border-0 rounded-4 w-100' type="item" id="item1" name='role' placeholder=" التصنيف " required>
                        <option selected value="" disabled >اختر الصلاحيه</option>
                        <option type="item" id="item1" value="admin">Admin</option>
                        <option type="item" id="item1" value="SuperAdmin">SuperAdmin</option>
                        <option type="item" id="item1" value="user">User</option>
                    </select>
                    {/* <p>Selected option: {selectedOption}</p> */}
                </div>

              <label> اسم  الموظف</label>
              <input  onChange={formik.handleChange} onBlur={formik.handleBlur} className='in-log input text-dark w-100 ' type="text" name="name"required/>
              <label>اسم المستخدم </label>
              <input  onChange={formik.handleChange} onBlur={formik.handleBlur} className='in-log input text-dark w-100 ' type="text" name="username"required/>
   
              <label>الرقم السرى</label>
              <div className='pass'>
                <input  onChange={formik.handleChange} onBlur={formik.handleBlur}  className='in-log input text-dark w-100 ' type={passwordVisible ? "text" : "password"}
                  required
                  onKeyDown={()=>handleKeyDown(formik.values.password)}
                  onKeyUp={()=>handleKeyUp(formik.values.password)}
                   name="password"
/>
                <span className='myeye'  onClick={showPassword} >
                  <FontAwesomeIcon icon={faEye} style={{ display : isKeyDown ? "block" : "none"}} className='eyye' />
                </span>
                 <button type='submit' className=" btn mybtn m-auto w-50 fs-3 mt-2 " >أضافة</button>
                 <ToastContainer/>
              </div>

              

            

              

            </div>
          </div>

        </div>
      </form>
      
    </>
  )
}


