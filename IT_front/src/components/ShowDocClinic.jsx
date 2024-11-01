import React, { Fragment, useContext, useEffect, useState } from "react";
import "./css/showpatients.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import { authcontext } from "../Context/authContext";


let val_1 = ''
let val_2 = ''
let val_3 = ''

const ShowDocClinics = () => {
    const id = localStorage.getItem("id")
    let { getAllClinincs, allClinics } = useContext(authcontext);

    const [searched, setSearched] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState({ DocName: "", ClinicName: "", type: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOpt, setSelectedOpt] = useState("");

    const patientsPerPage = 5;

    let navigate = useNavigate();

    useEffect(() => {
        getAllClinincs()
        // console.log(allClinics);
    }, []);








    async function handleStart  (id)  {
        console.log(id);

        await axios.put(`http://localhost:5137/api/UserClinics/next/${id}`).then((res) =>{
            if(res.data.current)
            {
                navigate(`/main/talkReservers/${id}`)
            }
            else{
                toast.error("لا يوجد مرضى حتى الأن")
            }
           
        }
                
        ).catch(e => console.log(e) )

    };

    // const getStart = async(id , name) => {
    //     // console.log(id);
    //     await axios.put(`http://localhost:5137/api/Clinics/start/${id}/${localStorage.getItem("id")}`).then(
    //        toast.success(`تم بدأ عيادة ${name} بنجاح`)
    //     ).catch(e => console.log(e) )
    //     GetClinincs()

    // };

    // const getEnd = async(id,startdate,name) => {
    //     // console.log(id);
    //     if(startdate === null)
    //         {
    //             toast.error(`عذرا عيادة ${name}ّ  لم تبدأ بعد`) 
    //         }
    //     else{
    //         await axios.put(`http://localhost:5137/api/Clinics/end/${id}`).then(
    //             toast.success(`تم انهاء عيادة ${name} بنجاح`)
    //         ).catch(e => console.log(e) )
    //     }

    //     GetClinincs()

    // };
    
    const handleSelect = (e) => { 
        setSelectedOpt(e.target.value)
        if(e.target.value === '2')
            {
                setSearched(false)
            }
        else {
            setSearched(true)
            searchCriteria.type = selectedOpt
        }
       
        
    }


    const handleSearchChange = (e) => {
        setSearched(true)

        

        const { name, value } = e.target;
        if (name === 'type') {
            val_1 = value
            handleSelect(e)
        }
        else if (name === 'ClinicName') {
            val_2 = value
        }
        else if (name === 'DocName') {
            val_3 = value
        }
        setSearchCriteria(prevState => ({ ...prevState, [name]: value }));
        setCurrentPage(1);

        if (val_1 === '' && val_2 === '' && val_3 === '') {
            setSearched(false)
        }

    };

    let filteredClinics = allClinics.filter(clinic => {
       

        if (val_1 !== "" && val_2 !== "" && val_3 === "") {
            return (
               ( searchCriteria.ClinicName && clinic.clinicname.toLowerCase().includes(searchCriteria.ClinicName ? searchCriteria.ClinicName.toLowerCase() : "")) &&

                (searchCriteria.type && clinic.type.toString().includes(searchCriteria.type ? searchCriteria.type.toLowerCase() : ""))

            )
        }
       else if (val_1 !== "" && val_2 !== "" && val_3 !== "") {
            return (
                (searchCriteria.ClinicName && clinic.clinicname.toLowerCase().includes(searchCriteria.ClinicName ? searchCriteria.ClinicName.toLowerCase() : "")) &&

                (searchCriteria.DocName && clinic.doctorname.toString().includes(searchCriteria.DocName ? searchCriteria.DocName : "")) &&



               ( searchCriteria.type && clinic.type.toString().includes(searchCriteria.type ? searchCriteria.type.toLowerCase() : ""))

            )
        }
       else if (val_1 !== "" && val_2 === "" && val_3 !== "") {
            return (
                (searchCriteria.type && clinic.type.toString().includes(searchCriteria.type ? searchCriteria.type.toLowerCase() : "")) &&

                (searchCriteria.DocName && clinic.doctorname.toString().includes(searchCriteria.DocName ? searchCriteria.DocName : "")) 


            )
        }


        else if (val_1 === "2" && val_2 === "" && val_3 !== "" )
        {
            return( searchCriteria.DocName && clinic.doctorname.toString().includes(searchCriteria.DocName ? searchCriteria.DocName : ""))
           
        }
        else if (val_1 === "2" && val_2 !== "" && val_3 === "")
        {
            return(searchCriteria.ClinicName && clinic.clinicname.toLowerCase().includes(searchCriteria.ClinicName ? searchCriteria.ClinicName.toLowerCase() : ""))
            
        }
        else if (val_1 === "2" && val_2 !== "" && val_3 !== "")
        {
            return (  (searchCriteria.DocName && clinic.doctorname.toString().includes(searchCriteria.DocName ? searchCriteria.DocName : "")) &&
            (searchCriteria.ClinicName && clinic.clinicname.toLowerCase().includes(searchCriteria.ClinicName ? searchCriteria.ClinicName.toLowerCase() : "")))
          
        }


        else {
            return (
                searchCriteria.ClinicName && clinic.clinicname.toLowerCase().includes(searchCriteria.ClinicName ? searchCriteria.ClinicName.toLowerCase() : "") ||

                searchCriteria.DocName && clinic.doctorname.toString().includes(searchCriteria.DocName ? searchCriteria.DocName : "") ||

                searchCriteria.type && clinic.type.toString().includes(searchCriteria.type ? searchCriteria.type.toLowerCase() : "")

            )
        }



    })


    // Pagination logic
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = filteredClinics.slice(indexOfFirstPatient, indexOfLastPatient);
    const totalPages = Math.ceil(filteredClinics.length / patientsPerPage);



    return (
        <>
            <div className=" show mx-5  p-5 mt-5">
                <h5>جميع العيادات</h5>
                <div className="row mb-3 gap-5  ">

                    <div className="col ">

                        <select className="show-sl mt-2  " name="type" id="item" onChange={handleSearchChange} value={selectedOpt} >
                            <option value="" selected disabled >اختر نوع العياده</option>
                            <option type="item" id="item" value="0">عسكريين</option>
                            <option type="item" id="item" value="1" >مدنيين</option>
                            <option type="item" id="item" value="2" >الكل</option>
                        </select>

                    </div>
                   
                    <div className="col ">
                        <input
                            type="text"
                            className="form-control w-75"
                            placeholder=" ابحث عن اسم الدكتور"
                            name="DocName"
                            value={searchCriteria.DocName}
                            onChange={handleSearchChange}
                        />
                    </div>

                     <div className="col ">
                        <input
                            type="text"
                            className="form-control w-75"
                            placeholder=" ابحث عن اسم العياده"
                            name="ClinicName"
                            value={searchCriteria.ClinicName}
                            onChange={handleSearchChange}
                        />
                    </div>


                    {/* <div className="col py-3 w-100 ">
                            <select className="show-sl" name="show-sl" id="item" onChange={handleSelect} value={searchCriteria.userRole} >
                                <option value="0" selected >اختر صلاحية المضيف</option>
                                <option type="item" id="item" value="admin">admin</option>
                                <option type="item" id="item" value="user" >user</option>
                            </select>
                        </div> */}
                    <div className="col mn-20">
                        {/* <span><Link to={`/main/addClinic`} className="btn ml-50 mn-1 " >أضف عيادة</Link></span> */}
                    </div>
                </div>
            </div>

            {allClinics.length > 0 ? (
                <table className="table table-striped table-hover mt-3">
                        {searched ? <>
                        
                            <thead >
                        <tr className="mb-5 py-2" >
                            <th style={{ color: 'rgb(97, 0, 0)' }} >اسم العياده</th>
                            <th style={{ color: 'rgb(97, 0, 0)' }}>اسم الدكتور</th>
                            <th style={{ color: 'rgb(97, 0, 0)' }}>نوع العياده</th>
                            <th style={{ color: 'rgb(97, 0, 0)' }}>عدد المرضى</th>
                            <th style={{ color: 'rgb(97, 0, 0)' }}>مضافة من </th>
                            <th style={{ color: 'rgb(97, 0, 0)' }}> </th>
                            {/* <th >حالة البدأ</th> */}
                            {/* <th >حالة الأنتهاء</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClinics.map(clinic => (
                            <tr key={clinic.id} className="text-center justify-content-center align-items-center">
                                {/* {clinic.startDate?.slice(0,10) === new Date().toISOString().slice(0, 10) ? */}
                                <>
                                    <td > {clinic.clinicname} </td>
                                    <td > {clinic.doctorname} </td>
                                    <td > {clinic.type === 0 ? <>عسكريين</> : <>مدنيين</>} </td>
                                    <td > {clinic.count} </td>
                                    <td > {clinic.username} </td>
                                    <td > <button className="btn cyan mx-2 px-5 my-2" onClick={() => handleStart(clinic.clinicId , clinic.clinicname)}>بدأ</button> </td>
                                    {/* <td > {clinic.startDate === null ? <button className="btn bg-blue mx-2 px-5 my-2 py-2" type="submit" onClick={()=>getStart(clinic.id , clinic.clinicName)} >ابدأ</button> : <h3 className="fs-3">تم البدأ</h3>} </td> */}
                                    {/* <td > {clinic.endDate === null ? <button className="btn danger mx-2 px-5 my-2  " type="submit" onClick={()=>getEnd(clinic.id , clinic.startDate ,clinic.clinicName)} >انهى</button> : <h3 className="fs-3">تم الأنتهاء</h3>}</td> */}
                                </>
                                { /* : <></> */}
                            </tr>
                        ))}
                    </tbody>
                        
                        </> : <>
                        
                        
                            <thead >
                        <tr className="mb-5 py-2" >
                            <th style={{ color: 'rgb(97, 0, 0)' }} >اسم العياده</th>
                            <th style={{ color: 'rgb(97, 0, 0)' }}>اسم الدكتور</th>
                            <th style={{ color: 'rgb(97, 0, 0)' }}>نوع العياده</th>
                            <th style={{ color: 'rgb(97, 0, 0)' }}>عدد المرضى</th>
                            {/* <th style={{ color: 'rgb(97, 0, 0)' }}>مضافة من </th> */}
                            <th style={{ color: 'rgb(97, 0, 0)' }}> </th>
                            {/* <th >حالة البدأ</th> */}
                            {/* <th >حالة الأنتهاء</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {allClinics.map(clinic => (
                            <tr key={clinic.id} className="text-center justify-content-center align-items-center">
                                {/* {clinic.startDate?.slice(0,10) === new Date().toISOString().slice(0, 10) ? */}
                                <>
                                    <td > {clinic.clinicname} </td>
                                    <td > {clinic.doctorname} </td>
                                    <td > {clinic.type === 0 ? <>عسكريين</> : <>مدنيين</>} </td>
                                    <td > {clinic.count} </td>
                                    {/* <td > {clinic.username} </td> */}
                                    <td > <button className="btn cyan mx-2 px-5 my-2" onClick={() => handleStart(clinic.clinicId ,clinic.clinicname)}>بدأ</button> </td>
                                    {/* <td > {clinic.startDate === null ? <button className="btn bg-blue mx-2 px-5 my-2 py-2" type="submit" onClick={()=>getStart(clinic.id , clinic.clinicName)} >ابدأ</button> : <h3 className="fs-3">تم البدأ</h3>} </td> */}
                                    {/* <td > {clinic.endDate === null ? <button className="btn danger mx-2 px-5 my-2  " type="submit" onClick={()=>getEnd(clinic.id , clinic.startDate ,clinic.clinicName)} >انهى</button> : <h3 className="fs-3">تم الأنتهاء</h3>}</td> */}
                                </>
                                { /* : <></> */}
                            </tr>
                        ))}
                    </tbody>
                        </>}
                  
                </table>
            ) : (
                <div className="text-muted">لم يتم اضافة عيادات بعد</div>
            )}

            <ToastContainer />

        </>
    );

};

export default ShowDocClinics;
