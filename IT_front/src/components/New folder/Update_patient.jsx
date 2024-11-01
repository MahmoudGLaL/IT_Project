

import React, { useEffect, useState } from 'react'
import style from './css/patients.css'
import { Formik, useFormik } from 'formik'
import axios, { Axios } from 'axios';

// import { patientSchema , formatDate , dateTime } from './schemas/schema';
import 'react-toastify/dist/ReactToastify.css';
import { toast ,ToastContainer } from 'react-toastify';
import { date } from 'yup';
import { Navigate, useNavigate, useParams} from 'react-router-dom';




let initialValues = {
    name: '',
    age: '',
    room_number: '',
    patientNumber: '',
    phoneNumber: '',
    surgeon: '',
    assistantPhysician: '',
    anesthetist: '',
    typeOfSurgery: '',
    startAt: '',
    time : '',
    endAt: '',
}






const UpdatePatients = () => {
    let { id } = useParams()
    // console.log(id);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate() ;

    let userId = localStorage.getItem("id")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:11923/api/Patients/${id}`);
                // console.log(res.data);
                getInputData(res.data)
                // setData(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData()
    }, []);



// get time and date
    const getDate = (date) => {
        // console.log(date);
        if(date)
            {
                return date.slice(0,10)
            }
        else {
            return -1
        }
        
    };

    const getTime = (time) => {
        // console.log(date);
        if(time)
            {
                return time.slice(11,16)
            }
        else {
            return -1
        }
        
    };

    // console.log("time is",getTime(data.startAt));
    

const getInputData = async(data)=> {

        
        initialValues = {
        name: data.name,
        age:data.age,
        room_number: data.room_number,
        patientNumber: data.patientNumber,
        phoneNumber: data.phoneNumber,
        surgeon: data.surgeon,
        assistantPhysician: data.assistantPhysician,
        anesthetist: data.anesthetist,
        typeOfSurgery: data.typeOfSurgery,
        startAt: getDate(data.startAt),
        endAt: data.endAt ? getDate(data.endAt) : null,
        time : getTime(data.startAt),
        userId : parseInt(userId)
    };
    // console.log(getTime(data.startAt));  
    setLoading(true)
    // console.log(initialValues.name);

}

    
    

     const {values , handleChange , handleBlur , handleSubmit , errors ,touched,isValid } = useFormik({
        enableReinitialize : true,
        initialValues ,
        // validationSchema : patientSchema  ,
        onSubmit : async(values,actions) => {
            console.log(values);
            //  "2024-06-11T09:28:21.806Z"
            await axios.put(`http://localhost:11923/api/Patients/AlterData/${id}`, values ).then((res)=> {
                console.log({resccccccccccccccccccccccccccccccccccccccccccccccccc:res});
                // localStorage.setItem('user', JSON.stringify(user)); 
     
                // alert("success")
                toast.success("تمت تعديل بيانات المريض بنجاح")
                
                
            }).catch(err=>{
                console.log(err);
            })
        },
     });

    

    //  test formik
    // get reloaded
    const handleError = (e) => {
        e.preventDefault()
        toast.error(" من فضلك تأكد من صحة جميع البيانات ")
    }

    // useEffect(() => {
    //     formatDate(values.startAt , values.time)
    // }
    // ,[values.startAt,values.time])



    // show-patients-navigate

    

   


// don't forget to get the immediate date and time from the axios post to database -- or do it by your self
    return (
        <div style={{backgroundColor : 'rgb(30, 52, 73)'}} >
        <div className="w-100 p-5 border-0 rounded-4 ">
          
            <form onSubmit={isValid ? handleSubmit : handleError}>
            {loading && <div className="my-container bg-gray pt-0 pb-5">
                    {/* <modal open = {openModal}/> */}

                    <h5 className='mt-5'>تعديل المريض </h5>
                    <span className="underline"></span>

                    {/* patient data */}
                    <div className="inside-cont">

                        <div className="row">
                            <label className='lab0' htmlFor='name' name='name'> اسم المريض :</label>
                            <input className='inp1' type="text" id="name"
                            value={values.name}
                            onBlur={handleBlur}
                            onChange={handleChange}  
                            required  
                            />
                            <div className="error-container">
                                {errors.name && touched.name && <p className='form-error'>{errors.name}</p>}
                            </div>
                        </div>

                        <div className="row">
                            <label className='lab0' htmlFor='patientNumber' > رقم المريض :</label>
                            <input className='inp1' type="number" id="patientNumber" name='patientNumber'
                            //  placeholder={data ? data.patientNumber + 1 : "1"}
                             value={values.patientNumber}
                             onBlur={handleBlur}
                             onChange={handleChange}

                        
                            />
                            <div className="error-container">
                                {errors.patientNumber && touched.patientNumber && <p className='form-error'>{errors.patientNumber}</p>}
                            </div>
                        </div>
                        

                        <div className="row">
                        <label className='' htmlFor='age' > السن : </label>
                            <input className='inp3' type="text" id="age" name='age'
                            value={values.age}
                            onBlur={handleBlur}
                            onChange={handleChange} 
                            required     
                            />
                            <input className='inp2' type="text" id="phoneNumber" name="phoneNumber"
                            placeholder='01*********'
                            value={values.phoneNumber}
                             onBlur={handleBlur}
                             onChange={handleChange}  
                               
                            />
                             <div className="error-container">
                                {errors.age && touched.age && <p className='form-error'>{errors.age}</p>}
                             </div>
                             <div className="error-cont">
                                {errors.phoneNumber && touched.phoneNumber && <p className='form-error'>{errors.phoneNumber}</p>}
                             </div>
                            <label className='lab2' htmlFor='phone'> رقم الهاتف : </label>
                        </div>
                       

                        {/* room num . operation type */}

                        <div className="row">
                            <label className='lab0 med' htmlFor='room-num' > رقم الغرفه : </label>
                            
                            <input className='inp3' type="number" id="room-num" name="room_number"
                                // placeholder='A1'
                                value={values.room_number}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                required     
                            />
                            <input className='inp2' type="text" id="s-type" name="typeOfSurgery" 
                            value={values.typeOfSurgery}
                            onBlur={handleBlur}
                            onChange={handleChange} 
                            required  
                            />
                             <div className="error-cont">
                                {errors.typeOfSurgery && touched.typeOfSurgery && <p className='form-error'>{errors.typeOfSurgery}</p>}
                             </div>
                             <div className="error-container">
                                {errors.room_number && touched.room_number && <p className='form-error'>{errors.room_number}</p>}
                             </div>
                            <label htmlFor='s-type' className='lab2'> نوع الجراحه : </label>
                            
                        </div>

                        {/* operation date , time */}

                        <div className="row">
                            <div className="op-date">
                            <label htmlFor='time' className='lab1'> الساعه : </label>
                                <input className='inp3' type="date" id="date1" name='startAt'
                                value={values.startAt}
                                onBlur={handleBlur}
                                onChange={handleChange}  
                                required
                                />
                                <input className='inp4 las-in' type="time" id="time" name='time'
                                value={values.time}
                                onBlur={handleBlur}
                                onChange={handleChange} 
                                required 
                                />
                                  <div className="error-container-2">
                                {errors.startAt && touched.startAt && <p className='form-error'>{errors.startAt}</p>}
                             </div>
                                <label className='lab2' htmlFor='date1'> ت بدأ العمليه : </label>
                            </div>

                        </div>

                        {/* doctors */}
                        <div className="row">
                            <label htmlFor='s-name' className='lab0 med'> اسم الجراح : </label>
                            <input className='inp1' type="text" id="s-name" name="surgeon"
                            value={values.surgeon}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            required  
                            
                            />
                             <div className="error-container">
                                {errors.surgeon && touched.surgeon && <p className='form-error'>{errors.surgeon}</p>}
                             </div>
                        </div>
                        {/* helpers */}
                       
                        <div className="row">
                            <label htmlFor='s-help' className='lab0'> الجراح المساعد : </label>
                            <input className='inp3 last2' type="text" id="s-help" name="assistantPhysician"
                            value={values.assistantPhysician}
                            onBlur={handleBlur}
                            onChange={handleChange}
                              
                            />
                            <input className='inp2 last1' type="text" id="anthesis" name='anesthetist'
                            value={values.anesthetist}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            
                            />
                            <div className="error-container">
                                {errors.assistantPhysician && touched.assistantPhysician && <p className='form-error'>{errors.assistantPhysician}</p>}
                             </div>
                             <div className="error-cont ">
                                {errors.anesthetist && touched.anesthetist && <p className='form-error'>{errors.anesthetist}</p>}
                             </div>
                            <label className='lab2 last' htmlFor='anthesis' >د التخدير :</label>
                        </div>
                        

                    </div>
                    <ToastContainer/>

                    <button className="button">تحديث</button>
                    
                </div> }   
            </form>
        </div>
        </div>
    )
}

export default UpdatePatients

