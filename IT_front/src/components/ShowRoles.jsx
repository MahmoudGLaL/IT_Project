import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authcontext } from '../Context/authContext'
import { toast, ToastContainer } from 'react-toastify'
// import { useNavigate } from 'react-router-dom';

export default function ShowRoles() {
    let { allUser, GetAllUser  } = useContext(authcontext)



    useEffect(() => {
        GetAllUser()
    }, [])

    let handleGet = async (id) => {
        await axios.delete(`http://localhost:5137/api/Users/${id}/${localStorage.getItem('id')}`, {

        }).then(res => {
            // Fetch all users after blocking
        }).catch(err => {
            console.log(err);
            
            if(err.response.status === 309)
            {
                toast.success("تم حظر المستخدم بنجاح");
                GetAllUser();
            }
            else {
                toast.error("لم يتم حظر المستخدم");
            }

        });
    }


    return (
        <>
             <div className="mycont ">
            <div className="card w-100 p-5 border-0 rounded-4   " >
                <form className=''>
                    <div className="cont">

                        {/* <span className="line"></span> */}

                        <div className="row tab-cont  position-relative showed ">
                            <h5 className='my-0' >جميع المستخدمين</h5>

                            <Link to={`/main/addRole`} className="btn col-1 position-absolute mx-5 my-0 fw-bold text-nowrap "  >إضافة مستخدم</Link>

                            <table className="m-auto mt-5 fw-bold " >
                                <thead className="table-head rounded-2" >
                                    <tr>
                                        {/* <th colSpan={2}>رقم المستخدم</th> */}
                                        <th className="med cel-name py-2" colSpan={2}> الاسم </th>
                                        {/* <th className="med cel-name py-2" colSpan={2}> الباسورد</th> */}
                                        <th className="med py-2" colSpan={2}>الصلاحية</th>
                                        <th className="med" colSpan={2}></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {allUser?.map((user, index) => {
                                        return <tr key={index} className='gap-2' style={{ backgroundColor: user.role === 'SuperAdmin' ? 'rgb(30, 52, 73)' : 'white', color: user.role === 'SuperAdmin' ? 'white' : 'black' }}>
  
                                                 <>
                                                    <td className="cel-name  py-2"  colSpan={2}>{user.username}</td>
                                                    {/* <td className="cel-name py-2" colSpan={2}>{user.password}</td> */}
                                                    <td className="med py-0" style={{  color: user.role === 'admin' ? '#295F98' : '' ,  }} colSpan={2}>{user.role}</td>
                                                    <td className="med py-0"  colSpan={2}>
                                                        {
                                                            localStorage.getItem("user") !== user.username && <button type="button" className={`btn fw-bold fw-bold mx-4 my-auto py-1 ${user.isBlocked ? 'teal px-2': 'red'} `} onClick={() => {
                                                                handleGet(user.id)
                                                            }} >  {user.isBlocked ? 'تم الحظر' : 'حظر'}   </button>
                                                        }
                                                        
                                                    </td>
                                                </>

                                        </tr>
                                    })



                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
            
            </div>
        </div>
        <ToastContainer />
        </>
       
        
    )
}
