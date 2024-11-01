import React, { useEffect, useState } from "react";
import "./css/showpatients.css";
import 'react-toastify/dist/ReactToastify.css';

import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import { authcontext } from "../Context/authContext";
// import Select from 'react-select';

// import makeAnimated from 'react-select/animated';




const GetTools = () => {
    const userId = localStorage.getItem('id')

    const [locationId, setLocationId] = useState(null)
    const [recipient, setRecipient] = useState('')

    let { getTools, AllTools } = useContext(authcontext);
    // const animatedComponents = makeAnimated();

    // console.log(id);

    useEffect(() => {

        getTools()

    }, [])

    // const options = AllTools.map((type, index) => ({
    //     label: type.name,
    //     value: type.id
    // }))




    const handleEnter = async(e) => {
            if(recipient !== '')
            {
                await axios.put(`http://localhost:5137/api/Tools/Enter/${locationId}`, {
                    recipient : recipient ,
                    toolId : locationId ,
                    userId : userId ,
                }).then(res => {
                    console.log(res);
                    toast.success("تم ادخال الأداه بنجاح")
                }
    
                ).catch(e => {
                    if(e.response.status === 304)
                    {
                        toast.error('عذرا تم نفاذ العدد المتاح ')
                    }
                    else {
                        toast.error(e.response?.data)
                    }
                })
            }
            else {
                toast.error('من فضلك ادخل اسم المستلم')
            }
            
    }

    const handleExit = async(e) => {
        if(recipient !== '')
        {
            await axios.put(`http://localhost:5137/api/Tools/Exit/${locationId}`, {
                recipient : recipient ,
                toolId : locationId ,
                userId : userId ,
            }).then(res => {
                console.log(res);
                toast.success("تم إخراج الأداه بنجاح")
            }

            ).catch(e => {
                if(e.response.status === 304)
                    {
                        toast.error('عذرا تم نفاذ العدد المتاح ')
                    }
                    else {
                        toast.error(e.response?.data)
                    }
            })
        }
        else {
            toast.error('من فضلك ادخل اسم المستلم')
        }
            
    }

    // const handleDelete = async (Dev_id, Spare_id, name) => {
    //     // console.log(id);
    //     console.log(id)
    //     await axios.delete(`http://localhost:5137/api/DeviceSpareParts/${Dev_id}/${Spare_id}`).then(res => {
    //         toast.success(`تم حذف قطعة ${name} بنجاح`)
    //         getDeviceSpares(id)
    //     }
    //     ).catch(e => console.log(e))



    // };








    return (
        <div className='m-cont' >
            <div className="w-90 p-1 border-0 rounded-4 ">

                <form className='form' >
                    <div className="my-container bg-gray pt-0 pb-5 mt-4 mb-4 t-5 ">

                        {/* <modal open = {openModal}/> */}

                        <h2 className='mt-5'>الأدوات</h2>
                        {/* <span className="underline"></span> */}

                        {/* patient data */}

                        <div className="container">
                            
                            <div className="row mt-3 ">
                                <div className="col ">
                                    <span className='mylabel'>

                                    </span>
                                    <span className='myinput'>
                                        <input className='inp1 text-center' type="text" id="name" value={recipient}
                                            placeholder="اسم المستلم"
                                            onChange={(e)=>setRecipient(e.target.value)}
                                            name="recipient"
                                            required
                                        />
                                    </span>
                                    <button type='button' className="btn btn-primary btn-lg px-4 pt-2 shadow-lg rounded-pill" onClick={handleEnter} >دخول</button>

                                </div>
                                <div className="col ">
                                    <span className='myinput sel'>



                                            <select  
                                            value={locationId}
                                            onChange={(e)=> setLocationId(e.target.value)} className="w-50 h-25 fs-5  mb-4 show-sl " name="deviceType" id="item" >
                                                <option value="" selected disabled > اختر الأدوات </option>
                                                {AllTools ? AllTools.map((type) => (
                                                    <>
                                                        <option type="item" id="item" value={type.id} >{type.name}</option>
                                                    </>
                                                )) : <>لم يتم اضافة ادوات بعد </>}
                                                <option type="item" id="item" value="0" >الكل</option>
                                            </select>



                                        {/* <Select className='' id="deviceLocation"
                                            name='deviceLocation'
                                            // onBlur={handleBlur}  
                                           
                                            required
                                            placeholder=""
                                            // defaultValue={[options[0]]}
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            isMulti
                                            options={options}

                                        >
                                        </Select> */}
                                    </span>

                                    <button type='button' className="btn red btn-lg px-4 pt-1 shadow-lg rounded-pill text-center" onClick={handleExit} >خروج</button>
                                </div>

                                {/* <div className="col ">       
                                    <Link to={'/main/AddTools'}  className="btn teal btn-lg px-4 py-2   border-dark rounded-circle shadow-lg rounded-pill text-center" >اضافة ادوات</Link>
                                </div>   */}

                            </div>

                        </div>
                    



                    </div>
                </form>
                <ToastContainer />

            </div>
        </div>
    )

};

export default GetTools;
