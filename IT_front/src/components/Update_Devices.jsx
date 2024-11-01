import React, { useEffect, useState } from 'react'
import style from './css/patients.css'
import { Formik, useFormik } from 'formik'
import axios, { Axios } from 'axios';

import { clinicSchema, dateTime, updateDevice } from './schemas/schema';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { date } from 'yup';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import device1 from "../images/device.jpg"
import { useContext } from 'react';
import { authcontext } from '../Context/authContext';




const UpdateDevices = () => {
    let { getTypes, AllTypes, getLocations, deviceData, get1Device ,  getDeviceLocation} = useContext(authcontext);



    const [selected, setSelected] = useState("")

    const [locationId, setLocationId] = useState("")
    const [typeID, setTypeID] = useState("")

    const { id } = useParams()


    const handleSelect = (e) => {
        const { name, value } = e.target
        if (name === 'hasgraphicsCard') {
            setSelected(value)

        }
        else if (name === 'type') {
            setTypeID(value)
        }
        else {
            setLocationId(value)
            // console.log(e.target.value);
        }

    }

    useEffect(() => {
        if (id) {
            get1Device(id)
            setSelected(values.hasGraphicsCard)
            getDeviceLocation(id)
        }
        getTypes()
        getLocations()

        // console.log(AllTypes);
    }, []);

    const typeComputer = AllTypes?.find(type => type.name.trim() === "جهاز حاسب");
    console.log(deviceData.locationId);
    


    const handleError = (e) => {
        e.preventDefault()
        toast.error(" من فضلك تأكد من صحة جميع البيانات ")
    }

    const getDate = (date) => {
        // console.log(date);
        if (date) {
            return date.slice(0, 10)
        }
        else {
            return -1
        }

    };

    // const hours = new Date().getHours()
    // const minutes = new Date().getMinutes();
    // console.log(hours+':'+minutes);

    const { values, handleChange, handleBlur, handleSubmit, errors, touched, isValid } = useFormik({
        initialValues: {
            name: deviceData?.name,
            // purchase: deviceData?.purchase,
            // price: deviceData?.price,
            serialNumber: deviceData?.serialNumber,
            // documentNumber: deviceData?.documentNumber,
            // exchangeDate: deviceData ? getDate(deviceData.exchangeDate) : '',
            type: deviceData?.type,
            deviceType: deviceData?.deviceType,
            // locationId: deviceData?.locationId,
            // proccessor: deviceData?.proccessor,
            // core: deviceData?.core,
            ram: deviceData?.ram,
            // hasGraphicsCard: deviceData?.hasGraphicsCard,
            // graphicsCard: deviceData?.graphicsCard,
            hard: deviceData?.hard,
            userId: parseInt(localStorage.getItem("id")),
        },
        enableReinitialize: true,
        validationSchema: updateDevice,
        onSubmit: async (values) => {
            // values.userId = localStorage.getItem("id")


            // values.hasGraphicsCard = JSON.parse(values.hasGraphicsCard)


            console.log(values)
            await axios.put(`http://localhost:5137/api/Information/ChangeDeviceSpecification/${id}`, 
                {  ram: values.ram,
                hard: values.hard }).then(res => {
                toast.success("تم تعديل مواصفات الجهاز بنجاح")
            }

            ).catch(e => {
                console.log(e);
            })

        }
    })

    return (
        <div className='allCont' >
            <div className="w-90 p-5 border-0 rounded-4  ">

                <form onSubmit={isValid ? handleSubmit : handleError} className='form' >
                    <div className="my-container bg-gray pt-0 pb-5 mt-4 mb-4 ">

                        {/* <modal open = {openModal}/> */}

                        <h2 className='mt-5  '>اضافة جهاز</h2>
                        {/* <span className="underline"></span> */}

                        {/* patient data */}
                        <div className="row  devices mt-3 ">

                            <div className="col">
                                <span className='mylabel'>
                                    <label className='3' htmlFor='name' name='name'> اسم الجهاز   </label>
                                </span>
                                <span className='myinput'>
                                    <input className='inp1' onChange={handleChange} type="text" id="name" placeholder={values.name}
                                        required
                                        disabled
                                    />
                                </span>

                            </div>
                            <div className="col">
                                <span className='mylabel'>

                                    <label className=' 1' htmlFor='type' name='type'> نوع الجهاز  </label>
                                </span>

                                <span className='myinput'>
                                    <input className='inp1' onChange={handleSelect} type="text" id="type" placeholder={values.deviceType}
                                        disabled
                                        name='type' />


                                </span>

                                {/* <div className="error-container las-err mx-4">
                                    {errors.type && touched.type && <p className='form-error'>{errors.type}</p>}
                                </div> */}

                            </div>
                            <div className="row">

                                <div className="col ">
                                    <span className='mylabel'>
                                        <label className='3' htmlFor='serialNumber' name='serialNumber'> رقم السيريال   </label>
                                    </span>
                                    <span className='myinput' >
                                        <input className='inp1' type="text" id="serialNumber" placeholder={values.serialNumber}
                                            disabled
                                        />
                                    </span>


                                </div>
                                {/* <div className="col">
                                    <span className='mylabel'>
                                        <label className='4 ' htmlFor='documentNumber' name='documentNumber'> رقم الوثيقه   </label>
                                    </span>
                                    <span className='myinput'>
                                        <input className='inp1' onChange={handleChange} type="number" id="documentNumber" placeholder={values.documentNumber}
                                            disabled
                                        />
                                    </span>

                                </div> */}
                            </div>


                            {/* <div className="row row-md  ">


                                <div className="col ">
                                    <span className='mylabel'>
                                        <label className='4' htmlFor='price' name='price'> السعر   </label>
                                    </span>
                                    <span className='myinput'>
                                        <input className='inp1' onChange={handleChange} type="text" id="price" placeholder={values.price}
                                            onBlur={handleBlur}
                                            disabled
                                        />
                                    </span>


                                </div>
                                <div className="col">
                                    <span className='mylabel'>
                                        <label className='3' htmlFor='exchangeDate' name='exchangeDate'> تاريخ الشراء   </label>
                                    </span>
                                    <span className='myinput'>
                                        <input className='inp1' onChange={handleChange} type="فثءف" id="exchangeDate" placeholder={values.exchangeDate}
                                            onBlur={handleBlur}
                                            disabled
                                        />
                                    </span>
                                </div>
                            </div>

                            <div className="row row-md  ">


                                <div className="col ">
                                    <span className='mylabel'>
                                        <label className='4' htmlFor='purchase' name='purchase'> اذن الشراء   </label>
                                    </span>
                                    <span className='myinput'>
                                        <input className='inp1' onChange={handleChange} type="text" id="purchase" placeholder={values.purchase}
                                            onBlur={handleBlur}
                                            required
                                            disabled
                                        />
                                    </span>

                                </div>

                            </div> */}



                            <h2 className='w-25 m-auto mt-3 mn-0'>  مواصفات الجهاز   </h2>
                            {
                                values.type == typeComputer?.id ? <>
{/* 
                                    <div className="row row-md  ">

                                        <div className="col ">
                                            <span className='mylabel'>
                                                <label className='4' htmlFor='proccessor' name='proccessor'> اسم المعالج   </label>
                                            </span>
                                            <span className='myinput'>
                                                <input className='inp1' onChange={handleChange} type="text" id="proccessor" value={values.proccessor}
                                                    onBlur={handleBlur}
                                                    required
                                                />
                                            </span>

                                            <div className="error-container  mx-4">
                                                {errors.proccessor && touched.proccessor && <p className='form-error'>{errors.proccessor}</p>}
                                            </div>


                                        </div>
                                        <div className="col">
                                            <span className='mylabel'>
                                                <label className='3' htmlFor='core' name='core'> نوع المعالج </label>
                                            </span>
                                            <span className='myinput'>
                                                <input className='inp1' onChange={handleChange} type="text" id="core" value={values.core}
                                                    onBlur={handleBlur}
                                                    required
                                                />
                                            </span>

                                            <div className="error-container">
                                                {errors.core && touched.core && <p className='form-error'>{errors.core}</p>}
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="row ">

                                        <div className="col">
                                            <span className='mylabel'>
                                                <label className='3' htmlFor='ram' name='ram'>  الرامات  </label>
                                            </span>
                                            <span className='myinput'>
                                                <input className='inp1' onChange={handleChange} type="text" id="ram" value={values.ram}
                                                    onBlur={handleBlur}
                                                    required
                                                />
                                            </span>

                                            <div className="error-container">
                                                {errors.ram && touched.ram && <p className='form-error'>{errors.ram}</p>}
                                            </div>
                                        </div>



                                        <div className="col">
                                            <span className='mylabel'>
                                                <label className='3' htmlFor='hard' name='hard'>  الهارد  </label>
                                            </span>
                                            <span className='myinput'>
                                                <input className='inp1' onChange={handleChange} type="text" id="hard" value={values.hard}
                                                    onBlur={handleBlur}
                                                    required
                                                />
                                            </span>

                                            <div className="error-container ">
                                                {errors.hard && touched.hard && <p className='form-error'>{errors.hard}</p>}
                                            </div>
                                        </div>
                                    </div>

                                </> : <></>
                            }

                            {/* <div className="row">
                                <div className="col ">
                                    <span className='mylabel'>
                                        <label className='4' htmlFor='hasgraphicsCard' > كارت الشاشه  </label>
                                    </span>
                                    <span className='myinput'>
                                        <select name="hasgraphicsCard" id="" className='inp1' onChange={handleSelect} value={selected ? selected : values.hasGraphicsCard}
                                        >
                                            <option value="true" selected>يوجد</option>
                                            <option value="false">لايوجد</option>
                                        </select>
                                    </span>
                      



                                </div>
                                <div className="col ">
                                    {values.hasGraphicsCard && <>
                                        <span className='mylabel'>
                                            <label className='4' htmlFor='graphicsCard' name='graphicsCard'>اسم كارت الشاشه  </label>
                                        </span>
                                        <span className='myinput'>
                                            <input className='inp1' onChange={handleChange} type="text" id="graphicsCard" value={values.graphicsCard}
                                                onBlur={handleBlur}
                                                required

                                            />
                                        </span>
                                        <div className="error-container  mx-4">
                                            {errors.graphicsCard && touched.graphicsCard && <p className='form-error'>{errors.graphicsCard}</p>}
                                        </div>



                                    </>}




                                </div>
                            </div> */}

{/* 
                            <div className="row locat ">
                                <span className='mylabel'>
                                    <label className='' htmlFor='deviceLocation'> الموقع الحالي للجهاز   </label>
                                </span>
                                <div className="col">
                                    <span className='myinput'>
                                       

                                        <input className='inp1' onChange={handleChange} type="text" id="purchase" placeholder={LastDevLocations?.name}
                                            onBlur={handleBlur}
                                            required
                                            disabled
                                        />

                                    </span>
                                  


                                </div>

                            </div> */}





                        </div>













                        <button type='submit' className="button mt-3 ">تعديل</button>

                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default UpdateDevices

