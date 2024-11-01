import React, { Fragment, useContext, useEffect, useState } from "react";
import "./css/showpatients.css";
import 'react-toastify/dist/ReactToastify.css';

import { toast, ToastContainer } from 'react-toastify';
import { authcontext } from "../Context/authContext";
import Modellite from '../utils/model'







const AllUserTransactions = () => {



    let { deviceData, getTransactions, getWorkShops, getUserTransactions , UserTransaction ,
        getTypes, LastDevLocations , GetAllUser , allUser } = useContext(authcontext);

    const [searched, setSearched] = useState(false);

    const [toggle, setToggle] = useState(false);
    const [Desc, setDesc] = useState("");
    const [user, setUser] = useState("");




    useEffect(() => {
        getWorkShops()
        getTransactions()
        GetAllUser()
        getUserTransactions()
        getTypes()
        // console.log(allClinics);
    }, [toggle]);





    

    const handleSearchChange = (e) => {
        setSearched(true)
        const {  value } = e.target;
        if(value === '0')
        {
                setSearched(false)
                setUser(value)
         }
        else{
            
            setUser(e.target.value)
        }


    };


    const getDesc = (data) => {

        setDesc(data)

    };





    


    let filteredDevices = UserTransaction.filter(Device => {

        // console.log(Device.deviceType)
 
        
        return (
            
            

            user && Device?.user?.name.toString().includes(user ? user : "")
        )


    })





    // Pagination logic
    // const indexOfLastPatient = currentPage * patientsPerPage;
    // const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    // const currentPatients = filteredDevices?.slice(indexOfFirstPatient, indexOfLastPatient);
    // const totalPages = Math.ceil(filteredDevices?.length / patientsPerPage);



    return (
        <>
            <div className=" show mx-5  p-5 mt-2">
                <h5> جميع  عمليات المستخدم</h5>
                <div className="row m-0 ">



                    <div className="col m-0">
                        <span className='myinput m-0'>
                            <select className='inp1 w-75 m-0' onChange={handleSearchChange}
                                name="name"
                                value={user}
                                required
                            >
                                <option value="" selected disabled > اختر المستخدم</option>
                                {allUser?.map((user) => (
                                    <>
                                        <option type="item" id="item" value={user?.name}>{user?.name}</option>
                                    </>

                                ))}
                                <option type="item" id="item" value="0" >الكل</option>

                            </select>

                        </span>



                    </div>



                </div>
            </div>

            {UserTransaction?.length > 0 ? (
                <>

                    <table className="table table-striped table-hover mt-1">
                        {
                             <>

                                {searched ? <>

                                    <thead >
                                        <tr className="mb-5 py-2 " >

                                            <th style={{ color: 'rgb(97, 0, 0)' }}>اسم المستخدم</th>
                                            <th style={{ color: 'rgb(97, 0, 0)' }}> تاريخ العمليه</th>
                                            <th style={{ color: 'rgb(97, 0, 0)' }}>  الوقت</th>
                                            <th ></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...filteredDevices].reverse()?.map(Device => (
                                            <tr key={Device.id} className="text-center justify-content-center align-items-center fw-bold">

                                                <>
                                                    <td >{Device?.user?.name}</td>
                                                    <td className="fs-5">{Device?.transactionTime?.slice(0, 10)}</td>
                                                    <td className="fs-5" >{Device?.transactionTime?.slice(11, 16)}</td>


                                                    <td >  <button data-bs-toggle="modal" href="#exampleModalToggle-1" role="button" className="btn fw-bold cyan mx-2 px-2 my-auto fs-5 py-2 " onClick={() => getDesc(Device.description)}>وصف العمليه</button></td>



                                                </>

                                            </tr>
                                        ))}
                                    </tbody>

                                </> : <>


                                    <thead >
                                        <tr className="mb-5 py-2" >

                                            <th style={{ color: 'rgb(97, 0, 0)' }}>اسم المستخدم</th>
                                            <th style={{ color: 'rgb(97, 0, 0)' }}> تاريخ العمليه</th>
                                            <th style={{ color: 'rgb(97, 0, 0)' }}>  الوقت</th>
                                            <th ></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...UserTransaction].reverse().map(Device => (
                                            <tr key={Device.id} className="text-center justify-content-center align-items-center fw-bold">

                                                <>


                                                    <td >{Device?.user?.name}</td>
                                                    <td className="fs-5">{Device?.transactionTime?.slice(0, 10)}</td>
                                                    <td className="fs-5" >{Device?.transactionTime?.slice(11, 16)}</td>


                                                    <td >  <button data-bs-toggle="modal" href="#exampleModalToggle-1" role="button" className="btn fw-bold cyan mx-2 px-2 my-auto fs-5 py-2 " onClick={() => getDesc(Device.description)}>وصف العمليه</button></td>




                                                </>

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

                                                <>
                                                    <div className="row mt-4">
                                                        <div className="">
                                                            <h3 className="fs-2"> <span style={{wordSpacing : "0.2em"}} className="text-dark lh-base">{Desc ? Desc : ""}</span></h3>
                                                        </div>

                                                    </div>



                                                </>


                                            </div>






                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>
                </>
            ) : (
                <div className="text-muted">لم يتم اضافة عمليات بعد</div>
            )}

            <ToastContainer />

        </>
    );


};

export default AllUserTransactions;
