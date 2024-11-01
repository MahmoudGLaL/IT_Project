import React, { useEffect } from "react";
import "./css/showpatients.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { authcontext } from "../Context/authContext";
import { useContext } from "react";
import { toast , ToastContainer } from "react-toastify";







const TalkReservers = () => {
    let [count, setCount] = useState(1);
    const { id } = useParams()
    let { GetSpecificClininc, spesClinic } = useContext(authcontext);

    const voice = " رقم "

    useEffect(() => {
        GetSpecificClininc(id)
        // console.log(allClinics);
    }, []);
    


    async function talkPatients () {
       
        await axios.put(`http://localhost:5137/api/UserClinics/current/${id}`,{headers: {
            'Access-Control-Allow-Origin': '*',
          }}).then((res) => {
            setCount(res.data.current)
            const value = new SpeechSynthesisUtterance(`عيادة ${spesClinic.clinicName}${voice} ${res.data.current}`)
            value.lang = 'ar-SA';
            const voices = window.speechSynthesis.getVoices();
            const arabicVoice = voices.find(voice => voice.lang === 'ar-SA');
            if (arabicVoice) {
                value.voice = arabicVoice;
            }
            window.speechSynthesis.speak(value)
        }

        ).catch(e => console.log(e))

    }
    async function skipPatients () {
        await axios.put(`http://localhost:5137/api/UserClinics/next/${id}`,{headers: {
            'Access-Control-Allow-Origin': '*',
          }}).then((res) => {
            setCount(res.data.current)
            if (res.data.message === 'هذا اخر مريض') {
                toast.info(`هذا اخر مريض`)
              
            }
            else {
                const value = new SpeechSynthesisUtterance(`عيادة ${spesClinic.clinicName}${voice} ${res.data.current}`)
                value.lang = 'ar-SA';
                const voices = window.speechSynthesis.getVoices();
                const arabicVoice = voices.find(voice => voice.lang === 'ar-SA');
                if (arabicVoice) {
                    value.voice = arabicVoice;
                }
                window.speechSynthesis.speak(value)
            }

        }

        ).catch(e => console.log(e))

    }



    return (
        <>
            <div className="row p-5 mt-5 m-auto ">
                <h5 className="fs-1"> عيادة  {spesClinic.clinicName}  </h5>


                <div className="row d-flex justify-content-center align-items-center m-auto" >

                    <table className=" card mine w-100 p-5 border-0 rounded-4 d-flex justify-content-center" >
                        <h5 className={`fs-2 py-2 ${spesClinic.type === 0 ? 'teal' : 'bg-home'} type`}> {spesClinic.type === 0 ? <>عسكريين</> : <>مدنيين</>} </h5>

                        <thead className="mb-5">
                        </thead>


                        <tr className="count d-flex justify-content-center mb-5 bg-white w-25 h-25 m-auto p-5 mt-5 rad-5">
                            <td className="">{count}</td>
                        </tr>

                        <div className="col mt-4">
                            <span className=" mx-5 ">
                                <button className="btn bg-finish fs-1 bolder w-25 " onClick={talkPatients} >اعد النداء</button>
                            </span>

                            <span className="mx-5">
                                <button className="btn red fs-1 bolder w-25 " onClick={skipPatients}  >التالي</button>
                            </span>
                        </div>

                    </table>
                <ToastContainer/>
                </div>







            </div>


        </>
    );

};

export default TalkReservers;
