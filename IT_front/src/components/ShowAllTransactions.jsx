import React, { Fragment, useContext, useEffect, useState } from "react";
import "./css/showpatients.css";
import 'react-toastify/dist/ReactToastify.css';

import { toast, ToastContainer } from 'react-toastify';
import { authcontext } from "../Context/authContext";
import Modellite from '../utils/model'




let val_3 = ''


const ShowAllTransactions = () => {



    let { deviceData, get1Device, getTransactions, AllTransactions, getWorkShops, AllWorkShops, 
        getTypes, getDeviceLocation, LastDevLocations, TransactionFix, getSpecTransaction, SpecTransaction,  } = useContext(authcontext);

    const [searched, setSearched] = useState(false);
    const [searchedLoc, setSearchedLoc] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState({ name: "", serialNumber: "" });
    const [currentPage, setCurrentPage] = useState(1);

    const [workShopDevices, setWorkShopDevices] = useState([])

    const patientsPerPage = 5;




    useEffect(() => {
        getWorkShops()
        getTransactions()

        getTypes()
        // console.log(allClinics);
    }, [toggle]);






    const handleSearchChange = (e) => {
        setSearched(true)
        setSearchedLoc(false)

        const { name, value } = e.target;

        if (name === 'name') {
            val_3 = value
        }
        else if (name === 'location') {
            if (value === '0') {
                setSearchedLoc(false)
            }
            else {

                setSearchedLoc(true)
                
                setWorkShopDevices(AllTransactions?.filter(trans=> trans.workshopID == value))

               
                
                //    LocationgetTransactions(value)
            }
            // filteredDevices = LocationsAllTransactions

        }
        setSearchCriteria(prevState => ({ ...prevState, [name]: value }));
        setCurrentPage(1);

        if (val_3 === '') {
            setSearched(false)
        }

    };
    console.log(workShopDevices);
    

    const getData = (id) => {
        get1Device(id)
        getDeviceLocation(id)
    };

    const getDesc = (id) => {


        getSpecTransaction(id)

    };


    

    //    const handleMove = (id) => {
    //        // getDeviceLocation(id)
    //        navigate(`/main/changeLocation/${id}`)
    //    };

    const handleFix = (id) => {
        TransactionFix(id)
        setToggle(!toggle)
        // get1Device(id)

    };
    // const handleDelete = (id) => {
    //     deleteTrans(id)
    //     setToggle(!toggle)

    //     // get1Device(id)

    // };



    // const getBarcode = (id) => {

    //     navigate(`/main/barcode/${id}`)
    // };





    let filteredDevices = AllTransactions.filter(Device => {

        // console.log(Device.deviceType)

        return (

            searchCriteria.name && Device.nameOfRecipient.toString().includes(searchCriteria.name ? searchCriteria.name : "")

        )




    })





    // Pagination logic
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = filteredDevices?.slice(indexOfFirstPatient, indexOfLastPatient);
    const totalPages = Math.ceil(filteredDevices?.length / patientsPerPage);



    return (
        <>
            <div className=" show mx-5  p-5 mt-3">
                <h5> جميع الاجهزه في الصيانه</h5>
                <div className="row ">

                    <div className="col">
                        <input
                            type="text"
                            className="form-control w-75"
                            placeholder=" ابحث عن اسم المستلم"
                            name="name"
                            value={searchCriteria.name}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className="col">
                        <span className='myinput'>
                            <select className='inp1 w-75' onChange={handleSearchChange}
                                name="location"
                                value={searchCriteria.location}
                                required
                            >
                                <option value="" selected disabled >ورشة الجهاز</option>
                                {AllWorkShops?.map((locat) => (
                                    <>
                                        <option type="item" id="item" value={locat.id}>{locat.name}</option>
                                    </>

                                ))}
                                <option type="item" id="item" value="0" >الكل</option>

                            </select>

                        </span>



                    </div>


                    {/* <div className="col">
                        <input
                            type="text"
                            className="form-control w-75"
                            placeholder=" ابحث عن رقم السيريال"
                            name="serialNumber"
                            value={searchCriteria.serialNumber}
                            onChange={handleSearchChange}
                            // onKeyUp={handleFilter}
                        />
                    </div> */}



                    {/* <div className="col mn-20">
                       <span><Link to={`/main/addDevices`} className="btn fw-bold ml-50 mn-1 " >أضف جهاز</Link></span>
                   </div> */}
                </div>
            </div>

            {AllTransactions?.length > 0 ? (
                <>
                    {searched && <>
                        <h2 className="fs-2 fw-bold w-25 m-auto mt-0">

                            <span>
                                عدد الأجهزه التى استلمها {searchCriteria.name} :
                            </span>
                            <span className='mx-2 light-red'>
                                {filteredDevices?.length}
                            </span>

                        </h2>
                    </>}
                    <table className="table table-striped table-hover mt-3">
                        {
                            searchedLoc ? <>
                                <thead >
                                    <tr className="mb-5 py-2" >
                                    <th style={{ color: 'rgb(97, 0, 0)' }}>رقم العطل</th>
                                            <th style={{ color: 'rgb(97, 0, 0)' }}>اسم المستلم</th>
                                            <th style={{ color: 'rgb(97, 0, 0)' }}> تاريخ الطلب</th>
                                            <th style={{ color: 'rgb(97, 0, 0)' }}> تاريخ الأستلام</th>
                                            <th style={{ color: 'rgb(97, 0, 0)' }}>الحاله</th>
                                            <th ></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {workShopDevices?.map((Device,index) => (
                                        <tr key={index} className="text-center justify-content-center align-items-center">

                                            <>
                                            <td >{Device.id}</td>
                                    
                                                    <td >{Device.nameOfRecipient}</td>
                                                    <td className="fs-5">{Device.deliveryDate?.slice(0,10)}</td>
                                                    <td className="fs-5" >{Device.receivedDate?.slice(0,10)}</td>

                                                    {/* <td ></td> */}
                                                    <td >  <button data-bs-toggle="modal" href="#exampleModalToggle-1" role="button" className="btn fw-bold cyan mx-2 px-2 my-auto fs-5 py-2 " onClick={() => getDesc(Device.id)}>وصف العطل</button></td>

                                                    <td className="" >
                                                        <button data-bs-toggle="modal" href="#exampleModalToggle" role="button" className="btn fw-bold patient   mx-2 px-2 my-auto fs-5 py-2 " onClick={() => getData(Device.informationId)}>عرض معلومات الجهاز</button>
                                                    </td>
                                                    <td>
                                                        <button className={` ${Device.receivedDate === null ? 'btn fw-bold yellow ' : 'btn fw-bold bg-green'}  mx-2 px-2 my-auto fs-5 py-2`} onClick={() => handleFix(Device.id, Device.name)}>{Device.receivedDate === null ? 'إصلاح' : 'تم الإصلاح'}</button>
                                                    </td>
                                                    
                                            </>
                                            { /* : <></> */}
                                        </tr>
                                    ))}
                                </tbody>




                            </> : <>

                                {searched ? <>

                                    <thead >
                                        <tr className="mb-5 py-2" >

                                            <th style={{ color: 'rgb(97, 0, 0)' }}>رقم العطل</th>
                                            <th style={{ color: 'rgb(97, 0, 0)' }}>اسم المستلم</th>
                                            <th style={{ color: 'rgb(97, 0, 0)' }}> تاريخ الطلب</th>
                                            <th style={{ color: 'rgb(97, 0, 0)' }}> تاريخ الأستلام</th>
                                            <th style={{ color: 'rgb(97, 0, 0)' }}>الحاله</th>
                                            {/* <th ></th> */}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredDevices?.map(Device => (
                                            <tr key={Device.id} className="text-center justify-content-center align-items-center">

                                                <>
                                                    <td >{Device.id}</td>
                                                    <td >{Device.nameOfRecipient}</td>
                                                    <td className="fs-5">{Device.deliveryDate?.slice(0,10)}</td>
                                                    <td className="fs-5" >{Device.receivedDate?.slice(0,10)}</td>

                                                    {/* <td ></td> */}
                                                    <td >  <button data-bs-toggle="modal" href="#exampleModalToggle-1" role="button" className="btn fw-bold cyan mx-2 px-2 my-auto fs-5 py-2 " onClick={() => getDesc(Device.id)}>وصف العطل</button></td>

                                                    <td className="" >
                                                        <button data-bs-toggle="modal" href="#exampleModalToggle" role="button" className="btn fw-bold patient   mx-2 px-2 my-auto fs-5 py-2 " onClick={() => getData(Device.informationId)}>عرض معلومات الجهاز</button>
                                                    </td>
                                                    <td>
                                                        <button className={` ${Device.receivedDate === null ? 'btn fw-bold yellow ' : 'btn fw-bold bg-green'}  mx-2 px-2 my-auto fs-5 py-2`} onClick={() => handleFix(Device.id, Device.name)}>{Device.receivedDate === null ? 'إصلاح' : 'تم الإصلاح'}</button>
                                                    </td>
                                                    {/* <td>
                                                        <button className="btn fw-bold danger mx-2 px-2 my-auto fs-5 py-2 " onClick={() => handleFix(Device.id, Device.name)}>{Device.receivedDate === null ? 'إصلاح' : 'تم الإصلاح'}</button>
                                                    </td> */}

                                                </>
                                                { /* : <></> */}
                                            </tr>
                                        ))}
                                    </tbody>

                                </> : <>


                                    <thead >
                                        <tr className="mb-5 py-2" >

                                            <th style={{ color: 'rgb(97, 0, 0)' }}>رقم العطل</th>
                                            <th style={{ color: 'rgb(97, 0, 0)' }}>اسم المستلم</th>
                                            <th style={{ color: 'rgb(97, 0, 0)' }}> تاريخ الطلب</th>
                                            <th style={{ color: 'rgb(97, 0, 0)' }}> تاريخ الأستلام</th>
                                            <th style={{ color: 'rgb(97, 0, 0)' }}>الحاله</th>
                                            {/* <th></th> */}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {AllTransactions.map(Device => (
                                            <tr key={Device.id} className="text-center justify-content-center align-items-center">

                                                <>


                                                    <td >{Device.id}</td>
                                                    <td >{Device.nameOfRecipient}</td>
                                                    <td className="fs-5">{Device.deliveryDate?.slice(0,10)}</td>
                                                    <td className="fs-5">{Device.receivedDate?.slice(0,10)}</td>
                                                    {/* <td ></td> */}
                                                    <td >  <button data-bs-toggle="modal" href="#exampleModalToggle-1" role="button" className="btn fw-bold cyan mx-2 px-2 my-auto fs-5 py-2 " onClick={() => getDesc(Device.id)}>وصف العطل</button></td>

                                                    <td className="" >
                                                        <button data-bs-toggle="modal" href="#exampleModalToggle" role="button" className="btn fw-bold patient   mx-2 px-2 my-auto fs-5 py-2 " onClick={() => getData(Device.informationId)}>عرض معلومات الجهاز</button>
                                                    </td>
                                                    <td>
                                                        <button className={` ${Device.receivedDate === null ? 'btn fw-bold yellow ' : 'btn fw-bold bg-green'}  mx-2 px-2 my-auto fs-5 py-2`} onClick={() => handleFix(Device.id, Device.name)}>{Device.receivedDate === null ? 'إصلاح' : 'تم الإصلاح'}</button>
                                                    </td>
                                                    {/* <td>
                                                        <button className={` ${Device.receivedDate === null ? 'btn fw-bold yellow ' : 'btn fw-bold bg-green'}  mx-2 px-2 my-auto fs-5 py-2`} onClick={() => handleFix(Device.id, Device.name)}>{Device.receivedDate === null ? 'إصلاح' : 'تم الإصلاح'}</button>
                                                    </td> */}
                                                    {/* <td>
                                                        <button className="btn fw-bold danger mx-2 px-2 my-auto fs-5 py-2 " onClick={() => handleDelete(Device.id)}>حذف</button>
                                                    </td> */}

                                                </>
                                                { /* : <></> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </>}
                            </>
                        }


                    </table>
                    <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                        <Modellite patData={deviceData} LastDevLocations={LastDevLocations} />
                    </div>
                    <div className="modal fade" id="exampleModalToggle-1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered ">
                            <div className="modal-content " >
                                <div className="modal-header">
                                    <h5 className=" m-auto modal-title" id="exampleModalToggleLabel"> **</h5>
                                    <button type="button" className="btn-close position-absolute top-20 m-2 start-0" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body  ">
                                    <div className="row d-flex justify-content-center align-items-center m-auto w-100">
                                        <div className="w-100 ">



                                            <div className=" card w-100 p-5 border-0 rounded-4 d-flex justify-content-center">
                                                <h2 className="fs-2 light-red"> وصف العطل </h2>
                                                {AllTransactions ?
                                                    <>
                                                        <div className="row mt-4">
                                                            <div className="">
                                                                <h3 className="fs-2"> <span className="text-dark">{SpecTransaction.transactionDescription ? SpecTransaction.transactionDescription : ""}</span></h3>
                                                            </div>

                                                        </div>



                                                    </>
                                                    : ""}

                                            </div>






                                        </div>
                                    </div>
                                </div>


                                {/* <button className="btn btn-primary m-auto fs-3 w-25 mb-3" data-bs-dismiss="modal" onClick={() => handleEndPatient()} >تأكيد</button> */}
                            </div>

                        </div>
                    </div>
                </>
            ) : (
                <div className="text-muted">لم يتم اضافة اجهزه بعد</div>
            )}

            <ToastContainer />

        </>
    );


};

export default ShowAllTransactions;
