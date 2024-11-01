import React, { useEffect, useState } from 'react'
import Barcode from 'react-barcode';
import { useBarcode } from '@createnextapp/react-barcode';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { authcontext } from '../Context/authContext';
import { useFormik } from 'formik';
import moment from "moment/moment";

const BarcodeGeneration = () => {
    const [barcode, setBarcode] = useState({
        deviceName: "",
        deVserialNum: ""
    })
    const initialValues = {

        deviceName: "",
        serialNum: "",


    }

    let { deviceData, get1Device } = useContext(authcontext);

    const handlePrint = (count, clinicName, doctorName, miltary, hour_min, mydate) => {
        moment.locale('ar');
        const content = `
          <div style="text-align: center; margin-bottom: 10px;  font-weight: bold; font-size : 6px ">
            <h1 style = {font-size: 4px;}>-مركز تأهيل العجوزة ق.م -</h1>
            <p>-- فرع نظم ومعلومات --</p>
            <div >
            <p style="margin : 3px">-----------------------------</p>
                <h1 style="font-size : 18px ; margin : 0px">${count}</h1>
            <p style ="margin : 3px">-----------------------------</p>
            </div>

                <div style="font-size : 7px ; font-weight : bolder">      
                    <h2>عيادة : <span>${clinicName}</span> </h2>
                </div>

                <div className="mb-1">      
                    <h2>د : <span>${doctorName}</span> </h2>
                </div>

                <div className="mb-1">      
                    <h2>الفئه : <span>${miltary}</span> </h2>
                </div>
                                            
                <div className="mb-1">      
                    <h2>الوقت :  <span>${hour_min} ,</span>  <span>${mydate}  </span> </h2> 
                </div>
                
                <div>      
                    <h2 className="text-dark mt-2">شكرا لكم </h2>
                </div>
            <br/>
            <p> </p>
            <p> .</p>
          </div>
        `;



        // Create a hidden iframe
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        // Write content to the iframe
        const iframeDoc = iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(content);
        iframeDoc.close();

        // Call the print function
        iframe.contentWindow.print();

        // Remove the iframe after printing
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 1000); // You can adjust the delay as needed
    };

    // const [getBarcode , setGetBarcode] = useState()
    // const { deviceName, serialNum } = barcode

    // const OnInputchange = (e) => {
    //     setBarcode({ ...barcode, [e.target.name]: [e.target.value] })
    // }
    const { id } = useParams()
    useEffect(() => {
        if (id) {
            get1Device(id)
        }
    }, [])

    const { inputRef } = useBarcode({
        value: deviceData.serialNumber,
        options: {
            background: '#ffffff',
            fontSize: 20,
            margin: 30,
            fontOptions: 'bold',
            width: 1,
            height: 70
        }
    });

    const { values, handleChange, handleSubmit, } = useFormik({
        initialValues: {
            deviceName: deviceData?.name,
            serialNum: deviceData?.serialNumber,
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            // values.userId = localStorage.getItem("id")

            console.log(values)

        }
    })


    return (
        <form form onSubmit={handleSubmit} className=''>
            {/* <h4 className='mt-3 text-success mb-4'>باركود الجهاز</h4> */}
            <div className='mt-5 m-auto '>
                {/* <div className="col-sm-4" style={{ border: "1px solid rgb(206 200 200)" }}>
                    <h4 style={{ color: 'green' }}>انشاء الباركود</h4>
                    <div className="form-group">
                        <input type="text" className='form-control mb-4' value={values.deviceName} name='deviceName' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className='form-control mb-4' value={values.serialNum} name='serialNum' onChange={handleChange} />
                    </div>
                    <button type='submit' className='btn btn-primary'>انشئ الباركود</button>
                </div> */}
                <div className="col">
                    <h5 className='text-center ml-4 mb-5 mt-4 '>باركود الجهاز</h5>
                    <table className='table table-hover mb-5'>
                        <thead>
                            <tr>
                                <th>اسم الجهاز</th>
                                <th>رقم الباركود</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='my-auto py-5'><h5>{values.deviceName}</h5></td>
                                <td><svg ref={inputRef} /></td>


                            </tr>
                        </tbody>
                    </table>
                    <button className="btn cyan mx-2 px-5 mt-5 fs-3 bolder py-2" >طباعة</button>
                </div>
            </div>
        </form>
    )
}

export default BarcodeGeneration
// npm install --save @createnextapp/react-barcode --force  