import React, { useEffect, useState } from "react";
import "./css/showpatients.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { clinicSchema } from "./schemas/schema";
import { useFormik } from "formik";
import axios from "axios";
import { useContext } from "react";
import { authcontext } from "../Context/authContext";





const ChangeLocation = () => {
    const initialValues = {
        deliveryDate: "",
    }
    const { id , userID } = useParams()
    const [locationId, setLocationId] = useState(null)
    let { deviceData, get1Device ,getLocations, AllLocations, LastDevLocations, getDeviceLocation } = useContext(authcontext);


    // console.log(id);

    useEffect(() => {
        if(id)
        {
            getDeviceLocation(id)
            get1Device(id)
        }
        getLocations()
    }, [id])


    const handleSelect = (e) => {
        setLocationId(e.target.value)

    }

    // const hours = new Date().getHours()
    // const minutes = new Date().getMinutes();
    // console.log(hours+':'+minutes);

    const {  handleBlur, handleSubmit} = useFormik({
        initialValues,
        //   validationSchema: clinicSchema,
        onSubmit: async (values , actions) => {
            // values.userId = localStorage.getItem("id")
            console.log(values)
            await axios.put(`http://localhost:5137/api/Information/ChangeDeviceLocation/${id}/${locationId}/${userID}`, values).then(res => {
                // console.log(res);
                toast.success("تم تغيير موقع الجهاز بنجاح")
                getDeviceLocation(id)
                actions.resetForm()
            }

            ).catch(e => toast.error(e.response?.data))

        }
    })




    return (
        <div className='m-cont' >
            <div className="w-90 p-1 border-0 rounded-4 ">

                <form onSubmit={handleSubmit} className='form' >
                    <div className="my-container bg-gray pt-0 pb-5 mt-4 mb-4 t-5 ">

                        {/* <modal open = {openModal}/> */}

                        <h2 className='mt-5  '>تغيير موقع الجهاز</h2>
                        {/* <span className="underline"></span> */}

                        {/* patient data */}
                        <div className="row  devices mt-3 trans  ">




                            <div className="row locat mt-3 mb-4 ">
                                <span className='mylabel mb-2 d-flex justify-content-center gap-5'>
                                    <div className="row">
                                    <label className=' m-0 ' htmlFor='devicesNum' name='devicesNum'> اسم الجهاز </label>
                                        <div className="col">
                                            <label className='text-dark' id="name">{ deviceData.name ? deviceData.name : ""}  </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <label className=' m-0 ' htmlFor='devicesNum' name='devicesNum'> الموقع الحالي </label>
                                        <div className="col">
                                            <label className='text-dark' id="name">{ LastDevLocations.name ? LastDevLocations.name : ""}  </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className=' m-0 ' htmlFor='devicesNum' name='devicesNum'>  قسم </label>
                                        <div className="col">
                                            <label className='text-dark' id="name">{LastDevLocations.department ? LastDevLocations.department : ""}</label>
                                        </div>
                                    </div>

                                   <div className="row">
                                        <label className=' m-0 ' htmlFor='devicesNum' name='devicesNum'>  مبنى </label>
                                        <div className="col">
                                            <label className='text-dark' id="name"> {LastDevLocations.building ? LastDevLocations.building : ""}</label>
                                        </div>
                                   </div>
                                </span>
                           

                            </div>
                            <div className="row locat mt-3 mb-4 ">
                                <span className='mylabel mb-2'>
                                    <label className=' m-0 ' htmlFor='devicesNum' name='devicesNum'> الموقع الجديد </label>
                                </span>
                                <div className="col sel mb-2">
                                    <span className='myinput'>

                                        <select className='inp1' onChange={handleSelect} type="text" id="deviceLocation"
                                            name='deviceLocation'
                                            value={locationId}
                                            onBlur={handleBlur}
                                            required
                                        >
                                            <option value="" selected disabled >اختر موقع الجهاز</option>
                                            {AllLocations?.map((locat) => (
                                                <>
                                                    <option type="item" id="item" value={locat.id}>{locat.name}</option>
                                                </>

                                            ))}

                                        </select>

                                    </span>
                                </div>

                            </div>






                        </div>











                        

                        <button type='submit m-0' className="button">تغيير</button>

                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )

};

export default ChangeLocation;
