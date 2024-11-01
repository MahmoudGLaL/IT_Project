import axios from "axios";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { clinicSchema, spareParts } from "./schemas/schema";

const AddTools = () => {
    const initialValues = {
        name: "",
        allNumber : "",
        description: "",
        userId : parseInt(localStorage.getItem("id"))
    }


    const handleError = (e) => {
        e.preventDefault()
        toast.error(" من فضلك تأكد من صحة جميع البيانات ")
    }

    // const hours = new Date().getHours()
    // const minutes = new Date().getMinutes();
    // console.log(hours+':'+minutes);

    const { values, handleChange, handleBlur, handleSubmit, errors, touched, isValid } = useFormik({
        initialValues,
        validationSchema: spareParts,
        onSubmit: async (values, actions) => {
            // values.userId = localStorage.getItem("id")
            console.log(values)
            await axios.post("http://localhost:5137/api/Tools", values).then( res => {
                toast.success("تم اضافة الأداه بنجاح")
                actions.resetForm()
            }
               
            ).catch(e => {console.log(e)
                toast.error("اسم القطعه هذا موجود بالفعل")
            })

        }
    })




    return (
        <div className='m-cont ' >
            <div className="w-90 p-1 border-0 rounded-4 ">

                <form onSubmit={isValid ? handleSubmit : handleError} className='form' >
                    <div className="my-container bg-gray pt-0 pb-5 mt-4 mb-4 t-3  m-loc">

                        {/* <modal open = {openModal}/> */}

                        <h2 className='mt-5  '> ادوات الصيانه  </h2>
                        {/* <span className="underline"></span> */}

                        {/* patient data */}
                        <div className="row  mt-2 ">

                            <div className="col">
                                <span className='mylabel'>
                                    <label className='' htmlFor='name' name='name'> اسم الأداه   </label>
                                </span>
                                <span className='myinput'>
                                    <input className='inp1 ' onChange={handleChange} type="text" id="name" value={values.name}
                                        name='name'
                                        onBlur={handleBlur}
                                        required
                                    />
                                </span>

                                <div className="error-container err-r ">
                                    {errors.name && touched.name && <p className='form-error'>{errors.name}</p>}
                                </div>

                            </div>

                        </div>
                        <div className="row  mt-1 ">

                            <div className="col">
                                <span className='mylabel'>
                                    <label className='' htmlFor='name' name='allNumber'> عدد القطع  </label>
                                </span>
                                <span className='myinput'>
                                    <input className='inp1 ' onChange={handleChange} type="text" id="allNumber" value={values.allNumber}
                                        onBlur={handleBlur}
                                        required
                                    />
                                </span>

                                <div className="error-container err-r">
                                    {errors.allNumber && touched.allNumber && <p classallNumber='form-error'>{errors.allNumber}</p>}
                                </div>

                            </div>

                        </div>

                     
                        <div className="row row-md ">
                            <span className='mylabel'>
                                <label className='m-1' htmlFor='description' name='description'> الوصف </label>
                            </span>
                            <span className='myinput'>
                                <div className="col myarea">
                                    <textarea className='w-50 m-auto' onChange={handleChange} type="text" id="deviceSpecification" value={values.description}
                                        onBlur={handleBlur}
                                        name='description'
                                    />
                                    {/* <div className="error-container">
                                        {errors.deviceSpecification && touched.deviceSpecification && <p className='form-error'>{errors.deviceSpecification}</p>}
                                    </div> */}
                                </div>

                            </span>

                        </div>


















                      

                        <button type='submit m-0' className="button mt-4">اضافة</button>

                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )

};

export default AddTools;