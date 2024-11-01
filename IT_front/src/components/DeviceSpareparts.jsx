import React, { useEffect, useState } from "react";
import "./css/showpatients.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { clinicSchema } from "./schemas/schema";
import { useFormik } from "formik";
import axios from "axios";
import { useContext } from "react";
import { authcontext } from "../Context/authContext";
import Select from 'react-select';

import makeAnimated from 'react-select/animated';




const DeviceSpareParts = () => {
    const { id } = useParams()
    const initialValues = {
        informationId: id,
        sparePartsIds : [] ,
        userId: localStorage.getItem('id')
    }
    const [locationId, setLocationId] = useState(null)
    const [spare, setSpare] = useState([])
    let { getSpares, Allspares ,deviceData , DeviceSpares ,get1Device , getDeviceSpares} = useContext(authcontext);
    const animatedComponents = makeAnimated();

    // console.log(id);

    useEffect(() => {
        if(id)
        {
            get1Device(id)
            getDeviceSpares(id)
        }
        getSpares()

    }, [])

    const options = Allspares.map((type, index) => ({

        label: type.name ,
        value:  type.id 
    }) )

    const {spareParts} = DeviceSpares


    const handleSelect = (option) => {
            setLocationId(option)
            const myoption = option.map((val)=>(val.value))
            // console.log(myoption);
            setSpare(myoption)
            // console.log(spare);
    }

    const handleDelete = async(Dev_id,Spare_id,name) => {
        // console.log(id);
            console.log(id)
            await axios.delete(`http://localhost:5137/api/DeviceSpareParts/${Dev_id}/${Spare_id}/${localStorage.getItem('id')}`).then( res => {
                toast.success(`تم حذف قطعة ${name} بنجاح`)
                getDeviceSpares(id)
            }
            ).catch(e => console.log(e) )



    };
  

    // console.log(options);


    // const hours = new Date().getHours()
    // const minutes = new Date().getMinutes();
    // console.log(hours+':'+minutes);

    const {  handleSubmit,} = useFormik({
        initialValues,
        //   validationSchema: clinicSchema,
        onSubmit: async (values , actions) => {
            values.sparePartsIds = spare
            // values.userId = localStorage.getItem("id")
            // console.log(values)
            await axios.post(`http://localhost:5137/api/DeviceSpareParts`, values).then(res => {
                console.log(res);
                toast.success("تمت اضافة قطع الغيار بنجاح")
                getDeviceSpares(id)
                actions.resetForm()
            }

            ).catch(e => {
                if(e.response.status === 304)
                    {
                        toast.error("عفوا تم نفاذ عدد هذه القطعه")
                    }
                    else {
                        console.log(e);
                        
                    }
            })

        }
    })




    return (
        <div className='m-cont' >
            <div className="w-90 p-1 border-0 rounded-4 ">

                <form onSubmit={handleSubmit} className='mt-3' >
                    <div className="my-container  bg-gray pt-0 pb-5 mt-4 t-3  ">
    
                        {/* <modal open = {openModal}/> */}

                        <h2 className='mt-5  '>قطع غيار الجهاز</h2>
                        {/* <span className="underline"></span> */}

                        {/* patient data */}
                        <div className="row">

                        <span className={`row  devices mt-3 trans ${spareParts ? "w-75" : "w-100"} `}>
                        <div className="row">
                        <span className='mylabel'>
                                    <label className='3' htmlFor='name' name='name'> اسم الجهاز   </label>
                                </span>
                                <span className='myinput'>
                                    <input className='inp1 text-center' type="text" id="name" value={deviceData.name}
                                       disabled
                                    />
                                </span>

                        </div>

                        <div className="row">
                        <span className='mylabel'>
                                    <label className='3' htmlFor='name' name='name'> رقم السيريال </label>
                                </span>
                                <span className='myinput'>
                                    <input className='inp1 text-center' type="text" id="name" value={deviceData.serialNumber}
                                       disabled
                                    />
                                </span>

                        </div>



                            <div className="row locat  ">
                             

                            </div>
                            <div className="row locat mt-3 mb-4 ">
                                
                                <div className="col sel mb-4">
                                    <span className='myinput sel'>

                                        <Select className='w-50 h-25 fs-3'   id="deviceLocation"
                                            name='deviceLocation'
                                            // onBlur={handleBlur}  
                                            value={locationId}
                                            onChange={handleSelect}
                                            required
                                            placeholder = "اختر قطع الغيار للجهاز"
                                            // defaultValue={[options[0]]}
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            isMulti
                                            options={options}
                                            
                                        >
                                            

                                        </Select>

                                    </span>
                                </div>

                            </div>






                        </span>
                        {spareParts &&  <span className="row  devices mt-3 trans w-25 row tab-cont  position-relative showed  ">
                     
                     <table className="h-50 mt-3 ">
                     <thead className="table-head rounded-2 " >
                    
                     <tr className="mb-5 py-2 fs-4 " >
                         <th>اسم القطعه</th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                   
                         {spareParts?.map(loc => (
                         <tr key={loc.id} className="text-center justify-content-center align-items-center fs-3 p-1 bolder">
                             {/* {loc.startDate?.slice(0,10) === new Date().toISOString().slice(0, 10) ? */}
                    
                             <>
                                 <td className=""> {loc?.name} </td>
                                 <td><button type="button" className={`btn danger mx-1 px-2 my-auto fs-5 py-0  `} onClick={()=>handleDelete(deviceData.id,loc.id , loc.name)} >حذف</button></td>
                             </>
                             


                               
                         </tr>
                          ))}
                          <tr className="mt-4 ">
                            <th >العدد </th>
                            <th >{spareParts?.length} </th>
                          </tr>
                   
                 </tbody>
                
                     </table>
                

                 </span> }
                       
                        </div>











                        

                        <button type='submit m-0' className="button">اضافة</button>

                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    )

};

export default DeviceSpareParts;
