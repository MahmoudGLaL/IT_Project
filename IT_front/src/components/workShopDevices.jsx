import React, { Fragment, useContext, useEffect, useState } from "react";
import "./css/showpatients.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import { authcontext } from "../Context/authContext";
import Modellite from '../utils/model'

let val_1 = ''
let val_2 = ''
let val_3 = ''

const WorkshopDevices = () => {

    let { deviceData, get1Device, getDevices, AllDevices, getWorkShopDev, getTypes, LastDevLocations, getSpecTransaction, SpecTransaction,
        getDeviceLocation, getDeviceTransaction, DeviceTransaction, WorkShopDev } = useContext(authcontext);

    const [searched, setSearched] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState({ name: "", serialNumber: "" });
    const [currentPage, setCurrentPage] = useState(1);
    // const [selectedOpt, setSelectedOpt] = useState("");

    const patientsPerPage = 5;
    const navigate = useNavigate()

    const { id, name } = useParams()
    const { devices } = WorkShopDev

    useEffect(() => {
        if (id) {
            getWorkShopDev(id)
        }
        getDevices()
        getTypes()
        // console.log(allClinics);
    }, []);










    // const getEnd = async(id,startdate,name) => {
    //     // console.log(id);
    //     if(startdate === null)
    //         {
    //             toast.error(`عذرا عيادة ${name}ّ  لم تبدأ بعد`) 
    //         }
    //     else{
    //         await axios.put(`http://localhost:5137/api/Clinics/end/${id}`).then(
    //             toast.success(`تم انهاء عيادة ${name} بنجاح`)
    //         ).catch(e => console.log(e) )
    //     }

    //     GetClinincs()

    // };
    const handleDelete = async (id, name) => {
        // console.log(id);
        console.log(id)
        await axios.delete(`http://localhost:5137/api/Information/${id}`).then(res => {
            toast.success(`تم حذف جهاز ${name} بنجاح`)
            getDevices()
        }
        ).catch(e => console.log(e))

    };



    const handleSearchChange = (e) => {
        setSearched(true)



        const { name, value } = e.target;

        if (name === 'name') {
            val_2 = value
        }
        else if (name === 'serialNumber') {
            val_3 = value
        }

        setSearchCriteria(prevState => ({ ...prevState, [name]: value }));
        setCurrentPage(1);

        if (val_2 === '' && val_3 === '') {
            setSearched(false)
        }

    };

    const getData = (id) => {
        get1Device(id)
        getDeviceLocation(id)
    };


    const handleMove = (id) => {

        navigate(`/main/changeLocation/${id}`)
    };
    const handleUpdate = (id) => {

        navigate(`/main/UpdateDevices/${id}`)
    };
    // const handleFix = (id) => {

    //     navigate(`/main/Transactions/${id}`)
    // };
    const handleAddSpares = (id) => {
        navigate(`/main/deviceSpareparts/${id}`)
    };
    const showLocDev = (id) => {

        navigate(`/main/ShowDeviceLocation/${id}`)
    };

    const getDesc = (info_id) => {
        navigate(`/main/ShowDeviceTransaction/${info_id}`)

    };



    let filteredDevices = devices?.filter(Device => {

        // console.log(Device.deviceType)



        if (val_1 !== "" && val_2 === "" && val_3 !== "") {
            return (
                (searchCriteria.name && Device.name.toString().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : "")) &&

                (searchCriteria.serialNumber && Device.serialNumber.toString().includes(searchCriteria.serialNumber ? searchCriteria.serialNumber : ""))


            )
        }




        else {
            return (
                searchCriteria.name && Device.name.toLowerCase().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : "") ||

                searchCriteria.serialNumber && Device.serialNumber.toString().includes(searchCriteria.serialNumber ? searchCriteria.serialNumber : "")

            )
        }



    })


    // const handleDelete = async(id,name) => {
    //     // console.log(id);
    //         console.log(id)
    //         await axios.delete(`http://localhost:5137/api/Information/${id}`).then( res => {
    //             toast.success(`تم حذف جهاز ${name} بنجاح`)
    //             getDevices()
    //         }
    //         ).catch(e => console.log(e) )



    // };




    // Pagination logic
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = filteredDevices?.slice(indexOfFirstPatient, indexOfLastPatient);
    const totalPages = Math.ceil(filteredDevices?.length / patientsPerPage);



    return (
        <>
            <div className=" show mx-5  p-5 mt-3">
                <h5>جميع الأجهزة في <span className="light-red">"{name}"</span></h5>
                <div className="row ">



                    <div className="col">
                        <input
                            type="text"
                            className="form-control w-75"
                            placeholder=" ابحث عن اسم الجهاز"
                            name="name"
                            value={searchCriteria.DocName}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className="col">
                        <input
                            type="text"
                            className="form-control w-75"
                            placeholder=" ابحث عن رقم السيريال"
                            name="serialNumber"
                            value={searchCriteria.serialNumber}
                            onChange={handleSearchChange}
                        />
                    </div>



                    <div className="col mn-20">
                        <span><Link to={`/main/addDevices`} className="btn fw-bold ml-50 mn-1 " >أضف جهاز</Link></span>
                    </div>
                </div>
            </div>

            {AllDevices?.length > 0 ? (
                <>
                    <table className="table table-striped table-hover mt-3">
                        {searched ? <>

                            <thead >
                                <tr className="mb-5 py-2" >
                                    <th style={{ color: 'rgb(97, 0, 0)' }} >اسم الجهاز</th>
                                    {/* <th style={{ color: 'rgb(97, 0, 0)' }} >نوع الجهاز</th> */}

                                    <tr>
                                        <th></th>
                                    </tr>
                                    {/* <th >حالة البدأ</th> */}
                                    {/* <th >حالة الأنتهاء</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDevices?.map(Device => (
                                    <tr key={Device.id} className="text-center justify-content-center align-items-center">

                                        <>
                                            <td > {Device.name} </td>

                                            {/* <td >{Device.deviceType}</td> */}

                                            <td className="w-50" >
                                                <button data-bs-toggle="modal" href="#exampleModalToggle" role="button" className="btn fw-bold patient   mx-2 px-2 my-auto fs-5 py-2 " onClick={() => getData(Device.id)}>عرض المزيد</button>
                                                <button className="btn fw-bold yellow   mx-2 px-2 my-auto fs-5 py-2" onClick={() => handleUpdate(Device.id, Device.name)}>تعديل البيانات</button>
                                                <Link to={`/main/changeLocation/${Device.id}`} className="btn fw-bold bg-finish mx-2 px-2 my-auto fs-5 py-2" onClick={() => handleMove(Device.id)} > نقل الجهاز</Link>
                                                <button className="btn fw-bold cyan mx-2 px-2 my-auto fs-5 py-2" onClick={() => handleAddSpares(Device.id, Device.name)}>اضافة قطع غيار</button>
                                                <button className="btn fw-bold patient mx-2 px-2 my-auto fs-5 py-2" onClick={() => showLocDev(Device.id, Device.name)}>مواقع الجهاز</button>
                                                <button className="btn fw-bold  bg-graay mx-2 px-2 my-auto fs-5 py-2 " onClick={() => getDesc(Device.id)}>عرض الأعطال</button>
                                                {
                                                    localStorage.getItem("role") === "admin" && <><button className="btn fw-bold danger mx-2 px-2 my-auto fs-5 py-2" onClick={() => handleDelete(Device.id, Device.name)}>حذف</button></>
                                                }



                                            </td>

                                        </>

                                    </tr>
                                ))}
                            </tbody>

                        </> : <>


                            <thead >
                                <tr className="mb-5 py-2" >
                                    <th style={{ color: 'rgb(97, 0, 0)' }} >اسم الجهاز</th>

                                    <tr>
                                        <th></th>
                                    </tr>
                                    {/* <th>الحاله</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {devices?.map(Device => (
                                    <tr key={Device.id} className="text-center justify-content-center align-items-center">

                                        <>
                                            <td > {Device.name} </td>


                                            <td className="w-50" >
                                                <button data-bs-toggle="modal" href="#exampleModalToggle" role="button" className="btn fw-bold patient   mx-2 px-2 my-auto fs-5 py-2 " onClick={() => getData(Device.id)}>عرض المزيد</button>
                                                <button className="btn fw-bold yellow   mx-2 px-2 my-auto fs-5 py-2" onClick={() => handleUpdate(Device.id, Device.name)}>تعديل البيانات</button>
                                                <Link to={`/main/changeLocation/${Device.id}`} className="btn fw-bold bg-finish mx-2 px-2 my-auto fs-5 py-2" onClick={() => handleMove(Device.id)} > نقل الجهاز</Link>
                                                <button className="btn fw-bold cyan mx-2 px-2 my-auto fs-5 py-2" onClick={() => handleAddSpares(Device.id, Device.name)}>اضافة قطع غيار</button>
                                                <button className="btn fw-bold patient mx-2 px-2 my-auto fs-5 py-2" onClick={() => showLocDev(Device.id, Device.name)}>مواقع الجهاز</button>
                                                <button role="button" className="btn fw-bold bg-graay mx-2 px-2 my-auto fs-5 py-2 " onClick={() => getDesc(Device.id)}>عرض الأعطال</button>
                                                {
                                                    localStorage.getItem("role") === "admin" && <><button className="btn fw-bold danger mx-2 px-2 my-auto fs-5 py-2" onClick={() => handleDelete(Device.id, Device.name)}>حذف</button></>
                                                }



                                            </td>
                                            {/* <td>
                                        <button className="btn fw-bold bg-home  mx-2 px-2 my-auto fs-5 py-2" onClick={() => handleFix(Device.id)}>اصلاح الجهاز</button>
                                    </td> */}

                                        </>

                                    </tr>
                                ))}
                            </tbody>
                        </>}

                    </table>
                    <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                        <Modellite patData={deviceData} LastDevLocations={LastDevLocations} />
                    </div>
                    <div className="modal fade" id="exampleModalToggle-1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered ">
                            <div className="modal-content " >
                                <div className="modal-header">
                                    <h5 className=" m-auto modal-title" id="exampleModalToggleLabel"> **</h5>
                                    <button type="button" className="btn fw-bold-close position-absolute top-20 m-2 start-0" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body  ">
                                    <div className="row d-flex justify-content-center align-items-center m-auto w-100">
                                        <div className="w-100 ">



                                            <div className=" card w-100 p-5 border-0 rounded-4 d-flex justify-content-center">
                                                <h2 className="fs-2 light-red"> وصف العطل </h2>
                                                <>
                                                    <div className="row mt-4">
                                                        <div className="">
                                                            <h3 className="fs-2"> <span className="text-dark">{SpecTransaction.description ? SpecTransaction.description : ""}</span></h3>
                                                        </div>

                                                    </div>



                                                </>


                                            </div>






                                        </div>
                                    </div>
                                </div>


                                {/* <button className="btn fw-bold btn fw-bold-primary m-auto fs-3 w-25 mb-3" data-bs-dismiss="modal" onClick={() => handleEndPatient()} >تأكيد</button> */}
                            </div>

                        </div>
                    </div>
                </>
            ) : 
                <div className="">لم يتم اضافة اجهزه بعد</div>
            }

            <ToastContainer />

        </>
    );

};

export default WorkshopDevices;
