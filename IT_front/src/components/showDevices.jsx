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


const ShowDevices = () => {
    // const id = localStorage.getItem("id")
    let { deviceData, get1Device, getDevices, AllDevices, getLocations, AllLocations, LocationGetDevices, LocationsAllDevices,
        AllTypes, getTypes, getDeviceLocation, LastDevLocations, getAllInfo, AllInfo, returnToInventory } = useContext(authcontext);

    const [searched, setSearched] = useState(false);
    const [searchedLoc, setSearchedLoc] = useState(false);
    const [DelId, setDelId] = useState("");
    const [DelName, setDelName] = useState("");
    const [searchCriteria, setSearchCriteria] = useState({ name: "", deviceType: "", location: "", serialNumber: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOpt, setSelectedOpt] = useState("");
    const [toggle, setToggle] = useState(true)
    const [toggle1, setToggle1] = useState(true)

    const patientsPerPage = 5;
    const navigate = useNavigate()


    useEffect(() => {
        getLocations()
        getDevices()
        getTypes()
        getAllInfo()
        // console.log(allClinics);
    }, []);










    const handleDelete = async (id, name) => {
        console.log(id);
        console.log(id)
        await axios.delete(`http://localhost:5137/api/Information/${id}/${localStorage.getItem('id')}`).then(res => {
            toast.success(`تم حذف جهاز ${name} بنجاح`)
            getDevices()
            getAllInfo()
        }
        ).catch(e => console.log(e))

    };




    const handleSearchChange = (e) => {
        setSearched(true)



        const { name, value } = e.target;
        if (name === 'deviceType') {
            setToggle1(false)
            if (value === '0') {
                setSearched(false)
            }
            val_1 = value
            // console.log(value);
            setSelectedOpt(value)
            searchCriteria.deviceType = selectedOpt
        }
        else if (name === 'name') {
            setToggle1(false)
            val_2 = value
        }
        else if (name === 'serialNumber') {
            setToggle1(false)
            val_3 = value
        }
        else if (name === 'location') {
            setToggle(false)
            if (value === '0') {
                setSearchedLoc(false)
            }
            else {

                setSearchedLoc(true)
                LocationGetDevices(value)
            }
            // filteredDevices = LocationsAllDevices

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
        // getDeviceLocation(id)
        navigate(`/main/changeLocation/${id}/${localStorage.getItem("id")}`)
    };
    const handleUpdate = (id) => {
        // get1Device(id)
        navigate(`/main/UpdateDevices/${id}`)
    };
    const handleFix = (id) => {
        // get1Device(id)
        navigate(`/main/Transactions/${id}`)
    };
    const handleAddSpares = (id) => {
        // get1Device(id)
        // getDeviceSpares(id)
        navigate(`/main/deviceSpareparts/${id}`)
    };
    const showLocDev = (id) => {

        navigate(`/main/ShowDeviceLocation/${id}`)
    };

    const getDesc = (info_id) => {
        navigate(`/main/ShowDeviceTransaction/${info_id}`)

    };
    const returnDevice = (info_id) => {
        returnToInventory(info_id, localStorage.getItem("id"))
    };
    // const getBarcode = (id) => {

    //     navigate(`/main/barcode/${id}`)
    // };


    async function handleGet(id,name) {
        // console.log(id);
       setDelId(id)
       setDelName(name)

    };



    let filteredDevices = AllDevices?.filter(Device => {

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

                (searchCriteria.serialNumber && Device.serialNumber.toString().toLowerCase().includes(searchCriteria.serialNumber.toLowerCase() ? searchCriteria.serialNumber.toLowerCase() : "")) &&



                (searchCriteria.deviceType && Device.deviceType.toString().includes(searchCriteria.deviceType ? searchCriteria.deviceType.toLowerCase() : ""))

            )
        }
        else if (val_1 !== "" && val_2 === "" && val_3 !== "") {
            return (
                (searchCriteria.deviceType && Device.deviceType.toString().includes(searchCriteria.deviceType ? searchCriteria.deviceType.toLowerCase() : "")) &&

                (searchCriteria.serialNumber && Device.serialNumber.toString().toLowerCase().includes(searchCriteria.serialNumber.toLowerCase() ? searchCriteria.serialNumber.toLowerCase() : ""))


            )
        }




        else {
            return (
                searchCriteria.name && Device.name.toLowerCase().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : "") ||

                searchCriteria.serialNumber && Device.serialNumber.toString().toLowerCase().includes(searchCriteria.serialNumber.toLowerCase() ? searchCriteria.serialNumber.toLowerCase() : "") ||

                searchCriteria.deviceType && Device.deviceType.toString().includes(searchCriteria.deviceType ? searchCriteria.deviceType.toLowerCase() : "")

            )
        }



    })




    // Pagination logic
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = filteredDevices?.slice(indexOfFirstPatient, indexOfLastPatient);
    const totalPages = Math.ceil(filteredDevices?.length / patientsPerPage);



    return (
        <>
            <div className=" show mx-5  p-5 ">

                <h1 className="mb-5">جميع الاجهزه</h1>

                <div className="row mb-5 light-gray num-dev  ">
                    <div className="col ">
                        <label className=' m-0 light-red' htmlFor='devicesNum' name='devicesNum'> عدد الأجهزه</label>
                        <div className="col">
                            <label className='text-dark' id="name">{AllInfo?.deviceCount} </label>
                        </div>

                    </div>
                    <div className="col ">
                        <label className=' m-0 light-red' htmlFor='devicesNum' name='devicesNum'> عدد المواقع</label>
                        <div className="col">
                            <label className='text-dark' id="name">{AllLocations ? AllLocations.length : 0} </label>
                        </div>

                    </div>
                    <div className="col ">
                        <label className=' m-0 light-red' htmlFor='devicesNum' name='devicesNum'> عدد اصناف قطع الغيار</label>
                        <div className="col">
                            <label className='text-dark' id="name">{AllInfo.spareParts ? AllInfo.spareParts.length : 0} </label>
                        </div>

                    </div>
                    <div className="col ">
                        <label className=' m-0 light-red' htmlFor='devicesNum' name='devicesNum'> عدد الورش</label>
                        <div className="col">
                            <label className='text-dark' id="name">{AllInfo?.workshopCount} </label>
                        </div>

                    </div>

                </div>




                <div className="row ">
                    {
                        toggle1 && <>
                            <div className="col">
                                <span className='myinput'>
                                    <select className='inp1 w-75' onChange={handleSearchChange}
                                        name="location"
                                        value={searchCriteria.location}
                                        required
                                    >
                                        <option value="" selected disabled >موقع الجهاز</option>
                                        {AllLocations?.map((locat) => (
                                            <>
                                                <option type="item" id="item" value={locat.id}>{locat.name}</option>
                                            </>

                                        ))}
                                        <option type="item" id="item" value="0" >الكل</option>

                                    </select>

                                </span>



                            </div></>
                    }

                    {
                        !searchedLoc && <>
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

                        </>
                    }




                    {localStorage.getItem("role") !== "user" && <div className="col mn-20">
                        <span><Link to={`/main/addDevices`} className="btn fw-bold ml-50 mn-1 " >أضف جهاز</Link></span>
                    </div>}

                </div>
            </div>

            {AllDevices?.length > 0 ? (
                <>
                    <table className="table table-striped table-hover mt-3">
                        {
                            searchedLoc ? <>
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

                                    {LocationsAllDevices?.map(Device => (
                                             <>
                                             <tr key={Device.id} className="text-center justify-content-center align-items-center">
                                                 {/* {Device.startDate?.slice(0,10) === new Date().toISOString().slice(0, 10) ? */}
                                                 <>
                                                     <td > {Device.name} </td>
                                                     {/* <td > {Device.location} </td> */}
                                                     {/* <td > {Device.type === 0 ? <>عسكريين</> : <>مدنيين</>} </td> */}
                                                     <td >{Device.deviceType}</td>

                                                     <td className="w-50" >
                                                         <button data-bs-toggle="modal" href="#exampleModalToggle" role="button" className="btn fw-bold patient   mx-1 px-1 my-auto fs-5 py-2 " onClick={() => getData(Device.id)}>عرض المزيد</button>
                                                         <button className="btn fw-bold yellow   mx-1 px-1 my-auto fs-5 py-2" onClick={() => handleUpdate(Device.id, Device.name)}>تعديل البيانات</button>
                                                         <button className="btn fw-bold bg-finish mx-1 px-1 my-auto fs-5 py-2" onClick={() => handleMove(Device.id)} > نقل الجهاز</button>
                                                         <button className="btn fw-bold teal  mx-1 px-1 my-auto fs-5 py-2" onClick={() => handleFix(Device.id, Device.name)}>صيانة الجهاز</button>
                                                         <button className="btn fw-bold cyan mx-1 px-1 my-auto fs-5 py-2" onClick={() => handleAddSpares(Device.id, Device.name)}>اضافة قطع غيار</button>
                                                         <button className="btn fw-bold patient mx-1 px-1 my-auto fs-5 py-2" onClick={() => showLocDev(Device.id, Device.name)}> مواقع الجهاز</button>
                                                         <button className="btn fw-bold  bg-graay mx-1 px-1 my-auto fs-5 py-2 " onClick={() => getDesc(Device.id)}>عرض الأعطال</button>
                                                         <button className="btn fw-bold  bg-pa mx-1 px-1 my-auto fs-5 py-2 " onClick={() => returnDevice(Device.id)}> سحب الجهاز</button>
                                                         {/* <button className="btn fw-bold bg-pa mx-1 px-1 my-auto fs-5 py-2" onClick={() => getBarcode(Device.id, Device.name)}>طباعة الباركود</button> */}
                                                         {
                                                             (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "SuperAdmin") && <><button className="btn fw-bold danger mx-1 px-1 my-auto fs-5 py-2" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@fat"  onClick={() => handleGet(Device.id, Device.name)} >حذف</button></>
                                                         }

                                                     </td>
                                                     {/* <td > {Device.proccessor} </td> */}
                                                     {/* <td > {Device.username} </td> */}
                                                     {/* <td > {Device.startDate === null ? <button className="btn fw-bold bg-blue mx-1 px-5 my-2 py-2" type="submit" onClick={()=>getStart(clinic.id , clinic.clinicName)} >ابدأ</button> : <h3 className="fs-3">تم البدأ</h3>} </td> */}
                                                     {/* <td > {clinic.endDate === null ? <button className="btn fw-bold danger mx-1 px-5 my-2  " type="submit" onClick={()=>getEnd(clinic.id , clinic.startDate ,clinic.clinicName)} >انهى</button> : <h3 className="fs-3">تم الأنتهاء</h3>}</td> */}
                                                 </>
                                                 { /* : <></> */}
                                             </tr>
                                             <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                 <div className="modal-dialog">
                                                     <div className="modal-content">
                                                         <div className="modal-header position-relative">
                                                             <h5 className="modal-title" id="exampleModalLabel"> هل انت متأكد من انك تريد حذف هذا الجهاز ؟</h5>
                                                             <button type="button" className="btn-close position-absolute fs-5 top-20 m-2 start-0" data-bs-dismiss="modal" aria-label="Close"></button>
                                                         </div>
                                                         <div className="pb-3  ">


                                                             <div className="w-100 d-flex justify-content-center align-items-center">
                                                                 <button type="button" className="btn red  fs-5 py-1 mx-5 " data-bs-dismiss="modal" onClick={() => handleDelete(DelId , DelName)}>
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
                                                {/* {Device.startDate?.slice(0,10) === new Date().toISOString().slice(0, 10) ? */}
                                                <>
                                                    <td > {Device.name} </td>
                                                    {/* <td > {Device.location} </td> */}
                                                    {/* <td > {Device.type === 0 ? <>عسكريين</> : <>مدنيين</>} </td> */}
                                                    <td >{Device.deviceType}</td>

                                                    <td className="w-50" >
                                                        <button data-bs-toggle="modal" href="#exampleModalToggle" role="button" className="btn fw-bold patient   mx-1 px-1 my-auto fs-5 py-2 " onClick={() => getData(Device.id)}>عرض المزيد</button>
                                                        <button className="btn fw-bold yellow   mx-1 px-1 my-auto fs-5 py-2" onClick={() => handleUpdate(Device.id, Device.name)}>تعديل البيانات</button>
                                                        <button className="btn fw-bold bg-finish mx-1 px-1 my-auto fs-5 py-2" onClick={() => handleMove(Device.id)} > نقل الجهاز</button>
                                                        <button className="btn fw-bold teal  mx-1 px-1 my-auto fs-5 py-2" onClick={() => handleFix(Device.id, Device.name)}>صيانة الجهاز</button>
                                                        <button className="btn fw-bold cyan mx-1 px-1 my-auto fs-5 py-2" onClick={() => handleAddSpares(Device.id, Device.name)}>اضافة قطع غيار</button>
                                                        <button className="btn fw-bold patient mx-1 px-1 my-auto fs-5 py-2" onClick={() => showLocDev(Device.id, Device.name)}> مواقع الجهاز</button>
                                                        <button className="btn fw-bold  bg-graay mx-1 px-1 my-auto fs-5 py-2 " onClick={() => getDesc(Device.id)}>عرض الأعطال</button>
                                                        <button className="btn fw-bold  bg-pa mx-1 px-1 my-auto fs-5 py-2 " onClick={() => returnDevice(Device.id)}> سحب الجهاز</button>
                                                        {/* <button className="btn fw-bold bg-pa mx-1 px-1 my-auto fs-5 py-2" onClick={() => getBarcode(Device.id, Device.name)}>طباعة الباركود</button> */}
                                                        {
                                                            (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "SuperAdmin") && <><button className="btn fw-bold danger mx-1 px-1 my-auto fs-5 py-2" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@fat"  onClick={() => handleGet(Device.id, Device.name)} >حذف</button></>
                                                        }

                                                    </td>
                                                    {/* <td > {Device.proccessor} </td> */}
                                                    {/* <td > {Device.username} </td> */}
                                                    {/* <td > {Device.startDate === null ? <button className="btn fw-bold bg-blue mx-1 px-5 my-2 py-2" type="submit" onClick={()=>getStart(clinic.id , clinic.clinicName)} >ابدأ</button> : <h3 className="fs-3">تم البدأ</h3>} </td> */}
                                                    {/* <td > {clinic.endDate === null ? <button className="btn fw-bold danger mx-1 px-5 my-2  " type="submit" onClick={()=>getEnd(clinic.id , clinic.startDate ,clinic.clinicName)} >انهى</button> : <h3 className="fs-3">تم الأنتهاء</h3>}</td> */}
                                                </>
                                                { /* : <></> */}
                                            </tr>
                                            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header position-relative">
                                                            <h5 className="modal-title" id="exampleModalLabel"> هل انت متأكد من انك تريد حذف هذا الجهاز ؟</h5>
                                                            <button type="button" className="btn-close position-absolute fs-5 top-20 m-2 start-0" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="pb-3  ">


                                                            <div className="w-100 d-flex justify-content-center align-items-center">
                                                                <button type="button" className="btn red  fs-5 py-1 mx-5 " data-bs-dismiss="modal" onClick={() => handleDelete(DelId , DelName)}>
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
                                        {AllDevices.map(Device => (
                                              <>
                                              <tr key={Device.id} className="text-center justify-content-center align-items-center">
                                                  {/* {Device.startDate?.slice(0,10) === new Date().toISOString().slice(0, 10) ? */}
                                                  <>
                                                      <td > {Device.name} </td>
                                                      {/* <td > {Device.location} </td> */}
                                                      {/* <td > {Device.type === 0 ? <>عسكريين</> : <>مدنيين</>} </td> */}
                                                      <td >{Device.deviceType}</td>
 
                                                      <td className="w-50" >
                                                          <button data-bs-toggle="modal" href="#exampleModalToggle" role="button" className="btn fw-bold patient   mx-1 px-1 my-auto fs-5 py-2 " onClick={() => getData(Device.id)}>عرض المزيد</button>
                                                          <button className="btn fw-bold yellow   mx-1 px-1 my-auto fs-5 py-2" onClick={() => handleUpdate(Device.id, Device.name)}>تعديل البيانات</button>
                                                          <button className="btn fw-bold bg-finish mx-1 px-1 my-auto fs-5 py-2" onClick={() => handleMove(Device.id)} > نقل الجهاز</button>
                                                          <button className="btn fw-bold teal  mx-1 px-1 my-auto fs-5 py-2" onClick={() => handleFix(Device.id, Device.name)}>صيانة الجهاز</button>
                                                          <button className="btn fw-bold cyan mx-1 px-1 my-auto fs-5 py-2" onClick={() => handleAddSpares(Device.id, Device.name)}>اضافة قطع غيار</button>
                                                          <button className="btn fw-bold patient mx-1 px-1 my-auto fs-5 py-2" onClick={() => showLocDev(Device.id, Device.name)}> مواقع الجهاز</button>
                                                          <button className="btn fw-bold  bg-graay mx-1 px-1 my-auto fs-5 py-2 " onClick={() => getDesc(Device.id)}>عرض الأعطال</button>
                                                          <button className="btn fw-bold  bg-pa mx-1 px-1 my-auto fs-5 py-2 " onClick={() => returnDevice(Device.id)}> سحب الجهاز</button>
                                                          {/* <button className="btn fw-bold bg-pa mx-1 px-1 my-auto fs-5 py-2" onClick={() => getBarcode(Device.id, Device.name)}>طباعة الباركود</button> */}
                                                          {
                                                              (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "SuperAdmin") && <><button className="btn fw-bold danger mx-1 px-1 my-auto fs-5 py-2" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@fat"  onClick={() => handleGet(Device.id, Device.name)} >حذف</button></>
                                                          }
 
                                                      </td>
                                                      {/* <td > {Device.proccessor} </td> */}
                                                      {/* <td > {Device.username} </td> */}
                                                      {/* <td > {Device.startDate === null ? <button className="btn fw-bold bg-blue mx-1 px-5 my-2 py-2" type="submit" onClick={()=>getStart(clinic.id , clinic.clinicName)} >ابدأ</button> : <h3 className="fs-3">تم البدأ</h3>} </td> */}
                                                      {/* <td > {clinic.endDate === null ? <button className="btn fw-bold danger mx-1 px-5 my-2  " type="submit" onClick={()=>getEnd(clinic.id , clinic.startDate ,clinic.clinicName)} >انهى</button> : <h3 className="fs-3">تم الأنتهاء</h3>}</td> */}
                                                  </>
                                                  { /* : <></> */}
                                              </tr>
                                              <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                  <div className="modal-dialog">
                                                      <div className="modal-content">
                                                          <div className="modal-header position-relative">
                                                              <h5 className="modal-title" id="exampleModalLabel"> هل انت متأكد من انك تريد حذف هذا الجهاز ؟</h5>
                                                              <button type="button" className="btn-close position-absolute fs-5 top-20 m-2 start-0" data-bs-dismiss="modal" aria-label="Close"></button>
                                                          </div>
                                                          <div className="pb-3  ">
 
 
                                                              <div className="w-100 d-flex justify-content-center align-items-center">
                                                                  <button type="button" className="btn red  fs-5 py-1 mx-5 " data-bs-dismiss="modal" onClick={() => handleDelete(DelId , DelName)}>
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
                            </>
                        }


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

export default ShowDevices;
