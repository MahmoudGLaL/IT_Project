import React, { useState } from "react";
import "./css/showpatients.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { clinicSchema, workShops } from "./schemas/schema";
import { useFormik } from "formik";
import axios from "axios";





const WorkShops = () => {
    const initialValues = {
        name: "",
        description: "",
        campanyName: "",
        userId :  parseInt(localStorage.getItem("id"))
    }

    const [isFound, setIsFound] = useState(false)
    const [selected, setSelected] = useState(false)
    const navigate = useNavigate()

    const handleError = (e) => {
        e.preventDefault()
        toast.error(" من فضلك تأكد من صحة جميع البيانات ")
    }
    const handleSelect = (e) => {
        setSelected(e.target.value)
        if (e.target.value === '1') {
            // console.log('yes');
            setIsFound(true)
        }
        else {
            // console.log('no');
            setIsFound(false)
        }
    }

    // const hours = new Date().getHours()
    // const minutes = new Date().getMinutes();
    // console.log(hours+':'+minutes);

    const { values, handleChange, handleBlur, handleSubmit, errors, touched, isValid } = useFormik({
        initialValues,
        validationSchema: workShops,
        onSubmit: async (values , actions) => {
            // values.userId = localStorage.getItem("id")
            console.log(values)
            await axios.post("http://localhost:5137/api/Workshops", values).then(res => {
                console.log(res);
                
                toast.success("تم اضافة الورشه بنجاح")
                actions.resetForm()
                setTimeout(()=> {navigate('/main/showWorkShops')} ,[1000])
            }
            ).catch(e => {console.log(e)
                toast.error("اسم الورشه موجود بالفعل")
            })

        }
    })



    return (
        <div className='m-cont' >
            <div className="w-90 p-1 border-0 rounded-4 ">

                <form onSubmit={isValid ? handleSubmit : handleError} className='form' >
                    <div className="my-container bg-gray pt-0 pb-5 mt-5 t-3 ">

                        {/* <modal open = {openModal}/> */}

                        <h2 className='mt-5  '>ورش العمل</h2>
                        {/* <span className="underline"></span> */}

                        {/* patient data */}
                        <div className="row  mt-3 ">

                            <div className="col">
                                <span className='mylabel'>
                                    <label className='' htmlFor='name' name='name'> اسم الورشه   </label>
                                </span>
                                <span className='myinput'>
                                    <input className='inp1 ' onChange={handleChange} type="text" id="name" value={values.name}
                                        onBlur={handleBlur}
                                        required
                                    />
                                </span>

                                <div className="error-container err-r ">
                                    {errors.name && touched.name && <p className='form-error'>{errors.name}</p>}
                                </div>

                            </div>
                        </div>
                        <div className="row">

                            <div className="col ">
                                <span className='mylabel'>
                                    <label className='4 ' htmlFor='companyName' > شركة الصيانه</label>
                                </span>
                                <span className='myinput' >
                                    <select name="" id="" className='inp1' onChange={handleSelect} value={selected}
                                        required >
                                        <option value="0">لايوجد</option>
                                        <option value="1">يوجد</option>
                                    </select>

                                </span>

                            </div>

                        </div>
                        {isFound && <div className="row mt-4">

                            <div className="col ">
                                <span className='mylabel' >
                                    <label htmlFor='companyName' > اسم الشركه </label>
                                </span>
                                <span className='myinput' >
                                    <input className='inp1' onChange={handleChange} type="text" id="campanyName" value = {values.campanyName}
                                        name='campanyName'
                                        onBlur={handleBlur}
                                        required
                                    />
                                </span>

                                <div className="error-container err-r">
                                    {errors.campanyName && touched.campanyName && <p className='form-error'>{errors.campanyName}</p>}
                                </div>
                            </div>

                        </div>
                        }




                        <div className="row row-md">
                            <span className='mylabel'>
                                <label className='m-3' htmlFor='description' name='description'> وصف الورشه </label>
                            </span>
                            <span className='myinput '>
                                <div className="col myarea">
                                    <textarea className='w-50 m-auto' onChange={handleChange} type="text" id="description" value={values.description}
                                        name="description"
                                        onBlur={handleBlur}
                                    />

                                </div>

                            </span>

                        </div>


















                       

                        <button type='submit m-0' className="button mt-4">اضافة</button>

                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )

};

export default WorkShops;
