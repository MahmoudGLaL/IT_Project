import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Modellite = ({ patData, LastDevLocations }) => {
    let navigate = useNavigate()
    let handleEndPatient = async () => {

        if (patData) {

            await axios.put(`http://localhost:11923/api/Patients/${patData.id}`).then(res => {
                console.log(res);
                toast.success("تمت العمليه بنجاح")
                navigate("/main/addPatients")
            }).catch(err => {
                console.log(err);
            })
        }
    }
    return (<>
        <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content " >
                <div className="modal-header">
                    <h5 className=" m-auto modal-title" id="exampleModalToggleLabel">معلومات الجهاز</h5>
                    <button type="button" className="btn-close position-absolute top-20 m-2 start-0" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body  ">
                    <div className="row d-flex justify-content-center align-items-center m-auto w-100">
                        <div className="w-100 ">



                            <div className=" card w-100 p-5 border-0 rounded-4 d-flex justify-content-center">
                                <h2>معلومات الجهاز </h2>
                                {patData ?
                                    <>
                                        <div className="row mt-1">
                                            <div className="">
                                                <h3 className="light-red">اسم الجهاز : <span className="text-dark">{patData.name}</span></h3>
                                            </div>

                                        </div>

                                        <div className="row mt-2">
                                            <h3 className="light-red">نوع الجهاز : <span className="text-dark">{patData.deviceType}</span></h3>
                                        </div>


                                        {/* <div className="row mt-2">
                                            <h3 className="light-red">رقم السيريال : <span className="text-dark">{patData.serialNumber}</span></h3>
                                        </div> */}


                                        {/* <div className=" row mt-2">
                                            <h3 className="light-red">رقم الوثيقه  : <span className="text-dark">{patData.documentNumber}</span></h3>
                                        </div> */}



                                        {/* <div className="row mt-2 ">
                                            <div className="">
                                                <h3 className="light-red"> السعر : <span className="text-dark">{patData.price}</span></h3>
                                            </div>
                                        </div>
                                        <div className="row mt-2 ">
                                            <div className="">
                                                <h3 className="light-red">اذن الشراء : <span className="text-dark">{patData.purchase}</span></h3>
                                            </div>


                                        </div>
                                        <div className="row mt-2">
                                            <div className=" text-left">
                                                <h3 className="light-red">تاريخ الشراء : <span className="text-dark">{moment(patData.exchangeDate).format('YYYY-MM-DD')}</span> </h3>
                                            </div>
                                        </div> */}
                                        {patData?.ram !== null && <>
                                        {/* patData.deviceType === 'كمبيوتر'  */}
                                            <div className="row mt-3">

                                                <div className="mt-0 row d-flex justify-content-center align-items-center m-auto w-100 ">
                                                    <h2 className='py-1'>مواصفات الجهاز</h2>
                                                </div>
                                            </div>

                                            {/* <div className="row mt-2">
                                                <h3 className="light-red">اسم المعالج : <span className="text-dark">{patData.proccessor}</span></h3>
                                            </div> */}


{/* 
                                            <div className="row mt-2">
                                                <h3 className="light-red">نوع المعالج : <span className="text-dark">{patData.core}</span></h3>
                                            </div> */}

                                            <div className="row mt-2">
                                                <h3 className="light-red"> الرامات : <span className="text-dark">{patData.ram}</span></h3>
                                            </div>

                                            <div className="row mt-2">
                                                <h3 className="light-red"> الهارد : <span className="text-dark">{patData.hard}</span></h3>
                                            </div>

                                            {/* <div className="row mt-2">
                                                <h3 className="light-red"> كارت الشاشه : <span className="text-dark">{patData.graphicsCard}</span></h3>
                                            </div> */}
                                        </>}

                                    </>
                                    : ""}
                                {
                                    LastDevLocations ?
                                        <>
                                            <div className="mt-3 row d-flex justify-content-center align-items-center m-auto w-100 ">
                                                <h2 className='py-1'>اخر موقع الجهاز </h2>
                                            </div>

                                            <div className="row mt-2">
                                                <h3 className="light-red">اسم الموقع : <span className="text-dark">{LastDevLocations?.name}</span></h3>
                                            </div>
                                            <div className="row mt-2">
                                                <h3 className="light-red">القسم : <span className="text-dark">{LastDevLocations?.department}</span></h3>
                                            </div>
                                            <div className="row mt-2">
                                                <h3 className="light-red">المبنى : <span className="text-dark" >{LastDevLocations?.building}</span></h3>
                                            </div>
                                        </>

                                        : ""
                                }
                            </div>






                        </div>
                    </div>
                </div>


                {/* <button className="btn btn-primary m-auto fs-3 w-25 mb-3" data-bs-dismiss="modal" onClick={() => handleEndPatient()} >تأكيد</button> */}
            </div>

        </div>

    </>)
}

export default Modellite;