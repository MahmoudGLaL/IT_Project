
import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './Component/Layout/Layout';




import Login from './components/login';
import { useEffect, useState } from 'react';
import HomePage from './Component/Home/HomePage';

import Addrole from './components/Addrole';
import ShowRoles from './components/ShowRoles';
import Main from './Component/Main/Main';
import AuthProvider from './Context/authContext';
import { jwtDecode } from 'jwt-decode';


import CivClinicReserve from './components/CivClinicReserve';
import MilClinicReserve from './components/MiltaryClinicReserve';
import TalkReservers from './components/talkReservers';
import ShowDocClinics from './components/ShowDocClinic';
import DeviceTypes from "./components/DeviceTypes"
import WorkShops from './components/workShops';
import Spareparts from './components/sparesparts';
import Transactions from './components/Transactions';
import Devices from './components/Devices';
import ShowTypes from './components/ShowTypes';
import ShowSpareParts from './components/showSpareParts';
import ShowLocations from './components/showLocations';
import ShowWorkshops from './components/showWorkShops.jsx';
import ChangeLocation from './components/changeLocations.jsx';
import UpdateDevices from './components/Update_Devices.jsx';
import DeviceSpareParts from './components/DeviceSpareparts.jsx';
import AddLocations from './components/AddLocations.jsx';
import LocationDevices from './components/LocationDevices.jsx';
import ShowDeviceLocation from './components/showDeviceLocations.jsx';
import ShowDevices from './components/showDevices.jsx';
import BarcodeGeneration from './components/Barcode.jsx';
import AllBarcodes from './components/AllBarcodes.jsx';
import WorkshopDevices from './components/workShopDevices.jsx';
import Scanning from './components/Scanning.jsx';
import ShowAllTransactions from './components/ShowAllTransactions.jsx';
import ShowDevTransactions from './components/ShowDevTransactions.jsx';
import ShowTools from './components/showTools.jsx';
import AddTools from './components/AddTools.jsx';
import GetTools from './components/GetTools.jsx';
import AllUserTransactions from './components/AllUserTransactions.jsx';



function App(props) {
 let [userData ,setUserData] = useState(null)

function  SaveUserData (){
  let  encodeToken = localStorage.getItem("token")
  let  decodeToken = jwtDecode(encodeToken)
  setUserData(decodeToken)

  // console.log(decodeToken);
}
 useEffect(()=>{
  if(localStorage.getItem("token") !== null && userData ===null){
    SaveUserData()
  }
 },[])
  let routers = createHashRouter([
    {
      path: '/', 
      element: <Layout /> ,
      children:[
        {index:true , element:<Login/>},
        {path:"main/" , element:<Main /> , children:[
          {path:'talkReservers/:id' , element:<TalkReservers/>},
          {path:'ShowDocClinic' , element:<ShowDocClinics/>},
          {path:'addDevices' , element:<Devices/>},
          {path:'UpdateDevices/:id' , element:<UpdateDevices/>},
          {path:'Transactions/:id' , element:<Transactions/>},
          {path:'allTransactions' , element:<ShowAllTransactions/>},
          {path:'allUserTransactions' , element:<AllUserTransactions/>},

          {path:'ShowDeviceTransaction/:InfoId' , element:<ShowDevTransactions/>},

          {path:'addTypes' , element:<DeviceTypes/>},
          {path:'showTypes' , element:<ShowTypes/>},
          {path:'spareparts' , element:<Spareparts/>},
          {path:'deviceSpareparts/:id' , element:<DeviceSpareParts/>},
          {path:'showSpareparts' , element:<ShowSpareParts/>},
          {path:'ShowTools' , element:<ShowTools/>},
          {path:'AddTools' , element:<AddTools/>},
          {path:'GetTools' , element:<GetTools/>},
          {path:'workShops' , element:<WorkShops/>},
          {path:'showWorkShops' , element:<ShowWorkshops/>},
          {path:'WorkShopDevices/:id/:name' , element:<WorkshopDevices/>},
          {path:'addLocations' , element:<AddLocations/>},
          {path:'changeLocation/:id/:userID' , element:<ChangeLocation/>},
          {path:'showLocations' , element:<ShowLocations/>},
          {path:'LocationsDevices/:id/:name' , element:<LocationDevices/>},

          {path:'ShowDeviceLocation/:id' , element:<ShowDeviceLocation/>},

          {path:'MilClinicReserve' , element:<MilClinicReserve/>},
          {path:'CivClinicReserve' , element:<CivClinicReserve/>},
          {path:'showDevices' , element:<ShowDevices/>},
          {path:'barcode/:id' , element:<BarcodeGeneration/>},    
          {path:'barcodes' , element:<AllBarcodes/>},    
          {path:'addRole' , element:<Addrole/>},    
          {path:'showRole' , element:<ShowRoles/>},    
          {path:'allTransaction' , element:<allTransaction/>},    
          // {path:'scanning' , element:<Scanning/>},    
          // {path:"patient/report/:id",element:<Reports />}
        ]},
      ]
    }
  ])
  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={routers} />
      </AuthProvider>
       

    </div>
  );
}

export default App;
