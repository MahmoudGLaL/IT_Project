import React from "react";
import "./css/showpatients.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { clinicSchema, Locations } from "./schemas/schema";
import { useFormik } from "formik";
import axios from "axios";





const AddLocations = () => {
    const initialValues = {
        name: "",
        department: "",
        building: "",
        description: "" ,
        userId:  parseInt(localStorage.getItem("id"))
    }


    const handleError = (e) => {
        e.preventDefault()
        toast.error(" من فضلك تأكد من صحة جميع البيانات ")
    }

    // const hours = new Date().getHours()
    // const minutes = new Date().getMinutes();
    // console.log(hours+':'+minutes);

    const { values, handleChange, handleBlur, handleSubmit, errors, touched, isValid } = useFormik({
        initialValues,
        validationSchema: Locations,
        onSubmit: async (values) => {
            console.log(values);
            
            // values.userId = localStorage.getItem("id")
            // console.log(values)
            await axios.post("http://localhost:5137/api/Locations", values).then( res => {
                toast.success("تم اضافة الموقع بنجاح")
            }
            ).catch(e =>{ console.log(e)
                toast.error("هذا الموقع موجود بالفعل")
            })

        }
    })




    return (
        <div className='m-1-cont' >
            <div className="w-90 p-1 border-0 rounded-4 ">

                <form onSubmit={isValid ? handleSubmit : handleError} className='form' >
                    <div className="my-container bg-gray pt-0 pb-5 mb-4 m-loc mt-4 ">

                        {/* <modal open = {openModal}/> */}

                        <h2 className='mt-5  '>اضافة موقع</h2>
                        {/* <span className="underline"></span> */}

                        {/* patient data */}
                        <div className="row  mt-3 ">

                            <div className="col">
                                <span className='mylabel'>
                                    <label className='' htmlFor='name' name='name'> اسم الموقع   </label>
                                </span>
                                <span className='myinput'>
                                    <input className='inp1 ' onChange={handleChange} type="text" id="name" value={values.name}
                                        onBlur={handleBlur}
                                        required
                                    />
                                </span>

                                <div className="error-container err-r mr-n-6">
                                    {errors.name && touched.name && <p className='form-error'>{errors.name}</p>}
                                </div>

                            </div>
                        </div>
                        <div className="row">

                            <div className="col ">
                                <span className='mylabel'>
                                    <label className='4 ' htmlFor='department' name='department'> اسم القسم </label>
                                </span>
                                <span className='myinput' >
                                    <input className='inp1' onChange={handleChange} type="text" id="department" value={values.department}
                                        onBlur={handleBlur}
                                        required
                                    />
                                </span>

                                <div className="error-container err-r mr-n-6">
                                    {errors.department && touched.department && <p className='form-error'>{errors.department}</p>}
                                </div>
                            </div>

                        </div>

                        <div className="row row-md">
                            <span className='mylabel'>
                                <label className='m-3' htmlFor='building' name='building'>  اسم المبنى </label>
                            </span>
                            <span className='myinput '>
                                <div className="col myarea">
                                    <input className='inp1' onChange={handleChange} type="text" id="building" value={values.building}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    <div className="error-container err-r mr-n-6">
                                        {errors.building && touched.building && <p className='form-error'>{errors.building}</p>}
                                    </div>
                                </div>

                            </span>

                        </div>

                        <div className="row row-md">
                            <span className='mylabel'>
                                <label className='m-1' htmlFor='description' name='description'> وصف المبنى </label>
                            </span>
                            <span className='myinput '>
                                <div className="col myarea">
                                    <textarea className='w-50 m-auto' onChange={handleChange} type="text" id="description" value={values.description}
                                        onBlur={handleBlur}
                                    />
                                    {/* <div className="error-container err-r ">
                                        {errors.description && touched.description && <p className='form-error'>{errors.description}</p>}
                                    </div> */}
                                </div>

                            </span>

                        </div>


















                        <ToastContainer />

                        <button type='submit m-0' className="button mt-4">اضافة</button>

                    </div>
                </form>
            </div>
        </div>
    )

};

export default AddLocations;
