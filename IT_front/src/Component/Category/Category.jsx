import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { authcontext } from '../../Context/authContext';
import { toast } from 'react-toastify';


const CategoryTable = () => {
//   const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({ id: null, name: '' });
  let { getCategory , categories, setCategories } = useContext(authcontext)



  useEffect(()=>{
    getCategory()
  },[])
  const handleEditClick = (category) => {
    setSelectedCategory(category);
  };

  const handleUpdate = async(e) => {
    e.preventDefault();


 console.log({selectedCategory});
    await axios.put(`http://localhost:11923/api/categroys/${selectedCategory.id }`, selectedCategory).then(res=>{
        console.log(res);
        getCategory ()
    }).catch(err=>{
        console.log(err);
    })
  };

  const handleDelete = async(id) => {
    await axios.delete(`http://localhost:11923/api/categroys/${id}`).then(res=>{
        console.log(res);
        toast.success("تم حذف هذا التنصيف")
        getCategory ()
    }).catch(err=>{
        console.log(err);
    })
    // const updatedCategories = categories.filter((category) => category.id !== id);
    // setCategories(updatedCategories);
  };

  return (
    <div className="row mt-5 tab-cont">
      <table className="mt-5">
        <thead className="table-head rounded-2">
          <tr>
            <th>Category Name</th>
            <th>Update</th>
            {/* <th>Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <button
                  className="btn mt-3 px-4 fs-3"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleEditClick(category)}
                >
                  تعديل
                </button>
              </td>
              {/* <td>
                <button
                  className="btn danger bg-danger mt-3 px-4 fs-3"
                  onClick={() => handleDelete(category.id)}
                >
                  حذف
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header position-relative">
              <h5 className="modal-title" id="exampleModalLabel">تعديل العنصر</h5>
              <button
                type="button"
                className="btn-close position-absolute top-20 m-2 start-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <input
                    className="input text-dark w-100 mt-4 pt-2 h-25"
                    name="updated_name"
                    type="text"
                    id="name"
                    placeholder="الأسم الجديد"
                    value={selectedCategory.name}
                    onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary w-30 fs-3" data-bs-dismiss="modal">اغلق</button>
                  <button type="submit" className="btn btn-primary w-30 fs-3" data-bs-dismiss="modal">تأكيد</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
