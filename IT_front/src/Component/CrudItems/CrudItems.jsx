
import React, { Fragment, useContext, useEffect, useState } from "react";

import { useFormik } from "formik";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { authcontext } from "../../Context/authContext";


export default function CrudItems() {

  let { itemsData, getItemsAPI, getCategory, categories ,deleteItems , updateCatItems} = useContext(authcontext)

  
  let [updateSpesificItem , setUpdateSpesificItem] = useState({})
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedUpdateCategory, setSelectedUpdateCategory] = useState("");
  
  const [selectedUpdateName, setSelectedUpdateName] = useState('');
  const [selectedUpdatePrice, setSelectedUpdatePrice] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    getItemsAPI()
    getCategory()
  }, [])
  console.log({selectedUpdateCategory});
  console.log({ selectedItem });
 console.log({updateSpesificItem});
  // update specific item 
  const handleEditClick = async(item) => {
 
      await axios.get(`http://localhost:11923/api/Items/${item}`).then(res=>{
        console.log(res)
        setUpdateSpesificItem(res.data)
        setSelectedUpdateCategory(res.data.categroyId)
      
      }).catch(err=>{console.log(err)})
    setSelectedItem(item);
  };
  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedCategory(event.target.value);
  };
  const handleUpdateChange = (event) => {
    console.log(event.target.value);
    setSelectedUpdateCategory(event.target.value);
  };

 

  let AddProducts = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      categroyId: 0
    },
    onSubmit: async (values) => {
      values.categroyId = selectedCategory
      console.log(values);
      await axios.post(`http://localhost:11923/api/Items`, values).then(res => {
        console.log(res);
        getItemsAPI()
      }).catch(err => { console.log(err); })

    }
  })



  let updateItems = useFormik({
    enableReinitialize:true,
    initialValues:{
      name:updateSpesificItem.name,
      price:updateSpesificItem.price,
      categroyId:updateSpesificItem.categroyId
    },
    onSubmit: (values)=>{
     
      values.categroyId = selectedUpdateCategory
    
      if( values.categroyId !== '')
        {
          updateCatItems(updateSpesificItem.id , values)
        }
        else {
          toast.error("من فضلك اختر تصنيف")
        }
      
    }
  })








  

 

 


  

  return (
    <div>

      <form onSubmit={AddProducts.handleSubmit} >
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-5 mt-5 ">
            <div className="card w-100 p-5 border-0 rounded-4">
              <h2>اضافة منتج</h2>

              <div className="dropdown mt-5 w-full mb-4 ">
                <select
                  className="input text-black border-0 rounded-4"
                  id="item"
                  name="selectedOption"
                  value={selectedCategory}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    اختر تصنيفا
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

              </div>

              <input className="input text-dark w-100 mt-4  h-25" onChange={AddProducts.handleChange} name="name" type="text" id="name" placeholder="أسم المنتج" required />
              <br />
              <input className="input text-dark w-100  h-25 " onChange={AddProducts.handleChange} name="price" type="number" id="price" placeholder="السعر " required />
              <br />
              <button type="submit" className="btn mt-5 m-auto fs-3 text-wrap p-3 btn mybtn w-50 ">اضافه</button>
            </div>
          </div>
        </div>
      </form>

      <div className="row tab-cont mt-5 ">
        <table className="mt-5">
          <thead className="table-head rounded-2">
            <tr>
              <th>Category</th>
              <th>Name</th>
              <th>Price</th>
              {itemsData.length > 0 && <>
                <th>Update</th>
                <th>Delete</th>
              </>}
            </tr>
          </thead>
          <tbody>
            {itemsData.reverse().map((item, index) => {

              return <tr key={index}>
                <td>{item.categroy.name}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>

                {itemsData.length > 0 && <>
                  <td>
                    <button className="btn mt-3 px-4 fs-3" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                      handleEditClick(item.id)
                    }} data-bs-whatever="@fat" >تعديل</button></td>

             
                  <td><button className="btn danger bg-danger mt-3 px-4 fs-3"  onClick={()=>deleteItems(item.id) } >حذف</button></td>
                </>}

              </tr>

            })}


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header position-relative">
            <h5 className="modal-title" id="exampleModalLabel">تعديل العنصر</h5>
            <button type="button" className="btn-close position-absolute top-20 m-2 start-0" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form  onSubmit={updateItems.handleSubmit}>
              <div className="mb-3">
                <div className="dropdown mt-5 w-full mb-4">
                  <select
                    className="input text-black border-0 rounded-4"
                    id="item"
                    name="selectedOption"
                    value={selectedUpdateCategory}
                    onChange={handleUpdateChange}
                    // onChange={updateItems.handleChange}
                    required
                  >
                    <option value="" disabled>
                      اختر تصنيفا
                    </option>
                    {categories.map((category) => (
                      <option  key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  className="input text-dark w-100 mt-4 pt-2 h-25"
                  name="name"
                 
                  onChange={updateItems.handleChange}
                  type="text"
                  id="name"
                  placeholder="الأسم الجديد"
                  value={updateItems.values.name}
                  required
                />
                <input
                  className="input text-dark w-100 mt-4 pt-2 h-25"
                  name="price"
                  onChange={updateItems.handleChange}
                  type="text"
                  id="number"
                  placeholder="السعر الجديد"
                  value={updateItems.values.price}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary w-20 fs-4" data-bs-dismiss="modal">
                  اغلق
                </button>
                <button type="submit" className="btn btn-primary w-30 fs-4" data-bs-dismiss="modal">
                  تأكيد
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

              {/* 6/5/2424 */}

            {/* <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header position-relative">
                    <h5 className="modal-title" id="exampleModalLabel">تعديل العنصر </h5>
                    <button type="button" className="btn-close position-absolute top-20 m-2 start-0" data-bs-dismiss="modal" aria-label="Close"  ></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleEditSubmit} >
                      <div className="mb-3">
                        <div className="dropdown mt-5 w-full mb-4 ">
                        <select
        className="input text-black border-0 rounded-4"
        id="item"
        name="selectedOption"
        value={selectedEditCategory}
        onChange={handleditChange}
        required
      >
        <option value="" disabled>
          اختر تصنيفا
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

                        </div>

                        <input className="input text-dark w-100 mt-4 pt-2 h-25" name="updated_name" onChange={handleUpdateNameChange} type="text" id="name" placeholder="الأسم الجديد" required />
                        <input className="input text-dark w-100 mt-4 pt-2 h-25" name="updated_price" onChange={handleUpdatePriceChange} type="text" id="number" placeholder="السعر الجديد" required />
                      </div>
                      <div className="modal-footer ">
                        <button type="button" className="btn btn-secondary w-20 fs-4 " data-bs-dismiss="modal" >اغلق</button>
                        <button type="submit" className="btn btn-primary w-30 fs-4 " data-bs-dismiss="modal" >تأكيد</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div> */}
              {/* 6/5/2424 */}

            {/* {selectedItem && (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header position-relative">
                <h5 className="modal-title" id="exampleModalLabel">تعديل العنصر</h5>
                <button type="button" className="btn-close position-absolute top-20 m-2 start-0" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <div className="dropdown mt-2 mb-2 w-full">
                      <select
                        className='input text-black border-0 rounded-4'
                        id="item"
                        name='updated_selectedOption'
                        defaultValue={selectedItem.id}
                        required
                      >
                        <option value="default" disabled>اختر تصنيفا</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                      </select>
                    </div>

                    <input
                      className="input text-dark w-100 mt-4 pt-2 h-25"
                      name="updated_name"
                      type="text"
                      id="name"
                      placeholder="الأسم الجديد"
                      defaultValue={selectedItem.name}
                      required
                    />
                    <input
                      className="input text-dark w-100 mt-4 pt-2 h-25"
                      name="updated_price"
                      type="text"
                      id="number"
                      placeholder="السعر الجديد"
                      defaultValue={selectedItem.price}
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary w-20 fs-4" data-bs-dismiss="modal">اغلق</button>
                    <button type="submit" className="btn btn-primary w-30 fs-4" data-bs-dismiss="modal">تأكيد</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )} */}
          </tbody>
        </table>
        <ToastContainer />
      </div>

    </div>
  );
}

