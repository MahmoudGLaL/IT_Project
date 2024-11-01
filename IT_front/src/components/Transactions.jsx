import React, { useContext, useEffect } from "react";
import "./css/showpatients.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { clinicSchema, Transactionschema } from "./schemas/schema";
import { useFormik } from "formik";
import axios from "axios";
import { authcontext } from "../Context/authContext";





const Transactions = () => {
    const{id} = useParams()

  const initialValues = {
  informationId: id,
  deliveryDate: "",
  nameOfRecipient: "",
  workshopID: null ,
  userId : localStorage.getItem('id')
}
let {  getWorkShops , AllWorkShops , deviceData , get1Device , GetlastWorkShops , LastWorkShop , DeviceTransaction , getDeviceTransaction  } = useContext(authcontext);
  const navigate = useNavigate()


  
  useEffect(() => {
    if(id)
    {
        get1Device(id)
        GetlastWorkShops(id)
        getDeviceTransaction(id)
    }
    getWorkShops()
   // console.log(AllWorkShops );
}, []);
  const handleError = (e) => {
      e.preventDefault()
      toast.error(" من فضلك تأكد من صحة جميع البيانات ")
  }
  const handleNav = () => {
      navigate(`/main/ShowDeviceTransaction/${id}`)
  }

  const {transactions} = DeviceTransaction

//   console.log(DeviceTransaction);
  
  // const hours = new Date().getHours()
  // const minutes = new Date().getMinutes();


  const { values, handleChange, handleBlur, handleSubmit, errors, touched, isValid } = useFormik({
      initialValues,
      validationSchema: Transactionschema,
      onSubmit: async (values , actions) => {
          // values.userId = localStorage.getItem("id")
          console.log(values)
          await axios.post("http://localhost:5137/api/Transactions", values).then( res => {
                // console.log(res);
              toast.success("تم اضافة الصيانة بنجاح")
              navigate('/main/allTransactions')
              actions.resetForm()
          }
          ).catch(e => console.log(e))

      }
  })


   

  return (
    <div className='trans-cont ' >
        <div className="w-90  border-0 rounded-4 ">

            <form onSubmit={isValid ? handleSubmit : handleError} className='form' >
                <div className="my-container bg-gray pt-0 pb-5  mb-4 t-3   ">

                    {/* <modal open = {openModal}/> */}

                    <h2 className='mt-5 mx-5 '>إدخال الصيانة </h2>
                    {/* <span className="underline"></span> */}

                    {/* patient data */}
                    {/* <div className={`row  devices mt-3 trans ${spareParts ? "w-75" : "w-100"}   `}> */}
                    <div className="row">
                        <span className={`row  devices mt-3  ${LastWorkShop.name ? "w-75" : "w-100"} `} >
                            <div className="row">
                            <span className='mylabel'>
                                        <label className='3' htmlFor='name' name='name'> اسم الجهاز   </label>
                                    </span>
                                    <span className='myinput'>
                                        <input className='inp1 text-center' type="text" id="name" placeholder={deviceData.name}
                                        disabled
                                        />
                                    </span>

                            </div>
                            <div className="col  mb-1">
                                
                                <span className='mylabel del'>
                                    <label className='3' htmlFor='deliveryDate' name='deliveryDate'> تاريخ الطلب   </label>
                                </span>
                                <span className='myinput'>
                                    <input className='inp1' onChange={handleChange} type="date" id="deliveryDate" value={values.deliveryDate}
                                        onBlur={handleBlur}
                                        required
                                        name="deliveryDate"
                                    />  
                                </span>
                            
                                <div className="error-container las-err">
                                    {errors.deliveryDate && touched.deliveryDate && <p className='form-error'>{errors.deliveryDate}</p>}
                                </div>

                            </div>
                            {/* <div className="col">
                                <span className='mylabel del'>

                                    <label className=' 1' htmlFor='receivedDate' name='receivedDate'> تاريخ الأستلام </label>
                                </span>

                                <span className='myinput'>
                                <input className='inp1' onChange={handleChange} type="date" id="receivedDate" value={values.receivedDate}
                                        onBlur={handleBlur}
                                        required 
                                        name="receivedDate" >
                                    </input>
                                </span>
                                
                                <div className="error-container las-err">
                                    {errors.receivedDate && touched.receivedDate && <p className='form-error'>{errors.receivedDate}</p>}
                                </div>

                            </div> */}


                            <div className="row locat mt-2 ">
                                <span className='mylabel'>
                                    <label className=' m-0 ' htmlFor='workshopID' name='workshopID'> اسم الورشه </label>
                                </span>
                                <div className="col sel">
                                <span className='myinput'>

                                <select className='inp1' onChange={handleChange}  id="type" value={values.workshopID}
                                            onBlur={handleBlur}
                                            required 
                                            name="workshopID" >
                                            <option value="" selected disabled >اختر اسم الورشه</option>

                                            {AllWorkShops ? AllWorkShops.map((type) => (
                                                <>
                                                    <option type="item" id="item" value={type.id} >{type.name}</option>
                                                </>
                                            )) : <></>}
                                </select>
                                
                                </span>
                                </div>
                                <div className="error-container las-err err-r">
                                    {errors.workshopID && touched.workshopID && <p className='form-error'>{errors.workshopID}</p>}
                                </div>

                            </div>

                            <div className="row locat mt-1 m-n-20 ">
                                <span className='mylabel'>
                                    <label className=' m-0 m-n-1 ' htmlFor='nameOfRecipient' name='nameOfRecipient'> اسم المستلم  </label>
                                </span>
                                <div className="col">
                                <span className='myinput'>

                                <input className='inp1 w-50' onChange={handleChange} type="text" id="nameOfRecipient" value={values.nameOfRecipient}
                                    onBlur={handleBlur}
                                    required
                                />
                                </span>
                                </div>
                                <div className="error-container err-r">
                                    {errors.nameOfRecipient && touched.nameOfRecipient && <p className='form-error'>{errors.nameOfRecipient}</p>}
                                </div>

                            </div>

                            <div className="row">
                                <span className='mylabel'>
                                    <label className='m-2' htmlFor='description' name='description'> وصف العطل </label>
                                </span>
                                <span className='myinput '>
                                    <div className="col myarea">
                                        <textarea className='w-50 m-auto fs-3 ' onChange={handleChange} type="text" id="description" value={values.description}
                                            onBlur={handleBlur}
                                            required
                                        />
                                        <div className="error-container err-r ">
                                            {errors.description && touched.description && <p className='form-error'>{errors.description}</p>}
                                        </div>
                                    </div>

                                </span>

                            </div>


                            {DeviceTransaction?.transactions?.length > 0   ? <>
                            {
                                DeviceTransaction.transactions[transactions.length-1]?.receivedDate !== null ? <button type='submit ' className="button mt-4 m-auto py-4 px-2">صيانه</button> : <div onClick={handleNav} className=" fw-bold fs-4 bg-home text-light mt-4 w-25 m-auto py-2 px-2"> الجهاز موجود بالصيانه بالفعل </div>
                            } 
                             </> 
                             : 
                             <>
                             <button type='submit ' className="button mt-1 m-auto py-2 px-1">صيانه</button>
                             </> }
                            


                        </span>


                        {LastWorkShop?.name &&  <span className="row  devices mt-2  w-25 row tab-cont  position-relative showed  ">
                        
                        <table className="h-50 mt-5">
                        <thead className="table-head rounded-2 " >
                        
                        <tr className="mb-2 py-2 fs-4 " >
                            <th>اخر ورشه للجهاز</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
               

                            <tr key={LastWorkShop.id} className="text-center justify-content-center align-items-center fs-3 p-1 bolder">
                                {/* {loc.startDate?.slice(0,10) === new Date().toISOString().slice(0, 10) ? */}
                        
                                <>
                                    <td className=""> {LastWorkShop.name} </td>

                                </>
                                


                                
                            </tr>

                            
                    
                    </tbody>
                    
                        </table>
                    

                    </span> }
                    </div>








                    <ToastContainer />



                </div>
            </form>
        </div>
    </div>
)

};

export default Transactions;
