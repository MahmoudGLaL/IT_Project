import React, { Fragment, useContext, useEffect, useState } from "react";
import "./css/showpatients.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import { authcontext } from "../Context/authContext";
import { useFormik } from "formik";




const ShowDeviceLocation = () => {


    let { getLocations, AllLocations, AllDevLocations , getDeviceLocations } = useContext(authcontext);

    const [searched, setSearched] = useState(false);
    const [LocationName, setLocationName] = useState("");
    const [departName, setDepartName] = useState("");
    const [buildingName, setBuildingName] = useState("");
    const [Description, setDescription] = useState("");
    const [myId, setMyId] = useState("");
    const [searchCriteria, setSearchCriteria] = useState({ name: "", department: "", building: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOpt, setSelectedOpt] = useState("");

    const patientsPerPage = 5;
    const { locations , device } = AllDevLocations
    const {id} = useParams()

    let navigate = useNavigate();

    useEffect(() => {
        if(id)
        {
            getDeviceLocations(id)
        }
        // getDeviceLocations()
        getLocations()
        // console.log(AllLocations );
    }, []);



    const handleDelete = async(id,name) => {
        // console.log(id);
            console.log(id)
            await axios.delete(`http://localhost:5137/api/Information/${id}`).then( res => {
                toast.success(`تم حذف جهاز ${name} بنجاح`)
                getDeviceLocations(id)
            }
            ).catch(e => console.log(e) )



    };








    const { values, handleChange, handleBlur, handleSubmit, errors, touched, isValid } = useFormik({
        initialValues: {
            // id : myId ,
            name: LocationName,
            department: departName,
            building: buildingName,
            // description: "",
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            // values.userId = localStorage.getItem("id")
            console.log(values)
            console.log(myId)
            await axios.put(`http://localhost:5137/api/Locations/${myId}`, values).then(res => {
                console.log(res);
                toast.success("تم تعديل هذا الموقع بنجاح")
                getLocations()
            }
            ).catch(e => console.log(e))

        }
    })




    return (
        <>
            <div className=" show mx-5  ">
                <div className="row  gap-4 m-0  ">  
                    <div className="row locat  ">
                        <h5 className="mt-5">جميع مواقع الجهاز</h5>
                        <div className=' mb-3 d-flex justify-content-center gap-5 mt-n-3'>
                            <div className="row">
                                <label className=' m-0 light-red ' htmlFor='devicesNum' name='devicesNum'> اسم الجهاز </label>
                                <div className="col">
                                    <label className='text-dark' id="name">{device?.deviceName ? device?.deviceName : ""}  </label>
                                </div>
                            </div>
                            <div className="row">
                                <label className=' m-0 light-red ' htmlFor='devicesNum' name='devicesNum'>  النوع </label>
                                <div className="col ">
                                    <label className='text-dark' id="name">{device?.deviceType ? device?.deviceType : ""}</label>
                                </div>
                            </div>

                            <div className="row">
                                <label className=' m-0 light-red' htmlFor='devicesNum' name='devicesNum'>  رقم السيريال </label>
                                <div className="col">
                                    <label className='text-dark' id="name"> {device?.deviceSerialNumber ? device?.deviceSerialNumber : ""}</label>
                                </div>
                            </div>
                            
                        </div>

                        


                    </div>





                  

                </div>
            </div>

            {AllLocations.length > 0 ? (
                <table className="table table-striped table-hover mt-3 mx-1">
                    {searched ? <>

                        <thead >
                            <tr className="mb-5 py-2" >
                                <th>اسم الموقع</th>
                                <th>القسم</th>
                                <th>المبنى</th>
                                <th ></th>
                                <th ></th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>

                    </> : <>


                        <thead >
                            <tr className="mb-5 py-2" >
                                <th>اسم الموقع</th>
                                <th>القسم</th>
                                <th>المبنى</th>
                                {/* <th ></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {locations?.map(loc => (
                                <tr key={loc.id} className="text-center justify-content-center align-items-center">

                                    <>
                                        <td > {loc?.name} </td>
                                        <td > {loc?.department} </td>
                                        <td > {loc?.building} </td>



                                        {/* <td > <button className="btn danger mx-2 px-3 my-auto fs-5 py-2" onClick={() => handleDelete(AllDevLocations.id, loc.id ,AllDevLocations.name , loc.name)}>حذف</button> </td> */}

                                    </>

                                </tr>
                            ))}
                        </tbody>
                    </>}

                </table>


            ) : (
                <div className="text-muted">لم يتم اضافة مواقع بعد</div>
            )}


            <ToastContainer />

        </>
    );

};

export default ShowDeviceLocation;
