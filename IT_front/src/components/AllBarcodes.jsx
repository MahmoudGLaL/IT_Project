import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { authcontext } from '../Context/authContext';
import { useFormik } from 'formik';
import BarcodeSvg from './BarcodeSvg';
import moment from 'moment/moment';
import { useRef } from 'react';




let val_1 = ''
let val_2 = ''
let val_3 = ''
const AllBarcodes = () => {


    let { getDevices, AllDevices, AllTypes, getTypes, getLocations, AllLocations, LocationGetDevices, LocationsAllDevices, } = useContext(authcontext);


    const [searched, setSearched] = useState(false);
    const [searchedLoc, setSearchedLoc] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState({ name: "", deviceType: "", location: "", serialNumber: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOpt, setSelectedOpt] = useState("");

    const printRef = useRef([])
    // const [getBarcode , setGetBarcode] = useState()
    // const { deviceName, serialNum } = barcode

    // const OnInputchange = (e) => {
    //     setBarcode({ ...barcode, [e.target.name]: [e.target.value] })
    // }\


    const { id } = useParams()
    useEffect(() => {
        getLocations()
        getDevices()
        getTypes()
    }, [])

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
              <body style=" margin-left : 90px ; margin-top : 10px ; font-weight: bold ; ">
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


    const handleSearchChange = (e) => {
        setSearched(true)



        const { name, value } = e.target;
        if (name === 'deviceType') {
            if (value === '0') {
                setSearched(false)
            }
            val_1 = value
            // console.log(value);
            setSelectedOpt(value)
            searchCriteria.deviceType = selectedOpt
        }
        else if (name === 'name') {
            val_2 = value
        }
        else if (name === 'serialNumber') {
            val_3 = value
        }
        else if (name === 'location') {
            if (value === '0') {
                setSearchedLoc(false)
            }
            else {

                setSearchedLoc(true)
                LocationGetDevices(value)
            }
            // filteredDevices = LocationsAllDevices

        }
        setSearchCriteria(prevState => ({ ...prevState, [name]: value }));
        setCurrentPage(1);

        if (val_1 === '' && val_2 === '' && val_3 === '') {
            setSearched(false)
        }

    };

    let filteredDevices = AllDevices?.filter(Device => {

        // console.log(Device.deviceType)

        if (val_1 !== "" && val_2 !== "" && val_3 === "") {
            return (
                (searchCriteria.name && Device.name.toLowerCase().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : "")) &&

                (searchCriteria.deviceType && Device.deviceType.toString().includes(searchCriteria.deviceType ? searchCriteria.deviceType.toLowerCase() : ""))

            )
        }
        else if (val_1 !== "" && val_2 !== "" && val_3 !== "") {

            return (
                (searchCriteria.name && Device.name.toLowerCase().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : "")) &&

                (searchCriteria.serialNumber && Device.serialNumber.toString().toLowerCase().includes(searchCriteria.serialNumber ? searchCriteria.serialNumber : "")) &&



                (searchCriteria.deviceType && Device.deviceType.toString().includes(searchCriteria.deviceType ? searchCriteria.deviceType.toLowerCase() : ""))

            )
        }
        else if (val_1 !== "" && val_2 === "" && val_3 !== "") {
            return (
                (searchCriteria.deviceType && Device.deviceType.toString().includes(searchCriteria.deviceType ? searchCriteria.deviceType.toLowerCase() : "")) &&

                (searchCriteria.serialNumber && Device.serialNumber.toString().toLowerCase().includes(searchCriteria.serialNumber.toLowerCase() ? searchCriteria.serialNumber.toLowerCase() : ""))


            )
        }




        else {
            return (
                searchCriteria.name && Device.name.toLowerCase().includes(searchCriteria.name ? searchCriteria.name.toLowerCase() : "") ||

                searchCriteria.serialNumber && Device.serialNumber.toString().toLowerCase().includes(searchCriteria.serialNumber.toLowerCase() ? searchCriteria.serialNumber.toLowerCase() : "") ||

                searchCriteria.deviceType && Device.deviceType.toString().includes(searchCriteria.deviceType ? searchCriteria.deviceType.toLowerCase() : "")

            )
        }



    })





    return (
        <div className=''>
            <h5 className='text-center ml-4 mb-5 mt-5 '>باركود الأجهزه</h5>
            {/* <h4 className='mt-3 text-success mb-4'>باركود الجهاز</h4> */}
            <div className='bar mt-5 m-auto  '>
                <div className="row mb-4 light-gray  ">
                    {
                        !searchedLoc && <>
                             <div className="col ">
                        <select className="show-sl mt-4 " name="deviceType" id="item" onChange={handleSearchChange} value={selectedOpt} >
                            <option value="" selected disabled >اختر نوع الجهاز</option>
                            {AllTypes ? AllTypes.map((type) => (
                                <>
                                    <option type="item" id="item" value={type.name} >{type.name}</option>
                                </>
                            )) : <>لم يتم اضافة انواع الأجهزه بعد </>}
                            <option type="item" id="item" value="0" >الكل</option>
                        </select>

                    </div>
                    <div className="col">
                        <input
                            type="text"
                            className="form-control w-75 mt-4"
                            placeholder=" ابحث عن اسم الجهاز"
                            name="name"
                            value={searchCriteria.DocName}
                            onChange={handleSearchChange}
                        />
                    </div>
                        </>
                    }
                   
                    <div className="col">
                        <span className='myinput'>
                            <select className={`inp1 mar-4  ${searchedLoc ? 'w-25 mb-4 ' : 'w-75 '}`} onChange={handleSearchChange}
                                name="location"
                                value={searchCriteria.location}
                                required
                            >
                                <option value="" selected disabled >موقع الجهاز</option>
                                {AllLocations?.map((locat) => (
                                    <>
                                        <option type="item" id="item" value={locat.id}>{locat.name}</option>
                                    </>

                                ))}
                                <option type="item" id="item" value="0" >الكل</option>

                            </select>

                        </span>
                    </div>
                    {
                        !searchedLoc &&  <div className="col">
                        <input
                            type="text"
                            className="form-control w-75 mt-4"
                            placeholder=" ابحث عن رقم السيريال"
                            name="serialNumber"
                            value={searchCriteria.serialNumber}
                            onChange={handleSearchChange}
                        />
                    </div>
                    }
                   

                </div>
                <table className='table table-hover mb-3'>
                                    <thead>
                                        <tr>
                                            <th>اسم الجهاز</th>
                                            <th>نوع الجهاز</th>
                                            <th>رقم الباركود</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                {AllDevices?.length > 0 ? <>

                    {searchedLoc ? <>{LocationsAllDevices?.map((col,index) => (


                           
                                <tbody>
                                          <tr >
                                            <td className='my-auto py-5'><h5>{col.name}</h5></td>
                                            <td className='my-auto py-5 no-print'>{col.deviceType}</td>
                                            <td  className='py-5' >
                                                <div ref={(col) => (printRef.current[index] = col)} className='d-flex justify-content-center align-items-center'>
                                                    <BarcodeSvg serialNum={col.serialNumber} />
                                                   
                                                </div>
                                                {/* <h5>{col.name}</h5> */}
                                                
                                            </td>
                                            <td className='my-auto py-5 no-print'>
                                                <button className="btn fw-bold cyan mx-2 px-4 my-auto fs-5 py-2" onClick={()=>HandlePrint(index , col.serialNumber )}>طباعة</button>
                                            </td>
                                        </tr>
                                </tbody>



                    ))}</> : <>

                        {searched ? <>{filteredDevices?.map((col,index) => (


                               
                                    <tbody>
                                              <tr >
                                            <td className='my-auto py-5'><h5>{col.name}</h5></td>
                                            <td className='my-auto py-5 no-print'>{col.deviceType}</td>
                                            <td  className='py-5' >
                                                <div ref={(col) => (printRef.current[index] = col)} className='d-flex justify-content-center align-items-center'>
                                                    <BarcodeSvg serialNum={col.serialNumber} />
                                                   
                                                </div>
                                                {/* <h5>{col.name}</h5> */}
                                                
                                            </td>
                                            <td className='my-auto py-5 no-print'>
                                                <button className="btn fw-bold cyan mx-2 px-4 my-auto fs-5 py-2" onClick={()=>HandlePrint(index , col.serialNumber )}>طباعة</button>
                                            </td>
                                        </tr>
                                    </tbody>


                        ))}</> : <>{AllDevices?.map((col,index) => (



                              
                                    <tbody>
                                        <tr >
                                            <td className='my-auto py-5'><h5>{col.name}</h5></td>
                                            <td className='my-auto py-5 no-print'>{col.deviceType}</td>
                                            <td  className='py-5' >
                                                <div ref={(col) => (printRef.current[index] = col)} className='d-flex justify-content-center align-items-center'>
                                                    <BarcodeSvg serialNum={col.serialNumber} />
                                                    <div className=''>
                                                        {/* <h3>{col.name}</h3> */}
                                                    </div>
                                                </div>
                                                {/* <h5>{col.name}</h5> */}
                                                
                                            </td>
                                            <td className='my-auto py-5 no-print'>
                                                <button className="btn fw-bold cyan mx-2 px-4 my-auto fs-5 py-2" onClick={()=>HandlePrint(index , col.serialNumber )}>طباعة</button>
                                            </td>
                                        </tr>
                                    </tbody>
    
                               

                        ))}</>}

                    </>}

                </> : <>
                    لم يتم اضافة اجهزه بعد
                </>}

                </table>
            </div>
        </div>
    )
}

export default AllBarcodes
// npm install --save @createnextapp/react-barcode --force  