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

const LocationDevices = () => {

    let { deviceData, get1Device, getDevices, AllDevices, LocationGetDevices, AllTypes, getTypes, getDeviceLocation, AllDevLocations, LocationsAllDevices, LastDevLocations } = useContext(authcontext);

    const [searched, setSearched] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState({ name: "", deviceType: "", location: "", serialNumber: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOpt, setSelectedOpt] = useState("");
    const [DelId, setDelId] = useState("");
    const [DelName, setDelName] = useState("");

    const patientsPerPage = 5;
    const navigate = useNavigate()

    const { id, name } = useParams()

    useEffect(() => {
        if (id) {
            LocationGetDevices(id)
        }
        getDevices()
        getTypes()
        // console.log(allClinics);
    }, []);




    async function handleGet(id, name) {
        // console.log(id);
        setDelId(id)
        setDelName(name)

    };





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




    const handleSearchChange = (e) => {
        setSearched(true)



        const { name, value } = e.target;
        if (name === 'deviceType') {
            if (value === '0') {
                setSearched(false)
            }
            val_1 = value
            // console.log(value);
            setSelectedOpt(value)
            searchCriteria.deviceType = selectedOpt
        }
        else if (name === 'name') {
            val_2 = value
        }
        else if (name === 'serialNumber') {
            val_3 = value
        }
        setSearchCriteria(prevState => ({ ...prevState, [name]: value }));
        setCurrentPage(1);

        if (val_1 === '' && val_2 === '' && val_3 === '') {
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
    const handleFix = (id) => {

        navigate(`/main/Transactions/${id}`)
    };
    const handleAddSpares = (id) => {
        navigate(`/main/deviceSpareparts/${id}`)
    };
    const showLocDev = (id) => {

        navigate(`/main/ShowDeviceLocation/${id}`)
    };
    const getDesc = (info_id) => {
        navigate(`/main/ShowDeviceTransaction/${info_id}`)

    };


    let filteredDevices = LocationsAllDevices?.filter(Device => {

        // console.log(Device.deviceType)

        if (val_1 !== "" && val_2 !== "" && val_3 === "") {
            return (
                (searchCriteria.name && Device.name.toLowerCase().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : "")) &&

                (searchCriteria.deviceType && Device.deviceType.toString().includes(searchCriteria.deviceType ? searchCriteria.deviceType.toLowerCase() : ""))

            )
        }
        else if (val_1 !== "" && val_2 !== "" && val_3 !== "") {

            return (
                (searchCriteria.name && Device.name.toLowerCase().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : "")) &&

                (searchCriteria.serialNumber && Device.serialNumber.toString().includes(searchCriteria.serialNumber ? searchCriteria.serialNumber : "")) &&



                (searchCriteria.deviceType && Device.deviceType.toString().includes(searchCriteria.deviceType ? searchCriteria.deviceType.toLowerCase() : ""))

            )
        }
        else if (val_1 !== "" && val_2 === "" && val_3 !== "") {
            return (
                (searchCriteria.deviceType && Device.deviceType.toString().includes(searchCriteria.deviceType ? searchCriteria.deviceType.toLowerCase() : "")) &&

                (searchCriteria.serialNumber && Device.serialNumber.toString().includes(searchCriteria.serialNumber ? searchCriteria.serialNumber : ""))


            )
        }




        else {
            return (
                searchCriteria.name && Device.name.toLowerCase().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : "") ||

                searchCriteria.serialNumber && Device.serialNumber.toString().includes(searchCriteria.serialNumber ? searchCriteria.serialNumber : "") ||

                searchCriteria.deviceType && Device.deviceType.toString().includes(searchCriteria.deviceType ? searchCriteria.deviceType.toLowerCase() : "")

            )
        }



    })

    const handleDelete = async (id, name) => {
        // console.log(id);
        console.log(id)
        await axios.delete(`http://localhost:5137/api/Information/${id}/${localStorage.getItem('id')}`).then(res => {
            toast.success(`تم حذف جهاز ${name} بنجاح`)
            getDevices()
        }
        ).catch(e => console.log(e))



    };




    // Pagination logic
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = filteredDevices?.slice(indexOfFirstPatient, indexOfLastPatient);
    const totalPages = Math.ceil(filteredDevices?.length / patientsPerPage);



    return (
        <>
            <div className=" show mx-5  p-5 mt-3">
                <h5>جميع اجهزة {name}</h5>
                <div className="row ">

                    <div className="col ">

                        <select className="show-sl mt-2 " name="deviceType" id="item" onChange={handleSearchChange} value={selectedOpt} >
                            <option value="" selected disabled >اختر نوع الجهاز</option>
                            {AllTypes ? AllTypes.map((type) => (
                                <>
                                    <option type="item" id="item" value={type.name} >{type.name}</option>
                                </>
                            )) : <>لم يتم اضافة انواع الأجهزه بعد </>}
                            <option type="item" id="item" value="0" >الكل</option>
                        </select>

                    </div>

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

                    {/* <div className="col">
                        <input
                            type="text"
                            className="form-control w-75"
                            placeholder=" ابحث عن اخر موقع"
                            name="serialNumber"
                            value={searchCriteria.serialNumber}
                            onChange={handleSearchChange}
                        />
                    </div> */}
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


                    {/* <div className="col py-3 w-100 ">
                            <select className="show-sl" name="show-sl" id="item" onChange={handleSelect} value={searchCriteria.userRole} >
                                <option value="0" selected >اختر صلاحية المضيف</option>
                                <option type="item" id="item" value="admin">admin</option>
                                <option type="item" id="item" value="user" >user</option>
                            </select>
                        </div> */}
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
                                    {/* <th style={{ color: 'rgb(97, 0, 0)' }}>الموقع</th> */}
                                    <th style={{ color: 'rgb(97, 0, 0)' }}>نوع الجهاز</th>
                                    {/* <th style={{ color: 'rgb(97, 0, 0)' }}>المعالج</th> */}
                                    <tr>
                                        <th></th>
                                    </tr>
                                    {/* <th >حالة البدأ</th> */}
                                    {/* <th >حالة الأنتهاء</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDevices?.map(Device => (
                                    <>
                                        <tr key={Device.id} className="text-center justify-content-center align-items-center">
                                            {/* {device.startDate?.slice(0,10) === new Date().toISOString().slice(0, 10) ? */}
                                            <>
                                                <td > {Device.name} </td>
                                                {/* <td > {Device.location} </td> */}
                                                {/* <td > {Device.type === 0 ? <>عسكريين</> : <>مدنيين</>} </td> */}
                                                <td >{Device.deviceType}</td>

                                                <td className="w-50" >
                                                    <button data-bs-toggle="modal" href="#exampleModalToggle" role="button" className="btn fw-bold patient   mx-2 px-2 my-auto fs-5 py-2 " onClick={() => getData(Device.id)}>عرض المزيد</button>
                                                    <button className="btn fw-bold yellow   mx-2 px-2 my-auto fs-5 py-2" onClick={() => handleUpdate(Device.id, Device.name)}>تعديل البيانات</button>
                                                    <Link to={`/main/changeLocation/${Device.id}`} className="btn fw-bold bg-finish mx-2 px-2 my-auto fs-5 py-2" > نقل الجهاز</Link>
                                                    <button className="btn fw-bold teal  mx-2 px-2 my-auto fs-5 py-2" onClick={() => handleFix(Device.id, Device.name)}>صيانة الجهاز</button>
                                                    <button className="btn fw-bold cyan mx-2 px-2 my-auto fs-5 py-2" onClick={() => handleAddSpares(Device.id, Device.name)}>اضافة قطع غيار</button>
                                                    <button className="btn fw-bold patient mx-2 px-2 my-auto fs-5 py-2" onClick={() => showLocDev(Device.id, Device.name)}>مواقع الجهاز</button>
                                                    <button className="btn fw-bold  bg-graay mx-2 px-2 my-auto fs-5 py-2 " onClick={() => getDesc(Device.id)}>عرض الأعطال</button>
                                                    {
                                                        (localStorage.getItem("role") === 'SuperAdmin' || localStorage.getItem("role") === 'admin' ) && <button className="btn fw-bold danger mx-2 px-2 my-auto fs-5 py-2" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@fat" onClick={() => handleGet(Device.id, Device.name)}>حذف</button>
                                                    }


                                                </td>
                                                {/* <td > {clinic.startDate === null ? <button className="btn fw-bold bg-blue mx-2 px-5 my-2 py-2" type="submit" onClick={()=>getStart(clinic.id , clinic.clinicName)} >ابدأ</button> : <h3 className="fs-3">تم البدأ</h3>} </td> */}
                                                {/* <td > {clinic.endDate === null ? <button className="btn fw-bold danger mx-2 px-5 my-2  " type="submit" onClick={()=>getEnd(clinic.id , clinic.startDate ,clinic.clinicName)} >انهى</button> : <h3 className="fs-3">تم الأنتهاء</h3>}</td> */}
                                            </>
                                            { /* : <></> */}
                                        </tr>
                                        <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header position-relative">
                                                        <h5 className="modal-title" id="exampleModalLabel"> هل انت متأكد من انك تريد حذف هذا النوع ؟</h5>
                                                        <button type="button" className="btn-close position-absolute fs-5 top-20 m-2 start-0" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="pb-3  ">


                                                        <div className="w-100 d-flex justify-content-center align-items-center">
                                                            <button type="button" className="btn red  fs-5 py-1 mx-5 " data-bs-dismiss="modal" onClick={() => handleDelete(DelId, DelName)}>
                                                                نعم
                                                            </button>
                                                            <button type="submit" className="btn bg-green fs-5 py-1 mx-5" data-bs-dismiss="modal" >
                                                                لا
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>

                                ))}
                            </tbody>

                        </> : <>


                            <thead >
                                <tr className="mb-5 py-2" >
                                    <th style={{ color: 'rgb(97, 0, 0)' }} >اسم الجهاز</th>
                                    {/* <th style={{ color: 'rgb(97, 0, 0)' }}>الموقع</th> */}
                                    <th style={{ color: 'rgb(97, 0, 0)' }}>نوع الجهاز</th>
                                    {/* <th style={{ color: 'rgb(97, 0, 0)' }}>المعالج</th> */}
                                    <tr>
                                        <th></th>
                                    </tr>
                                </tr>
                            </thead>
                            <tbody>
                                {LocationsAllDevices.map(Device => (
                                    <>
                                        <tr key={Device.id} className="text-center justify-content-center align-items-center">
                                            {/* {device.startDate?.slice(0,10) === new Date().toISOString().slice(0, 10) ? */}
                                            <>
                                                <td > {Device.name} </td>
                                                {/* <td > {Device.location} </td> */}
                                                {/* <td > {Device.type === 0 ? <>عسكريين</> : <>مدنيين</>} </td> */}
                                                <td >{Device.deviceType}</td>

                                                <td className="w-50" >
                                                    <button data-bs-toggle="modal" href="#exampleModalToggle" role="button" className="btn fw-bold patient   mx-2 px-2 my-auto fs-5 py-2 " onClick={() => getData(Device.id)}>عرض المزيد</button>
                                                    <button className="btn fw-bold yellow   mx-2 px-2 my-auto fs-5 py-2" onClick={() => handleUpdate(Device.id, Device.name)}>تعديل البيانات</button>
                                                    <Link to={`/main/changeLocation/${Device.id}`} className="btn fw-bold bg-finish mx-2 px-2 my-auto fs-5 py-2" > نقل الجهاز</Link>
                                                    <button className="btn fw-bold teal  mx-2 px-2 my-auto fs-5 py-2" onClick={() => handleFix(Device.id, Device.name)}>صيانة الجهاز</button>
                                                    <button className="btn fw-bold cyan mx-2 px-2 my-auto fs-5 py-2" onClick={() => handleAddSpares(Device.id, Device.name)}>اضافة قطع غيار</button>
                                                    <button className="btn fw-bold patient mx-2 px-2 my-auto fs-5 py-2" onClick={() => showLocDev(Device.id, Device.name)}>مواقع الجهاز</button>
                                                    <button className="btn fw-bold  bg-graay mx-2 px-2 my-auto fs-5 py-2 " onClick={() => getDesc(Device.id)}>عرض الأعطال</button>
                                                    {
                                                        (localStorage.getItem("role") === 'SuperAdmin' || localStorage.getItem("role") === 'admin' )  && <button className="btn fw-bold danger mx-2 px-2 my-auto fs-5 py-2" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@fat" onClick={() => handleGet(Device.id, Device.name)}>حذف</button>
                                                    }


                                                </td>
                                                {/* <td > {clinic.startDate === null ? <button className="btn fw-bold bg-blue mx-2 px-5 my-2 py-2" type="submit" onClick={()=>getStart(clinic.id , clinic.clinicName)} >ابدأ</button> : <h3 className="fs-3">تم البدأ</h3>} </td> */}
                                                {/* <td > {clinic.endDate === null ? <button className="btn fw-bold danger mx-2 px-5 my-2  " type="submit" onClick={()=>getEnd(clinic.id , clinic.startDate ,clinic.clinicName)} >انهى</button> : <h3 className="fs-3">تم الأنتهاء</h3>}</td> */}
                                            </>
                                            { /* : <></> */}
                                        </tr>
                                        <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header position-relative">
                                                        <h5 className="modal-title" id="exampleModalLabel"> هل انت متأكد من انك تريد حذف هذا النوع ؟</h5>
                                                        <button type="button" className="btn-close position-absolute fs-5 top-20 m-2 start-0" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="pb-3  ">


                                                        <div className="w-100 d-flex justify-content-center align-items-center">
                                                            <button type="button" className="btn red  fs-5 py-1 mx-5 " data-bs-dismiss="modal" onClick={() => handleDelete(DelId, DelName)}>
                                                                نعم
                                                            </button>
                                                            <button type="submit" className="btn bg-green fs-5 py-1 mx-5" data-bs-dismiss="modal" >
                                                                لا
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </tbody>
                        </>}

                    </table>
                    <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                        <Modellite patData={deviceData} LastDevLocations={LastDevLocations} />
                    </div>
                </>
            ) : (
                <div className="text-muted">لم يتم اضافة اجهزه بعد</div>
            )}

            <ToastContainer />

        </>
    );

};

export default LocationDevices;
