import React, { Fragment, useContext, useEffect, useState } from "react";
import "./css/showpatients.css";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import { authcontext } from "../Context/authContext";
import { useFormik } from "formik";
import BarcodeSvg from '../components/BarcodeSvg'
import { useRef } from "react";
import moment from "moment/moment";




const ShowTools = () => {
    let { getTools, AllTools } = useContext(authcontext);

    const [searched, setSearched] = useState(false);
    const [typeName, setTypeName] = useState("");
    const [allNum, setAllNum] = useState("");
    const [myId, setMyId] = useState("");
    const [DelId, setDelId] = useState("");
    const [DelName, setDelName] = useState("");
    const [searchCriteria, setSearchCriteria] = useState({ name: "", code: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOpt, setSelectedOpt] = useState("");
    const [code, setCode] = useState("");

    const printRef = useRef([])

    let navigate = useNavigate();

    useEffect(() => {
        getTools()
        // console.log(AllTools);
    }, []);


    const HandlePrint = (index, serialNum) => {
        moment.locale('ar');
        // console.log(printRef.current);

        const content = printRef.current[index] ? printRef.current[index].innerHTML : '';

        // <body style=" margin-top: -30px; margin-left: -42px;  font-weight: bold ; width : 20px">

        // Create a hidden iframe
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        // Write content to the iframe
        const iframeDoc = iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(`
              <body style=" margin-left: 140px; margin-top: 8px;  font-weight: bold ; ">
                ${content}
              </body>
          `);
        iframeDoc.close();

        // Call the print function
        iframe.contentWindow.print();

        // Remove the iframe after printing
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 1000); // You can adjust the delay as needed
    };

    async function handleGet(id,name) {
        // console.log(id);
       setDelId(id)
       setDelName(name)

    };







    async function handleDelete(id, name) {
        console.log(id);

        await axios.delete(`http://localhost:5137/api/Tools/${id}/${localStorage.getItem("id")}`).then((res) => {
            toast.success(`تم حذف ${name} بنجاح`)
            getTools()
        }

        ).catch(e => {
            console.log(e)
            // toast.error("هذه الأداه مستخدمه بالفعل")
        })

    };

    async function handleGetinp(id) {
        console.log(id);
        setMyId(id)
        await axios.get(`http://localhost:5137/api/Tools/${id}`).then((res) => {

            setTypeName(res.data.name)
            setAllNum(res.data.allNumber)
        }
        ).catch(e => {
            console.log(e)
        })

    };




    const handleSearchChange = (e) => {
        setSearched(true)

        if (e.target.value === '') {
            setSearched(false)
        }


        const { name, value } = e.target;


        setSearchCriteria(prevState => ({ ...prevState, [name]: value }));
        setCurrentPage(1);


    };

    let filteredTypes = AllTools.filter(type => {


        return (
            searchCriteria.name && type?.name.toLowerCase().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : "") ||
            searchCriteria.code && type?.code.toString().includes(searchCriteria.code ? searchCriteria?.code.toLowerCase() : "")

        )
    }



    )
    const { values, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            // id : myId ,
            name: typeName,
            allNumber: "",
            description: "",
            userId: localStorage.getItem('id')
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            // values.userId = localStorage.getItem("id")
            console.log(values)
            // console.log(myId)
            if (values.allNumber < 0) {
                toast.error("من فضلك ادخل رقم اكبر من الصفر")
            }
            else if (values.allNumber === "") {
                toast.error("من فضلك ادخل العدد المضاف او ادخل صفر")
            }
            else {
                await axios.put(`http://localhost:5137/api/Tools/${myId}`, values).then(res => {
                    console.log(res);
                    toast.success("تم تعديل الأداه بنجاح")
                    getTools()
                }
                ).catch(e => {
                    if (e.response.data === "هذا الاسم موجود بالفعل") {
                        toast.error("هذا الاسم موجود بالفعل")
                    }
                    else {
                        return -1;
                    }
                })
            }

        }
    })








    return (
        <>
            <div className=" show mx-5   mt-5">
                <h5>جميع الأدوات</h5>
                <div className="row mb-3 gap-2 ">



                    <div className="col ">
                        <input
                            type="text"
                            className="form-control w-75"
                            placeholder=" ابحث عن اسم الأداه"
                            name="name"
                            value={searchCriteria.name}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className="col ">
                        <input
                            type="text"
                            className="form-control w-75"
                            placeholder=" ابحث ب رقم الباركود"
                            name="code"
                            value={searchCriteria.code}
                            onChange={handleSearchChange}
                        />
                    </div>

                    {localStorage.getItem("role") !== "user" &&
                        <div className="col mn-20">
                            <span><Link to={`/main/AddTools`} className="btn ml-50 mn-1 fw-bold  px-2 fs-4 py-2  " >إضافة ادوات</Link></span>
                        </div>}

                    {localStorage.getItem("role") !== "user" &&
                        <div className="col mn-20">
                            <span><Link to={`/main/getTools`} className="btn fw-bold teal  px-2 fs-4 py-2 mn-1 " >سحب ادوات</Link></span>
                        </div>}

                </div>
            </div>

            {AllTools.length > 0 ? (
                <table className="table table-striped table-hover mt-3 mx-1">
                    {searched ? <>

                        <thead >
                            <tr className="mb-5 py-2" >
                                <th>اسم الأداه</th>
                                <th>العدد الكلي</th>
                                <th>العدد المتاح</th>

                                <th >باركود الأداه</th>
                                <th ></th>
                                <th ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTypes.map((type, index) => (
                                <>
                                    <tr key={type.id} className="text-center justify-content-center align-items-center">
                                        {/* {type.startDate?.slice(0,10) === new Date().toISOString().slice(0, 10) ? */}
                                        <>
                                            <td className="py-3 my-3"> <span>{type.name} </span> </td>
                                            <td className="py-3 my-3 " > <span>{type.allNumber}</span>  </td>
                                            <td className="py-3 my-3 " > <span>{type.curruntNumber}</span>  </td>
                                            <td className='' >
                                                <div ref={(col) => (printRef.current[index] = col)} className='d-flex justify-content-center align-items-start'>
                                                    <BarcodeSvg serialNum={type.code} />
                                                    <div className=''>
                                                        {/* <h3>{col.name}</h3> */}
                                                    </div>
                                                </div>
                                                {/* <h5>{col.name}</h5> */}

                                            </td>
                                            <td className="" > <button type="button" className="btn teal px-4 fw-bold py-2 my-2" onClick={() => HandlePrint(index, type.code)
                                            }  >طباعة الباركود</button>  </td>

                                            {
                                                (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "SuperAdmin") && <>
                                                    <td > <button type="button" className="btn cyan px-4 fw-bold py-2 my-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                                                        handleGetinp(type.id)
                                                    }} data-bs-whatever="@fat" >تعديل</button> </td>
                                                    <td > <button className="btn danger px-4 fw-bold py-2  my-2" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@fat"  onClick={() => handleGet(type.id, type.name)} >حذف</button> </td>
                                                </>
                                            }

                                            {/* <td > {clinic.startDate === null ? <button className="btn bg-blue px-5 my-2 py-2" type="submit" onClick={()=>getStart(clinic.id , clinic.clinicName)} >ابدأ</button> : <h3 className="fs-3">تم البدأ</h3>} </td> */}
                                            {/* <td > {clinic.endDate === null ? <button className="btn danger px-5 my-2  " type="submit" onClick={()=>getEnd(clinic.id , clinic.startDate ,clinic.clinicName)} >انهى</button> : <h3 className="fs-3">تم الأنتهاء</h3>}</td> */}
                                        </>
                                        { /* : <></> */}
                                    </tr>
                                    <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header position-relative">
                                                <h5 className="modal-title" id="exampleModalLabel"> هل انت متأكد من انك تريد حذف هذه الأداه ؟</h5>
                                                    <button type="button" className="btn-close position-absolute fs-5 top-20 m-2 start-0" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="pb-3  ">


                                                    <div className="w-100 d-flex justify-content-center align-items-center">
                                                        <button type="button" className="btn red  fs-5 py-1 mx-5 " data-bs-dismiss="modal"   onClick={() => handleDelete(DelId , DelName)}>
                                                            نعم
                                                        </button>
                                                        <button type="submit" className="btn bg-green fs-5 py-1 mx-5" data-bs-dismiss="modal" >
                                                            لا
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>

                            ))}
                        </tbody>

                    </> : <>


                        <thead >
                            <tr className="mb-5 py-2" >
                                <th>اسم الأداه</th>
                                <th>العدد الكلي</th>
                                <th>العدد المتاح</th>
                                <th>باركود الأداه</th>
                                <th></th>

                                {
                                    localStorage.getItem("role") === "admin" && <>
                                        <th ></th>
                                        <th ></th>
                                    </>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {AllTools.map((type, index) => (
                                       <>
                                       <tr key={type.id} className="text-center justify-content-center align-items-center">
                                           {/* {type.startDate?.slice(0,10) === new Date().toISOString().slice(0, 10) ? */}
                                           <>
                                               <td className="py-3 my-3"> <span>{type.name} </span> </td>
                                               <td className="py-3 my-3 " > <span>{type.allNumber}</span>  </td>
                                               <td className="py-3 my-3 " > <span>{type.curruntNumber}</span>  </td>
                                               <td className='' >
                                                   <div ref={(col) => (printRef.current[index] = col)} className='d-flex justify-content-center align-items-start'>
                                                       <BarcodeSvg serialNum={type.code} />
                                                       <div className=''>
                                                           {/* <h3>{col.name}</h3> */}
                                                       </div>
                                                   </div>
                                                   {/* <h5>{col.name}</h5> */}
   
                                               </td>
                                               <td className="" > <button type="button" className="btn teal px-4 fw-bold py-2 my-2" onClick={() => HandlePrint(index, type.code)
                                               }  >طباعة الباركود</button>  </td>
   
                                               {
                                                   (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "SuperAdmin") && <>
                                                       <td > <button type="button" className="btn cyan px-4 fw-bold py-2 my-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                                                           handleGetinp(type.id)
                                                       }} data-bs-whatever="@fat" >تعديل</button> </td>
                                                       <td > <button className="btn danger px-4 fw-bold py-2  my-2" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@fat"  onClick={() => handleGet(type.id, type.name)} >حذف</button> </td>
                                                   </>
                                               }
   
                                               {/* <td > {clinic.startDate === null ? <button className="btn bg-blue px-5 my-2 py-2" type="submit" onClick={()=>getStart(clinic.id , clinic.clinicName)} >ابدأ</button> : <h3 className="fs-3">تم البدأ</h3>} </td> */}
                                               {/* <td > {clinic.endDate === null ? <button className="btn danger px-5 my-2  " type="submit" onClick={()=>getEnd(clinic.id , clinic.startDate ,clinic.clinicName)} >انهى</button> : <h3 className="fs-3">تم الأنتهاء</h3>}</td> */}
                                           </>
                                           { /* : <></> */}
                                       </tr>
                                       <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                           <div className="modal-dialog">
                                               <div className="modal-content">
                                                   <div className="modal-header position-relative">
                                                   <h5 className="modal-title" id="exampleModalLabel"> هل انت متأكد من انك تريد حذف هذه الأداه ؟</h5>
                                                       <button type="button" className="btn-close position-absolute fs-5 top-20 m-2 start-0" data-bs-dismiss="modal" aria-label="Close"></button>
                                                   </div>
                                                   <div className="pb-3  ">
   
   
                                                       <div className="w-100 d-flex justify-content-center align-items-center">
                                                           <button type="button" className="btn red  fs-5 py-1 mx-5 " data-bs-dismiss="modal"   onClick={() => handleDelete(DelId , DelName)}>
                                                               نعم
                                                           </button>
                                                           <button type="submit" className="btn bg-green fs-5 py-1 mx-5" data-bs-dismiss="modal" >
                                                               لا
                                                           </button>
                                                       </div>
   
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                   </>
                            ))}
                        </tbody>
                    </>}

                </table>
            ) : (
                <div className="text-muted">لم يتم اضافة أدوات بعد</div>
            )}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header position-relative">
                            <h5 className="modal-title" id="exampleModalLabel">تعديل الأداه</h5>
                            <button type="button" className="btn-close position-absolute top-20 m-2 start-0" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row  mt-3 ">

                                    <div className="col">
                                        <span className='mylabel'>
                                            <label className='fs-4 light-red mb-2' htmlFor='name' name='name'> اسم الأداه   </label>
                                        </span>
                                        <span className='myinput'>
                                            <input className='inp1 ' onChange={handleChange} type="text" id="name" value={values.name}
                                                onBlur={handleBlur}
                                                required
                                            />
                                        </span>

                                        {/* <div className="error-container err-r">
                                            {errors.name && touched.name && <p className='form-error'>{errors.name}</p>}
                                        </div> */}

                                    </div>

                                </div>
                                <div className="row   ">

                                    <div className="col">
                                        <span className='mylabel'>
                                            <label className='fs-4 light-red mb-2' htmlFor='name' name='allNumber'> عدد الأدوات  </label>
                                        </span>
                                        <span className='myinput'>
                                            <input className='inp1 ' onChange={handleChange} type="text" id="allNumber" placeholder={allNum ? allNum : ""}
                                                onBlur={handleBlur}
                                                disabled
                                            />
                                        </span>

                                        <span className='mylabel'>
                                            <label className='fs-4 light-red mb-2' htmlFor='name' name='allNumber'> إضافة عدد اخر</label>
                                        </span>
                                        <span className='myinput'>
                                            <input className='inp1 ' onChange={handleChange} type="text" id="allNumber" value={values.allNumber}
                                                onBlur={handleBlur}

                                            />
                                        </span>
                                        {/* 
                                        <div className="error-container err-r">
                                            {errors.allNumber && touched.allNumber && <p classallNumber='form-error'>{errors.allNumber}</p>}
                                        </div> */}

                                    </div>

                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary w-20 fs-5 py-1  position-absolute end-0 mx-5" data-bs-dismiss="modal">
                                        اغلق
                                    </button>
                                    <button type="submit" className="btn btn-primary w-30  fs-5 py-1" data-bs-dismiss="modal" >
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

export default ShowTools;
