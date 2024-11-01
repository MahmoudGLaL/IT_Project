import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { authcontext } from '../../Context/authContext';
import mainImage from "../../logo3.jpg"
import { height } from '@fortawesome/free-solid-svg-icons/fa0';
function Reports() {
    let { id } = useParams()
    let { patData, getPatientById, neededItemsByID, getItemById, price } = useContext(authcontext)
    let [data, setData] = useState({})
    let getPatient = async (id) => {
        await axios.get(`http://localhost:11923/api/Patients/${id}`).then(res => {
            console.log(res);
            setData(res.data)
        }).catch(err => {
            console.log(err);
        })
    }
    console.log({ patData });
    useEffect(() => {

        getPatient(id)
        getPatientById(id)
        getItemById(id)
    }, [id])

    const printRef = useRef();

    const handlePrint = () => {
        //   const printContents = printRef.current.innerHTML;
        //   const originalContents = document.body.innerHTML;
        //   document.body.innerHTML = printContents;
        window.print();
        //   document.body.innerHTML = originalContents;
        //   window.location.reload();  // Reload to reset the page content
    };

    return (
        <>

            <div ref={printRef} id="printableArea" className=' '>
                <div>

                    <div className='d-flex justify-content-between  align-items-center mx-5 mt-2'>
                        <div className=' px-5  d-flex justify-content-center  align-items-center'>
                            <img src={mainImage} className='' style={{
                                width: "100px",
                                height: "100px"
                            }} alt="" />


                        </div>
                        <div className='fs-5'>
                            <div > وزاره الدفاع  </div>
                            <div>مركز الطب الطبيعي و التأهيلي</div>
                            <div>وعلاج الروماتيزم ق.م</div>
                        </div>
                    </div>

                    <div className='d-flex justify-content-between align-items-center gap-8 py-3 
                     '>
                        <div dir='rtl' className='d-flex justify-content-evenly align-items-center gap-5  py-3  ' style={{ width: "100%" }}>


                            <div>
                                <div className=''>
                                    <label htmlFor="">الاسم : {data.name}</label>
                                </div>
                                <div className=''>
                                    <label htmlFor="">العمر : {data.age}</label>

                                </div>

                            </div>

                            <div>
                                <div className=''>
                                    <label htmlFor="">رقم المريض : {data.patientNumber}</label>

                                </div>
                                <div className=''>
                                    <label htmlFor="">رقم التليفون : {data.phoneNumber}</label>

                                </div>
                                <div className=''>
                                    <label htmlFor="">رقم الغرفه : {data.room_number}</label>

                                </div>

                            </div>
                            

                            <div>
                                <div className=''>
                                    <label htmlFor="">الدكتور الجراح : {data.surgeon}</label>

                                </div>
                             

                                <div className=''>
                                    <label htmlFor="">دكتور التخدير : {data.anesthetist}</label>

                                </div>


                                <div className=''>
                                    <label htmlFor="">نوع الجراحه : {data.typeOfSurgery}</label>

                                </div>
                            </div>



                        </div>
                    </div>
                </div>


                <div>
                    <div className='d-flex justify-content-center align-items-center'>

                        <table className="table table-bordered border border-secondary" style={{ width: "80%" }}>
                            <thead className=''>
                                <tr className='mx-5'>
                                    <th className='border border-secondary'>المنتج</th>
                                    {/* <th className='border border-secondary'></th> */}
                                    <th className='border border-secondary'>العدد</th>
                                    <th className='border border-secondary'>السعر</th>
                                </tr>
                            </thead>
                            <tbody>
                                {neededItemsByID.map((item, index) => (
                                    <tr key={index} className=''>
                                        <td className='border border-secondary'>{item.items.name}</td>
                                        {/* <td className='border border-secondary'></td> */}
                                        <td className='border border-secondary'>{item.number}</td>
                                        <td className='border border-secondary'>{item.totalPrice} ج</td>
                                    </tr>
                                ))}
                                <tr className=''>
                                    <td className=''>--</td>
                                    <td className=''>--</td>
                                    <td className='mt-5 '>
                                        <div className='d-flex justify-content-center  gap-4 '>
                                            <span>المبلغ الكلي</span>:
                                            <span>{price}</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <button onClick={handlePrint} className='no-print text-white bg-primary px-5 p-2 rounded border border-none'>Print</button>
        </>
    );
}

export default Reports;