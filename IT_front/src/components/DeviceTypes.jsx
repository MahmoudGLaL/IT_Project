import React from "react";
import "./css/showpatients.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { deviceSpecifications } from "./schemas/schema";
import { useFormik } from "formik";
import axios from "axios";





const DeviceTypes = () => {
    const initialValues = {
        name: "",
        createdAt: "2024-09-07T07:41:46.111Z",
    }
    const navigate = useNavigate()

    const handleError = (e) => {
        e.preventDefault()
        toast.error(" من فضلك تأكد من صحة جميع البيانات ")
    }

    // const hours = new Date().getHours()
    // const minutes = new Date().getMinutes();
    // console.log(hours+':'+minutes);

    const { values, handleChange, handleBlur, handleSubmit, errors, touched, isValid } = useFormik({
        initialValues,
        //   validationSchema: deviceSpecifications,
        onSubmit: async (values , actions) => {
            // values.userId = localStorage.getItem("id")
            // console.log(values)
            await axios.post("http://localhost:5137/api/DeviceTypes", values).then(res => {
                // console.log(res);
                toast.success("تم اضافة النوع بنجاح")
                actions.resetForm()
                setTimeout(()=> {navigate('/main/showTypes')} ,[1200])
                
            }
            ).catch(e => console.log(e))

        }
    })




    return (
        <div className='Contta' >
            <div className="w-90 p-1 border-0 rounded-4 ">

                <form onSubmit={isValid ? handleSubmit : handleError} className='form' >
                    <div className="my-container bg-gray pt-0 pb-5 mt-4 mb-4 ">

                        {/* <modal open = {openModal}/> */}

                        <h2 className='mt-5  '>انواع الأجهزه</h2>
                        {/* <span className="underline"></span> */}

                        {/* patient data */}
                        <div className="row  devices mt-3 spec  ">

                            <div className="col mx-1">
                                <span className='mylabel'>
                                    <label className='mb-3' htmlFor='name' name='name'> اسم النوع   </label>
                                </span>
                                <span className='myinput'>
                                    <input className='inp1' onChange={handleChange} type="text" id="name" value={values.name}
                                        onBlur={handleBlur}
                                        required
                                    />
                                </span>

                                <div className="error-container">
                                    {errors.name && touched.name && <p className='form-error'>{errors.name}</p>}
                                </div>

                            </div>








                        </div>











                     

                        <button type='submit ' className="button mt-4">اضافة</button>

                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )

};

export default DeviceTypes;
