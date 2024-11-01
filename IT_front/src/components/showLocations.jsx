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
let val_3 = ''

const ShowLocations = () => {


    let { getLocations, AllLocations,  } = useContext(authcontext);

    const [searched, setSearched] = useState(false);
    const [LocationName, setLocationName] = useState("");
    const [departName, setDepartName] = useState("");
    const [buildingName, setBuildingName] = useState("");

    const [myId, setMyId] = useState("");
    const [searchCriteria, setSearchCriteria] = useState({ name: "", department: "", building: "" });
    const [currentPage, setCurrentPage] = useState(1);


    const patientsPerPage = 5;

    // let navigate = useNavigate();

    useEffect(() => {
        getLocations()
        // console.log(AllLocations );
    }, []);


    // async function handleDelete(id, name) {
    //     console.log(id);

    //     await axios.delete(`http://localhost:5137/api/Locations/${id}`).then((res) => {
    //         toast.success(`تم حذف ${name} بنجاح`)
    //         getLocations()
    //     }

    //     ).catch(e => {
    //         console.log(e)
    //         toast.error("هذا النوع مستخدم بالفعل")
    //     })

    // };

    async function handleGetinp(id) {
        console.log(id);
        setMyId(id)
        await axios.get(`http://localhost:5137/api/Locations/${id}`).then((res) => {
            console.log(res);
            setLocationName(res.data.name)
            setDepartName(res.data.department)
            setBuildingName(res.data.building)
            // setDescription(res.data.description)
        }
        ).catch(e => {
            console.log(e)
        })

    };













    const handleSearchChange = (e) => {
        setSearched(true)



        const { name, value } = e.target;
        if (name === 'name') {
            val_1 = value
        }
        else if (name === 'department') {
            val_2 = value
        }
        else if (name === 'building') {
            val_3 = value
        }
        setSearchCriteria(prevState => ({ ...prevState, [name]: value }));
        setCurrentPage(1);

        if (val_1 === '' && val_2 === '' && val_3 === '') {
            setSearched(false)
        }

    };

    let filteredTypes = AllLocations.filter(clinic => {


        if (val_1 !== "" && val_2 !== "" && val_3 === "") {
            return (
                (searchCriteria.name && clinic.name.toLowerCase().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : "")) &&

                (searchCriteria.department && clinic.department.toString().includes(searchCriteria.department ? searchCriteria.department.toLowerCase() : ""))

            )
        }
        else if (val_1 !== "" && val_2 !== "" && val_3 !== "") {
            return (
                (searchCriteria.name && clinic.name.toLowerCase().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : "")) &&

                (searchCriteria.building && clinic.building.toString().includes(searchCriteria.building ? searchCriteria.building : "")) &&



                (searchCriteria.department && clinic.department.toString().includes(searchCriteria.department ? searchCriteria.department.toLowerCase() : ""))

            )
        }
        else if (val_1 !== "" && val_2 === "" && val_3 !== "") {
            return (
                (searchCriteria.department && clinic.department.toString().includes(searchCriteria.department ? searchCriteria.department.toLowerCase() : "")) &&

                (searchCriteria.building && clinic.building.toString().includes(searchCriteria.building ? searchCriteria.building : ""))


            )
        }


        else if (val_1 === "2" && val_2 === "" && val_3 !== "") {
            return (searchCriteria.building && clinic.building.toString().includes(searchCriteria.building ? searchCriteria.building : ""))

        }
        else if (val_1 === "2" && val_2 !== "" && val_3 === "") {
            return (searchCriteria.name && clinic.name.toLowerCase().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : ""))

        }
        else if (val_1 === "2" && val_2 !== "" && val_3 !== "") {
            return ((searchCriteria.building && clinic.building.toString().includes(searchCriteria.building ? searchCriteria.building : "")) &&
                (searchCriteria.name && clinic.name.toLowerCase().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : "")))

        }


        else {
            return (
                searchCriteria.name && clinic.name.toLowerCase().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : "") ||

                searchCriteria.building && clinic.building.toString().includes(searchCriteria.building ? searchCriteria.building : "") ||

                searchCriteria.department && clinic.department.toString().includes(searchCriteria.department ? searchCriteria.department.toLowerCase() : "")

            )
        }



    })




    // Pagination logic
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = filteredTypes.slice(indexOfFirstPatient, indexOfLastPatient);
    const totalPages = Math.ceil(filteredTypes.length / patientsPerPage);






    const { values, handleChange, handleBlur, handleSubmit} = useFormik({
        initialValues: {
            // id : myId ,
            name: LocationName,
            department: departName,
            building: buildingName,
            userId:  parseInt(localStorage.getItem("id")),
            // description: "",
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            // values.userId = localStorage.getItem("id")
            // console.log(values)
            // console.log(myId)
            await axios.put(`http://localhost:5137/api/Locations/${myId}`, values).then(res => {
                console.log(res);
                toast.success("تم تعديل هذا الموقع بنجاح")
                getLocations()
            }
            ).catch(e => console.log(e))

        }
    })










    return (
        <>
            <div className=" show mx-5  mt-5">
                <h5>جميع المواقع</h5>
                <div className="row mb-3 gap-2  ">



                    <div className="col ">
                        <input
                            type="text"
                            className="form-control w-75"
                            placeholder=" ابحث عن اسم الموقع"
                            name="name"
                            value={searchCriteria.name}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="col ">
                        <input
                            type="text"
                            className="form-control w-75"
                            placeholder=" ابحث عن اسم القسم"
                            name="department"
                            value={searchCriteria.department}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="col ">
                        <input
                            type="text"
                            className="form-control w-75"
                            placeholder=" ابحث عن اسم المبنى"
                            name="building"
                            value={searchCriteria.building}
                            onChange={handleSearchChange}
                        />
                    </div>

                    {localStorage.getItem("role") !== "user" &&
                    <div className="col mn-20">
                        <span><Link to={`/main/addLocations`} className="btn fw-bold ml-50 mn-1 " >أضف موقع</Link></span>
                    </div> }

                </div>
            </div>

            {AllLocations.length > 0 ? (
                <table className="table table-striped table-hover mt-3 mx-1">
                    {searched ? <>

                        <thead >
                            <tr className="mb-5 py-2" >
                                <th>اسم الموقع</th>
                                <th>القسم</th>
                                <th>المبنى</th>
                                <th ></th>
                                {
                                    (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "SuperAdmin")  && <>
                                        {/* <th ></th> */}
                                        <th ></th>
                                    </>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTypes.map(loc => (
                                <tr key={loc.id} className="text-center justify-content-center align-items-center">
                                    {/* {loc.startDate?.slice(0,10) === new Date().toISOString().slice(0, 10) ? */}
                                    <>
                                        <td > {loc?.name} </td>
                                        <td > {loc?.department} </td>
                                        <td > {loc?.building} </td>

                                        <td > <Link to={`/main/LocationsDevices/${loc.id}/${loc.name}`} className="btn fw-bold teal  mx-2 px-2 my-auto fs-5 py-2"  >عرض الأجهزه</Link>  </td>
                                        {
                                            (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "SuperAdmin")  && <>
                                            {
                                                loc?.name !== 'مخزن' &&  <>  <td > <button className="btn fw-bold cyan  mx-2 px-3 my-auto fs-5 py-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleGetinp(loc.id)} data-bs-whatever="@fat">تعديل</button> </td> </>
                                            }  
                                            {
                                                loc?.name === 'مخزن' &&  <>  <td >  </td> </>
                                            }  
                                           
                                            {/* <td > <button className="btn fw-bold danger mx-2 px-3 my-auto fs-5 py-2" onClick={() => handleDelete(loc.id, loc.name)}>حذف</button> </td> */}
                                            </>
                                        }

                                        {/* <td > {clinic.startDate === null ? <button className="btn fw-bold bg-blue mx-2 px-5 my-2 py-2" type="submit" onClick={()=>getStart(clinic.id , clinic.name)} >ابدأ</button> : <h3 className="fs-3">تم البدأ</h3>} </td> */}
                                        {/* <td > {clinic.endDate === null ? <button className="btn fw-bold danger mx-2 px-5 my-2  " type="submit" onClick={()=>getEnd(clinic.id , clinic.startDate ,clinic.name)} >انهى</button> : <h3 className="fs-3">تم الأنتهاء</h3>}</td> */}
                                    </>
                                    { /* : <></> */}
                                </tr>
                            ))}
                        </tbody>

                    </> : <>


                        <thead >
                            <tr className="mb-5 py-2" >
                                <th>اسم الموقع</th>
                                <th>القسم</th>
                                <th>المبنى</th>
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
                            {AllLocations.map(loc => (
                                <tr key={loc.id} className="text-center justify-content-center align-items-center">

                                    <>
                                        <td > {loc?.name} </td>
                                        <td > {loc?.department} </td>
                                        <td > {loc?.building} </td>

                                        <td > <Link to={`/main/LocationsDevices/${loc.id}/${loc.name}`} className="btn fw-bold teal  mx-2 px-2 my-auto fs-5 py-2"  >عرض الأجهزه</Link> </td>
                                        {
                                            (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "SuperAdmin")  && <>  
                                            {
                                                loc?.name !== 'مخزن' &&  <>  <td > <button className="btn fw-bold cyan  mx-2 px-3 my-auto fs-5 py-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleGetinp(loc.id)} data-bs-whatever="@fat">تعديل</button> </td> </>
                                            }  
                                            {
                                                loc?.name === 'مخزن' &&  <>  <td >  </td> </>
                                            }  
                                            {/* <td > <button className="btn fw-bold danger mx-2 px-3 my-auto fs-5 py-2" onClick={() => handleDelete(loc.id, loc.name)}>حذف</button> </td> */}
                                            </>
                                        }


                                    </>

                                </tr>
                            ))}
                        </tbody>
                    </>}

                </table>


            ) : (
                <div className="text-muted">لم يتم اضافة مواقع بعد</div>
            )}

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header position-relative">
                            <h5 className="modal-title" id="exampleModalLabel">تعديل الموقع</h5>
                            <button type="button" className="btn-close position-absolute top-20 m-2 start-0" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row  mt-3 ">

                                    <div className="col">
                                        <span className='mylabel'>
                                            <label className='fs-5 light-red' htmlFor='name' name='name'>  اسم الموقع الجديد   </label>
                                        </span>
                                        <span className='myinput'>
                                            <input className='inp1 ' onChange={handleChange} type="text" id="name" value={values.name}
                                                onBlur={handleBlur}
                                                required
                                            />
                                        </span>



                                    </div>
                                </div>
                                <div className="row">

                                    <div className="col ">
                                        <span className='mylabel'>
                                            <label className='fs-5 light-red ' htmlFor='department' name='department'>  اسم القسم الجديد </label>
                                        </span>
                                        <span className='myinput' >
                                            <input className='inp1' onChange={handleChange} type="text" id="department" value={values.department}
                                                onBlur={handleBlur}
                                                required
                                            />
                                        </span>


                                    </div>

                                </div>

                                <div className="row gap-0">
                                    <span className='mylabel '>
                                        <label className='fs-5 light-red' htmlFor='building' name='building'>  اسم المبنى الجديد</label>
                                    </span>
                                    <span className='myinput '>
                                        <div className="col  ">
                                            <input className='inp1' onChange={handleChange} type="text" id="building" value={values.building}
                                                onBlur={handleBlur}
                                                required
                                            />

                                        </div>

                                    </span>

                                </div>

                                {/* <div className="row row-md">
                                    <span className='mylabel'>
                                        <label className='m-3' htmlFor='description' name='description'> وصف الورشه </label>
                                    </span>
                                    <span className='myinput '>
                                        <div className="col myarea">
                                            <textarea className='w-50 m-auto' onChange={handleChange} type="text" id="description" value={values.description}
                                                onBlur={handleBlur}
                                                required
                                            />
                                            <div className="error-container">
                                                {errors.description && touched.description && <p className='form-error'>{errors.description}</p>}
                                            </div>
                                        </div>

                                    </span>

                                </div> */}

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

export default ShowLocations;
