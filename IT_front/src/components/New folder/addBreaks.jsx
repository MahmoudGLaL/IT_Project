import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useState } from 'react';

const AddBreaks = () => {
    
  const initialValues = {
    name: "",
    type : "" ,
    number: "",
  }
  const [update, setUpdate] = useState(false);  

  async function addBreak(values) {

    try {
      await axios.post(`http://localhost:11923/api/Items`,values
      ).then(res => {
        console.log(res) ;
               
      }).catch(e => console.log(e))

    }
    catch (e) {
    }

  }

  let formik = useFormik({
    initialValues,
    // validationSchema:validateSchema,
    onSubmit: (values) => {
      console.log(values);
      addBreak(values)
    }
  })
  return (
    <form onSubmit={formik.handleSubmit} className='mb-5'>
    <div >
      <div className=" mt-5 ">
        <div className="card w-100 p-5 border-0 rounded-4 mb-0">

          {/* <input value={ values.id}  onChange={ handleChange} onBlur={ handleBlur} className="input text-dark w-100 mt-4" name="categroyId" type="number" id="categroyId" placeholder="Id" />
                <br /> */}
         

          <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="input text-dark w-100 mt-4 h-25" name="name" type="text" id="name" placeholder="اسم التلف " required/>
          <br />
          <input value={formik.values.type} onChange={formik.handleChange} onBlur={formik.handleBlur} className="input text-dark w-100 h-25 " name="num" type="number" id="price" placeholder="النوع" required />
          <br />
          <input value={formik.values.num} onChange={formik.handleChange} onBlur={formik.handleBlur} className="input text-dark w-100 mt-4 h-25 " name="num" type="number" id="price" placeholder="العدد" required />
          <br />

          <button onClick={formik.handleSubmit} type="submit" className="btn mt-5 m-auto fs-3 text-wrap p-3 btn mybtn w-50 ">اضافه</button>
        </div>
      </div>
    </div>
  </form>
  )
}

export default AddBreaks