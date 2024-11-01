import React, { Fragment, useContext, useEffect, useState, useRef } from "react";
import "./css/showpatients.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { authcontext } from "../Context/authContext";

import { useReactToPrint } from "react-to-print";
import moment from "moment/moment";




const MilClinicReserve = () => {
    const componentRef = useRef();
    let { GetMilClinincs, allMilClinics, GetSpecificClininc, spesClinic } = useContext(authcontext);
    let [count, setCount] = useState([]);


    const handlePrint = (count, clinicName, doctorName, miltary, hour_min, mydate) => {
        moment.locale('ar');
        const content = `
          <div style="text-align: center;  font-weight: bold; font-size : 12px ; margin : 0px !important ; padding : 0px !important ">
            <h1 >مركز تأهيل العجوزة ق.م </h1>
            <h2 >-- فرع نظم ومعلومات --</h2>
            <div >
            <p style="margin : 3px">-----------------------------</p>
                <h1 style="font-size : 26px ; margin : 0px">${count}</h1>
            <p style ="margin : 3px">-----------------------------</p>
            </div>

                <div style="font-size : 12px ; font-weight : bolder">      
                    <h2>عيادة : <span>${clinicName}</span> </h2>
                </div>

                <div className="mb-1">      
                    <h2>د : <span>${doctorName}</span> </h2>
                </div>

                <div className="mb-1">      
                    <h2>الفئه : <span>${miltary}</span> </h2>
                </div>
                                            
                <div className="mb-1">      
                    <h3>الوقت :  <span>${hour_min} ,</span>  <span>${mydate}  </span> </h3> 
                </div>
                
                <div>      
                    <h2 className="text-dark mt-2">شكرا لكم </h2>
                </div>
          </div>
        `;



        // Create a hidden iframe
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        // Write content to the iframe
        const iframeDoc = iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(content);
        iframeDoc.close();

        // Call the print function
        iframe.contentWindow.print();

        // Remove the iframe after printing
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 1000); // You can adjust the delay as needed
    };







    useEffect(() => {
        GetMilClinincs()
    }, []);

    useEffect(() => {
        if (spesClinic.clinicName && count.data) {
            handlePrint(count.data.count, spesClinic.clinicName, spesClinic.doctorName, miltary, hour_min, mydate)
        }
    }, [count]);
    
    async function addCount (clinicId) {
        GetSpecificClininc(clinicId)

        await axios.put(`http://localhost:5137/api/UserClinics/AddTickets/${clinicId}`,{headers: {
            'Access-Control-Allow-Origin': '*',
          }}).then(res => {
            console.log(res.data);
            // const value = new SpeechSynthesisUtterance( `${voice} ${res.data.count}`)
            // value.lang = 'ar-SA';
            // const voices = window.speechSynthesis.getVoices();
            // const arabicVoice = voices.find(voice => voice.lang === 'ar-SA');
            // if (arabicVoice) {
            //     value.voice = arabicVoice;
            // }
            // window.speechSynthesis.speak(value)
            setCount(res.data)
            // console.log(res.data.count);          

        }
        ).catch(e => console.log(e))


    };

    const hours = new Date().getHours()
    const minutes = new Date().getMinutes();

    const hour_min = hours + ':' + minutes;
    const mydate = new Date().toISOString().slice(0, 10)

    const miltary = 'عسكريين'

    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,

    //   });
    // console.log(hours+':'+minutes);

    //isTimeBetween(startDate, endDate, currentTime)


    // addCount(id,clinicId , count , isActive)
    return (
        <>
            <div className="mx-5  p-5 mt-5">
                <h5 className="fs-1 ">عسكريين</h5>



                {allMilClinics.length > 0 ?
                    <div className="content d-flex flex-column flex-wrap ">
                        {allMilClinics.map(clinic => (
                            <div key={clinic.id}>
                                <span className="">
                                    {/* {<button className="btn ml-50 fs-2 bolder  " onClick={() => addCount(clinic.id)} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat" >عيادة {clinic.clinicName}</button> } */}
                                    {<button className="btn ml-50 fs-2 bolder mt-5 " onClick={() => addCount(clinic.id)}  >عيادة {clinic.clinicName}</button>}

                                </span>

                            </div>
                        ))}

                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header position-relative">
                                        <h5 className="modal-title" id="exampleModalLabel">عيادة {spesClinic.clinicName}</h5>
                                        <button type="button" className="btn-close position-absolute top-20 m-2 start-0" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body"  >
                                        <div className="row d-flex justify-content-center align-items-center mt-3" ref={componentRef}>
                                            <table className=" card w-100 p-5 border-0 rounded-4 d-flex justify-content-center" >
                                                <thead className="mb-3">

                                                    <h1>مستشفى العجوزه ف.م </h1>
                                                    <p>فرع نظم ومعلومات</p>
                                                </thead>
                                                <tr>-----------------------------</tr>

                                                <tr className="d-flex justify-content-center">
                                                    <td className="fs-1 ">{count.count}</td>
                                                </tr>


                                                <tr className="mb-3">-----------------------------</tr>
                                                {/* <tr>      
                                                <h2>عيادة : <span>الأسنان</span> </h2>
                                            </tr> */}
                                                <tr className="mb-3">
                                                    <h2>عيادة : <span>{spesClinic.clinicName}</span> </h2>
                                                </tr>
                                                <tr className="mb-4">
                                                    <h2>د : <span>{spesClinic.doctorName}</span> </h2>
                                                </tr>
                                                <tr className="mb-4">
                                                    <h2>الفئه : <span>{miltary}</span> </h2>
                                                </tr>
                                                <tr className="mb-3">
                                                    <h2>الوقت :  <span>{hour_min} ,</span>  <span>{mydate}  </span> </h2>
                                                </tr>
                                                <tr>
                                                    <h2 className="text-dark mt-3">شكرا لكم </h2>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className="modal-footer d-flex justify-content-center">

                                            <button type="submit" className=" btn2 w-30 fs-4 mt-3 " data-bs-dismiss="modal" onClick={() => handlePrint(count.count, spesClinic.clinicName, spesClinic.doctorName, miltary, hour_min, mydate)}>
                                                طباعه
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> :

                    <></>
                }

            </div>


        </>
    );

};

export default MilClinicReserve;
