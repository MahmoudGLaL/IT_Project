import React, { Fragment, useContext, useEffect, useState } from "react";
import "./css/showpatients.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import { authcontext } from "../Context/authContext";
import Modellite from '../utils/model'
import { useFormik } from "formik";





const ShowDevTransactions = () => {



    let { deviceData, get1Device, deleteTrans, GetlastWorkShops, LastWorkShop, 
        getTypes, getDeviceLocation, LastDevLocations, TransactionFix, getSpecTransaction, SpecTransaction, getDeviceTransaction, DeviceTransaction } = useContext(authcontext);


    let [toggle, setToggle] = useState(false);

    const { InfoId } = useParams()


    useEffect(() => {
        if (InfoId) {
            get1Device(InfoId)
            getDeviceTransaction(InfoId)
            GetlastWorkShops(InfoId)
        }

        getDeviceTransaction(InfoId)

        getTypes()
        // console.log(allClinics);
    }, [toggle]);







    const getData = (id) => {
        get1Device(id)
        getDeviceLocation(id)
    };

    const getDesc = (id) => {

        getSpecTransaction(id)

    };

    

    const handleFix = (id) => {
        TransactionFix(id)
        setToggle(!toggle)
        // get1Device(id)

    };
    // const handleDelete = (id) => {
    //     deleteTrans(id)
    //     // setToggle(!toggle)
    //     get1Device(InfoId)
    //     getDeviceTransaction()
    //     // get1Device(id)

    // };












    return (
        <>
        {DeviceTransaction?.transactions?.length > 0 ? <>
            <div className=" show mx-5  p-5 mt-3 ">
                <h5 style={{ marginBottom: 40 }}> جميع أعطال جهاز  <span className="light-red">"{DeviceTransaction?.name}" </span> </h5>

                <h2 className="fs-2 fw-bold w-25 m-auto">

                    <span>
                        اسم الورشه :
                    </span>
                    <span className='mx-2 light-red'>
                        {LastWorkShop?.name}
                    </span>

                </h2>
                
            </div>


                <>
                    <table className="table table-striped table-hover mt-3">
                        {
                            <>


                                    <thead >
                                        <tr className="mb-5 py-2" >

                                            <th style={{ color: 'rgb(97, 0, 0)' }}>رقم العطل</th>
                                            <th style={{ color: 'rgb(97, 0, 0)' }}>اسم الجهاز</th>
                                            <th style={{ color: 'rgb(97, 0, 0)' }}>اسم المستلم</th>
                                            <th></th>
                                            <th></th>
                                            <th style={{ color: 'rgb(97, 0, 0)' }}>الحاله</th>
                                            {/* <th></th> */}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {DeviceTransaction?.transactions?.map(Device => (
                                            <tr key={Device.id} className="text-center justify-content-center align-items-center">

                                                <>


                                                    <td >{Device.id}</td>
                                                    <td >{DeviceTransaction.name}</td>
                                                    <td >{Device.nameOfRecipient}</td>
                                                    {/* <td ></td> */}
                                                    <td >  <button data-bs-toggle="modal" href="#exampleModalToggle-1" role="button" className="btn fw-bold cyan mx-2 px-2 my-auto fs-5 py-2 " onClick={() => getDesc(Device.id)}>وصف العطل</button></td>

                                                    <td className="" >
                                                        <button data-bs-toggle="modal" href="#exampleModalToggle" role="button" className="btn fw-bold patient   mx-2 px-2 my-auto fs-5 py-2 " onClick={() => getData(Device.informationId)}>عرض معلومات الجهاز</button>
                                                    </td>
                                                    
                                                    <td>
                                                        <button className={` ${Device.receivedDate === null ? 'btn fw-bold yellow ' : 'btn fw-bold bg-green'}  mx-2 px-2 my-auto fs-5 py-2`} onClick={() => handleFix(Device.id, Device.name)}>{Device.receivedDate === null ? 'إصلاح' : 'تم الإصلاح'}</button>
                                                    </td>
                                                    {/* <td>
                                                        <button className="btn fw-bold danger mx-2 px-2 my-auto fs-5 py-2 " onClick={() => handleDelete(Device.id)}>حذف</button>
                                                    </td> */}

                                                </>
                                                { /* : <></> */}
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
                                    <button type="button" className="btn-close position-absolute top-20 m-2 start-0" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body  ">
                                    <div className="row d-flex justify-content-center align-items-center m-auto w-100">
                                        <div className="w-100 ">



                                            <div className=" card w-100 p-5 border-0 rounded-4 d-flex justify-content-center">
                                                <h2 className="fs-2 light-red"> وصف العطل </h2>
                                                {DeviceTransaction?.transactions ?
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
          

            <ToastContainer />

         </> :  <h1 className="mt-5 fs-2 w-50 m-auto"> جهاز <span className="light-red">"{deviceData.name}"</span>  لم يدخل اي ورشه بعد </h1> }
         
        </>
    );


};

export default ShowDevTransactions;
