
import React, { useContext, useEffect } from 'react';
import "./css/category.css";
import { Formik, useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate} from 'react-router-dom';
import { toast ,ToastContainer } from 'react-toastify';
import axios, { Axios } from 'axios';
import { useState } from 'react';
import CategoryTable from '../Component/Category/Category';
import { authcontext } from '../Context/authContext';

const AddCategory = () => {
let { getCategory } = useContext(authcontext)
  let AddCategory = useFormik({
    initialValues:{
        name: "",
       
     
    },
    onSubmit:async(values)=>{
      
        console.log(values);
        await axios.post(`http://localhost:11923/api/categroys`, values).then(res=>{
            console.log(res);
            getCategory()
        }).catch(err=>{
            console.log(err);
        })
    }
}) 



  return (
    <>
    <form className='my-form' onSubmit={AddCategory.handleSubmit}>
    <div className="row d-flex justify-content-center align-items-center m-auto">
        <div className="col-md-5 mt-1 mb-5 ">
            <div className="card w-100 p-5 border-0 rounded-4">
                <h2>التصنيفات</h2>

                <input  className="input text-dark w-100 mt-4" name="name" type="text" id="name" onChange={AddCategory.handleChange} placeholder="اضف التصنيف" />
                <br />
                <button type='submit' className="btn mybtn m-auto w-50 fs-2">اضافه</button>
            </div>
        </div>
    </div>
    </form>



<CategoryTable/> 
</>
  )
}

export default AddCategory


