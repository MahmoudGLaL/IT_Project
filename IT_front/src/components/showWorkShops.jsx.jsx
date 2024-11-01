import React, { Fragment, useContext, useEffect, useState } from "react";
import "./css/showpatients.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import { authcontext } from "../Context/authContext";
import { useFormik } from "formik";


let val_1 = ''
let val_2 = ''


const ShowWorkshops = () => {


    let { getWorkShops, AllWorkShops } = useContext(authcontext);

    const [searched, setSearched] = useState(false);
    const [typeName, setTypeName] = useState("");
    const [CompName, setCompName] = useState("");
    const [myId, setMyId] = useState("");
    const [searchCriteria, setSearchCriteria] = useState({ name: "", company: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOpt, setSelectedOpt] = useState("");





    useEffect(() => {
        getWorkShops()
        // console.log(AllWorkShops );
    }, []);








    // async function handleDelete(id, name) {
    //     console.log(id);

    //     await axios.delete(`http://localhost:5137/api/Workshops/${id}`).then((res) => {
    //         toast.success(`تم حذف ${name} بنجاح`)
    //         getWorkShops()
    //     }

    //     ).catch(e => {
    //         console.log(e)
    //         toast.error("هذا النوع مستخدم بالفعل")
    //     })

    // };

    async function handleGetinp(id) {
        console.log(id);
        setMyId(id)
        await axios.get(`http://localhost:5137/api/Workshops/${id}`).then((res) => {

            setTypeName(res.data.name)
            setCompName(res.data.campanyName)
        }
        ).catch(e => {
            console.log(e)
        })

    };








    const handleSearchChange = (e) => {
        setSearched(true)
        setSelectedOpt(e.target.value)


        const { name, value } = e.target;
        if (name === 'name') {
            val_1 = value
        }

        if (name === 'company') {
            val_2 = value
        }

        setSearchCriteria(prevState => ({ ...prevState, [name]: value }));
        setCurrentPage(1);

        if (val_1 === '' && val_2 === '' ) {
            setSearched(false)
        }

    };

    // const hours = new Date().getHours()
    // const minutes = new Date().getMinutes();
    // console.log(hours+':'+minutes);

    const { values, handleChange, handleBlur, handleSubmit, errors, touched, isValid } = useFormik({
        initialValues: {
            // id : myId ,
            name: typeName,
            campanyName: CompName
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            // values.userId = localStorage.getItem("id")
            // console.log(values)
            // console.log(myId)
            await axios.put(`http://localhost:5137/api/Workshops/${myId}`, values).then(res => {
                // console.log(res);
                toast.success("تم تعديل الورشه بنجاح")
                getWorkShops()
            }
            ).catch(e => console.log(e))

        }

    })

    let filteredTypes = AllWorkShops.filter(type => {
        if(val_1 !== "" && val_2 !== "" )
        {
          return (searchCriteria.name && type.name.toLowerCase().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : "") &&
            searchCriteria.company && type.campanyName.toLowerCase().includes(searchCriteria.company ? searchCriteria.company.toLowerCase() : ""))
        }
        else
        {
            return (
                searchCriteria.name && type.name.toLowerCase().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : "") ||
                searchCriteria.company && type.campanyName.toLowerCase().includes(searchCriteria.company ? searchCriteria.company.toLowerCase() : "")
    
            )
        }
        // console.log(type.name);
       
    }



    )








    return (
        <>
            <div className=" show mx-5  mt-5">
                <h5>جميع الورش</h5>
                <div className="row mb-3 gap-2  ">



                    <div className="col ">
                        <input
                            type="text"
                            className="form-control w-75"
                            placeholder=" ابحث عن اسم الورشه"
                            name="name"
                            value={searchCriteria.name}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="col ">
                        <input
                            type="text"
                            className="form-control w-75"
                            placeholder=" ابحث عن اسم الشركه"
                            name="company"
                            value={searchCriteria.company}
                            onChange={handleSearchChange}
                        />
                    </div>

                    {localStorage.getItem("role") !== "user" &&
                        <div className="col mn-20">
                            <span><Link to={`/main/workShops`} className="btn fw-bold ml-50 mn-1 " >أضف ورشه</Link></span>
                        </div>}

                </div>
            </div>

            {AllWorkShops.length > 0 ? (
                <table className="table table-striped table-hover mt-3 mx-1">
                    {searched ? <>
                        <thead >
                            <tr className="mb-5 py-2" >
                                <th className="light-red">اسم الورشه</th>
                                <th className="light-red" >شركة الصيانه</th>
                                <th ></th>
                                {
                                    (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "SuperAdmin")  && <>
                                        <th ></th>
                                        {/* <th ></th> */}
                                    </>
                                }

                            </tr>
                        </thead>
                        <tbody>
                            {filteredTypes.map(type => (
                                <tr key={type.id} className="text-center justify-content-center align-items-center ">
                                    {/* {type.startDate?.slice(0,10) === new Date().toISOString().slice(0, 10) ? */}
                                    <>
                                        <td > {type?.name} </td>
                                        <td > {type?.campanyName} </td>
                                        <td > <Link to={`/main/WorkShopDevices/${type.id}/${type.name}`} className="btn fw-bold teal  mx-2 px-2 my-auto fs-5 py-2" >عرض الأجهزه</Link> </td>
                                        {
                                            (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "SuperAdmin")  && <>
                                                <td > <button className="btn fw-bold cyan  mx-2 px-3 my-auto fs-5 py-2" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat" onClick={() => handleGetinp(type.id)}>تعديل</button> </td>
                                                {/* <td > <button className="btn fw-bold danger  mx-2 px-3 my-auto fs-5 py-2" onClick={() => handleDelete(type.id, type.name)}>حذف</button> </td> */}
                                            </>
                                        }
                                        {/* <td > {clinic.startDate === null ? <button className="btn fw-bold bg-blue mx-2 px-5 my-2 py-2" type="submit" onClick={()=>getStart(clinic.id , clinic.clinicName)} >ابدأ</button> : <h3 className="fs-3">تم البدأ</h3>} </td> */}
                                        {/* <td > {clinic.endDate === null ? <button className="btn fw-bold danger mx-2 px-5 my-2  " type="submit" onClick={()=>getEnd(clinic.id , clinic.startDate ,clinic.clinicName)} >انهى</button> : <h3 className="fs-3">تم الأنتهاء</h3>}</td> */}
                                    </>
                                    { /* : <></> */}
                                </tr>
                            ))}
                        </tbody>

                    </> : <>


                        <thead >
                            <tr className="mb-5 py-2" >
                                <th className="light-red">اسم الورشه</th>
                                <th className="light-red">شركة الصيانه</th>
                                <th ></th>
                                {
                                    (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "SuperAdmin")  && <>
                                        <th ></th>
                                        {/* <th ></th> */}
                                    </>
                                }

                            </tr>
                        </thead>
                        <tbody>
                            {AllWorkShops.map(type => (
                                <tr key={type.id} className="text-center justify-content-center align-items-center ">
                                    {/* {type.startDate?.slice(0,10) === new Date().toISOString().slice(0, 10) ? */}
                                    <>
                                        <td > {type?.name} </td>
                                        <td > {type?.campanyName} </td>
                                        <td > <Link to={`/main/WorkShopDevices/${type.id}/${type.name}`} className="btn fw-bold teal  mx-2 px-2 my-auto fs-5 py-2" >عرض الأجهزه</Link> </td>
                                        {
                                            (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "SuperAdmin")  && <>
                                                <td > <button className="btn fw-bold cyan  mx-2 px-3 my-auto fs-5 py-2" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat" onClick={() => handleGetinp(type.id)}>تعديل</button> </td>
                                                {/* <td > <button className="btn fw-bold danger  mx-2 px-3 my-auto fs-5 py-2" onClick={() => handleDelete(type.id, type.name)}>حذف</button> </td> */}
                                            </>
                                        }
                                        {/* <td > {clinic.startDate === null ? <button className="btn fw-bold bg-blue mx-2 px-5 my-2 py-2" type="submit" onClick={()=>getStart(clinic.id , clinic.clinicName)} >ابدأ</button> : <h3 className="fs-3">تم البدأ</h3>} </td> */}
                                        {/* <td > {clinic.endDate === null ? <button className="btn fw-bold danger mx-2 px-5 my-2  " type="submit" onClick={()=>getEnd(clinic.id , clinic.startDate ,clinic.clinicName)} >انهى</button> : <h3 className="fs-3">تم الأنتهاء</h3>}</td> */}
                                    </>
                                    { /* : <></> */}
                                </tr>
                            ))}
                        </tbody>
                    </>}

                </table>


            ) : (
                <div className="text-muted">لم يتم اضافة ورش بعد</div>
            )}

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header position-relative">
                            <h5 className="modal-title" id="exampleModalLabel">تعديل الورشه</h5>
                            <button type="button" className="btn-close position-absolute top-20 m-2 start-0" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row  mt-3 ">

                                    <div className="col mx-1">
                                        <span className='mylabel'>
                                            <label className='mb-3 w-100 light-red' htmlFor='name' name='name'> اسم الورشه الجديد  </label>
                                        </span>
                                        <span className='myinput'>
                                            <input className='inp1' onChange={handleChange} type="text" id="name" value={values.name}
                                                name="name"
                                                onBlur={handleBlur}
                                                required
                                            />
                                        </span>

                                    </div>
                                </div>
                                <div className="row  mt-3 ">

                                    <div className="col mx-1">
                                        <span className='mylabel'>
                                            <label className='mb-3 w-100 light-red' htmlFor='campanyName' > اسم الشركه الجديد  </label>
                                        </span>
                                        <span className='myinput'>
                                            <input className='inp1' onChange={handleChange} type="text" id="name" value={values.campanyName}
                                                name="campanyName"
                                                onBlur={handleBlur}
                                            />
                                        </span>

                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn fw-bold btn fw-bold-secondary w-20 fs-5 py-1  position-absolute end-0 mx-5" data-bs-dismiss="modal">
                                        اغلق
                                    </button>
                                    <button type="submit" className="btn fw-bold btn fw-bold-primary w-30  fs-5 py-1" data-bs-dismiss="modal" >
                                        تأكيد
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />

        </>
    );

};

export default ShowWorkshops;
