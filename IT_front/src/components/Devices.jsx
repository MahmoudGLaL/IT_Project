import React, { useEffect, useState } from 'react'
import style from './css/patients.css'
import { Formik, useFormik } from 'formik'
import axios, { Axios } from 'axios';

import { clinicSchema, formatDate, dateTime } from './schemas/schema';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { date } from 'yup';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import device1 from "../images/device.jpg"
import { useContext } from 'react';
import { authcontext } from '../Context/authContext';



const initialValues = {
    name: "",
    // purchase: "",
    // price: null,
    serialNumber: "",
    // documentNumber: null,
    // exchangeDate: "",
    type: null,
    // locationId: null,
    // proccessor: "",
    // core: "",
    ram: "",
    // hasGraphicsCard: true,
    // graphicsCard: "",
    hard: "",
    userId: localStorage.getItem("id"),
}


const Devices = () => {
    let { getTypes, AllTypes, getLocations } = useContext(authcontext);




    const [isFound, setIsFound] = useState(true)
    const [selected, setSelected] = useState(true)
    const [locationId, setLocationId] = useState(null)
    const [typeID, setTypeID] = useState(null)


    const handleSelect = (e) => {
        const { name, value } = e.target
        if (name === 'hasgraphicsCard') {
            setSelected(value)
            if (value === 'false') {
                // console.log('yes');
                setIsFound(false)
            }
            else {
                // console.log('no');
                setIsFound(true)
            }
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
        getTypes()
        getLocations()
        // console.log(AllTypes);
    }, []);

    const typeComputer = AllTypes?.find(type => type.name === "جهاز حاسب");
    const handleError = (e) => {
        e.preventDefault()
        toast.error(" من فضلك تأكد من صحة جميع البيانات ")
    }

    // const hours = new Date().getHours()
    // const minutes = new Date().getMinutes();
    // console.log(hours+':'+minutes);

    const { values, handleChange, handleBlur, handleSubmit, errors, touched, isValid } = useFormik({
        initialValues,
        validationSchema: clinicSchema,
        onSubmit: async (values , action) => {
            // values.userId = localStorage.getItem("id")


            // values.locationId = locationId
            // values.hasGraphicsCard = selected
            values.type = typeID
            // values.hasGraphicsCard = JSON.parse(values.hasGraphicsCard)

            console.log(values)
            await axios.post("http://localhost:5137/api/Information/addDevice", values).then(res => {
                toast.success("تم اضافة الجهاز بنجاح")
                action.resetForm()
            }

            ).catch(e => {
                if (e.response.status === 409) {
                    toast.error("رقم السيريال موجود بالفعل")
                }
                else {
                    console.log(e);
                    
                    toast.error("من فضلك تأكد من أضافة موقع 'مخزن' اولا ")
                }
            })

        }
    })
    // ;console.log(typeComputer);
    

    return (
        <div className='allCont p-2 ' >
            <div className="w-90 p-5 border-0  ">

                <form onSubmit={isValid ? handleSubmit : handleError} className='form' >
                    <div className="my-container bg-gray pt-0 pb-5 mt-5 mb-4 rounded-2 ">

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
                                    <input className='inp1'
                                        onChange={handleChange} type="text" id="name" value={values.name}
                                        onBlur={handleBlur}
                                        required
                                    />
                                </span>

                                <div className="error-container">
                                    {errors.name && touched.name && <p className='form-error'>{errors.name}</p>}
                                </div>

                            </div>
                            <div className="col">
                                <span className='mylabel'>

                                    <label className=' 1' htmlFor='type' name='type'> نوع الجهاز  </label>
                                </span>

                                <span className='myinput'>
                                    <select className='inp1' onChange={handleSelect} type="text" id="type" value={typeID}
                                        onBlur={handleBlur}
                                        required name='type' >
                                        <option value="" selected disabled >اختر نوع الجهاز</option>
                                        {AllTypes ? AllTypes.map((type) => (
                                            <>
                                                <option type="item" id="item" value={type.id} >{type.name}</option>
                                            </>
                                        )) : <>لم يتم اضافة انواع الأجهزه بعد </>}


                                    </select>
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
                                        <input className='inp1' onChange={handleChange} type="text" id="serialNumber" value={values.serialNumber}
                                            onBlur={handleBlur}
                                            required
                                            maxLength={13}

                                        />
                                    </span>

                                    <div className="error-container err-r ml-n-1">
                                        {errors.serialNumber && touched.serialNumber && <p className='form-error'>{errors.serialNumber}</p>}
                                    </div>
                                </div>
                                {/* <div className="col">
                                    <span className='mylabel'>
                                        <label className='4 ' htmlFor='documentNumber' name='documentNumber'> رقم الوثيقه   </label>
                                    </span>
                                    <span className='myinput'>
                                        <input className='inp1' onChange={handleChange} type="number" id="documentNumber" value={values.documentNumber}
                                            onBlur={handleBlur}
                                            required
                                        />
                                    </span>


                                    <div className="error-container las-err">
                                        {errors.documentNumber && touched.documentNumber && <p className='form-error'>{errors.documentNumber}</p>}
                                    </div>
                                </div> */}
                            </div>


                            {/* <div className="row row-md  ">


                                <div className="col ">
                                    <span className='mylabel'>
                                        <label className='4' htmlFor='price' name='price'> السعر   </label>
                                    </span>
                                    <span className='myinput'>
                                        <input className='inp1' onChange={handleChange} type="text" id="price" value={values.price}
                                            onBlur={handleBlur}
                                            required
                                        />
                                    </span>

                                    <div className="error-container ">
                                        {errors.price && touched.price && <p className='form-error'>{errors.price}</p>}
                                    </div>


                                </div>
                                <div className="col">
                                    <span className='mylabel'>
                                        <label className='3' htmlFor='exchangeDate' name='exchangeDate'> تاريخ الشراء   </label>
                                    </span>
                                    <span className='myinput'>
                                        <input className='inp1' onChange={handleChange} type="date" id="exchangeDate" value={values.exchangeDate}
                                            onBlur={handleBlur}
                                            required
                                        />
                                    </span>

                                    <div className="error-container las-err">
                                        {errors.exchangeDate && touched.exchangeDate && <p className='form-error'>{errors.exchangeDate}</p>}
                                    </div>
                                </div>
                            </div> */}

                            {/* <div className="row row-md  ">


                                <div className="col ">
                                    <span className='mylabel'>
                                        <label className='4' htmlFor='purchase' name='purchase'> اذن الشراء   </label>
                                    </span>
                                    <span className='myinput'>
                                        <input className='inp1' onChange={handleChange} type="text" id="purchase" value={values.purchase}
                                            onBlur={handleBlur}
                                            required
                                        />
                                    </span>

                                    <div className="error-container err-r ">
                                        {errors.purchase && touched.purchase && <p className='form-error'>{errors.purchase}</p>}
                                    </div>


                                </div>

                            </div> */}

                            {typeID == typeComputer?.id  && <>
                                <h2 className='w-25 m-auto mt-3 mn-0'>  مواصفات الجهاز   </h2>



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


                            </>}





                            {/* <div className="row">
                                <div className="col ">
                                    <span className='mylabel'>
                                        <label className='4' htmlFor='hasgraphicsCard' > كارت الشاشه  </label>
                                    </span>
                                    <span className='myinput'>
                                        <select name="hasgraphicsCard" id="" className='inp1' onChange={handleSelect} value={selected}
                                        >
                                            <option value="true" selected>يوجد</option>
                                            <option value="false">لايوجد</option>
                                        </select>
                                    </span>
                                  


                                </div>
                                <div className="col ">
                                    {isFound && <>
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


                            {/* <div className="row locat ">
                                <span className='mylabel'>
                                    <label className='' htmlFor='deviceLocation'> الموقع الحالي للجهاز   </label>
                                </span>
                                <div className="col">
                                    <span className='myinput'>
                                        <select className='inp1' onChange={handleSelect} type="text" id="deviceLocation"
                                            name='deviceLocation'
                                            value={locationId}
                                            onBlur={handleBlur}
                                            required
                                        >
                                            <option value="" selected disabled >اختر موقع الجهاز</option>
                                            {AllLocations?.map((locat) => (
                                                <>
                                                    <option type="item" id="item" value={locat.id}>{locat.name}</option>
                                                </>

                                            ))}

                                        </select>

                                    </span>
                                  


                                </div>

                            </div> */}




                        </div>













                        <button type='submit' className="button mt-3 ">اضافة</button>

                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Devices

