import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



export let authcontext = createContext()


// let BaseUrl = `http://localhost:5137/api`
let BaseUrl = `http://localhost:5137/api`


export  default function  AuthProvider ({children}){

    let [loginData ,setLoginData] = useState('')
    let [allUser ,setAllUser] = useState([])
    let [AllTypes ,setAllTypes] = useState([])
    let [AllWorkShops ,setAllWorkShops] = useState([])
    let [LastWorkShop ,setLastWorkShop] = useState([])
    let [WorkShopDev ,setWorkShopDev] = useState([])
    let [AllLocations ,setAllLocations] = useState([])
    let [LastDevLocations ,setLastDevLocation] = useState([])
    let [AllDevLocations ,setAllDevLocation] = useState([])
    let [LocationsAllDevices ,setLocationsAllDevices] = useState([])
    let [AllDevices ,setAllDevices] = useState([])
    let [Allspares ,setAllSapares] = useState([])
    let [DeviceSpares ,setDeviceSpares] = useState([])
    let [deviceData ,setAllDeviceData] = useState([])
    let [AllTransactions ,setِAllTransactions] = useState([])
    let [SpecTransaction ,setِSpecTransaction] = useState([])
    let [DeviceSerial ,setِDeviceSerial] = useState([])
    let [DeviceTransaction ,setِDeviceDeviceTransaction] = useState([])        
    let [UserTransaction ,setِUserTransaction] = useState([])        
    let [AllTools ,setAllTools] = useState([])
    let [AllInfo ,setِAllInfo] = useState([])
    let [SpecUser ,setSpecUser] = useState([])



    // let [spesMilClinic ,setMilSpesClinic] = useState([])
    // let [spesCivClinic ,setCivSpesClinic] = useState([])





    async function  LoginAPi(values , navigate , setisLoading){
        console.log(values);
        
         await axios.post(`${BaseUrl}/Users/login`,values).then(res=>{
            console.log(res);
            setLoginData(res.data)
             localStorage.setItem("token" , res.data.token)
             localStorage.setItem("role",res.data.role)
             localStorage.setItem("id",res.data.id)
             localStorage.setItem("user",res.data.username)
            //  if(res.data.role === "technican")
            //  {
            //     navigate("/main/ShowDocClinic")
            //  }
            if(res.data.role === "admin") {
                navigate("/main/showDevices")
             }
             else {
                navigate("/main/showDevices")
             }
             
             setisLoading(false)

        }).catch(err=>{
            setisLoading(false)
            console.log(err)
            toast.error("خطأ في اسم المستخدم او كلمة المرور")
        })
    }


    
    let   GetAllUser = async ()=>{
        await axios.get(`${BaseUrl}/Users`,{headers: {
            'Access-Control-Allow-Origin': '*',
          }}).then(res=>{
            // console.log(res);
            setAllUser(res.data)

        }).catch(err=>{
            console.log(err);
        })
    }

    let   GetSpecUser = async (id)=>{
        try {
            const res = await axios.get(`${BaseUrl}/Users/${id}`);
            setSpecUser(res.data);
            return res.data; // return the user data to ensure it's available
        } catch (err) {
            console.log(err);
        }
    }
    let  BlockUser = async (id)=>{
        const user = await GetSpecUser(id); // Wait for GetSpecUser to complete

    if (user) {
        await axios.put(`http://localhost:5137/api/Users/${id}`, {
            username: user.username, // Use the returned user data
            name: user.name,
            password: user.password,
            isBlocked: true,
            role: user.role
        }).then(res => {
            toast.success("تم حظر المستخدم بنجاح");
            GetAllUser(); // Fetch all users after blocking
        }).catch(err => {
            toast.error("لم يتم حظر المستخدم");
        });
    }
    }
    
    
    async function addClinic(values){
        // console.log("hiiiiiii");
        values.userId = localStorage.getItem("id");
        // console.log(values);

        await axios.post(`${BaseUrl}/Clinics`, values , {headers: {
            'Access-Control-Allow-Origin': '*',
          }}).then((res) => {
            console.log(res);
            toast.success("تم اضافة العيادة بنجاح");
        }).catch(e=>console.log(e))
    }

    async function deleteClinic (id, name) {

        console.log(id);
        await axios.delete(`${BaseUrl}/Clinics/${id}`,{headers: {
            'Access-Control-Allow-Origin': '*',
          }}).then(
            toast.success(`تم حذف عيادة ${name} بنجاح`)
        ).catch(e => console.log(e))
        getTypes()

    };
    async function get1Device (id) {

        // console.log(id);
        await axios.get(`${BaseUrl}/Information/${id}`).then( res => {
            // console.log(res);
            setAllDeviceData(res.data)
        }
           
        ).catch(e => console.log(e))
        getTypes()

    };

    

    let  getTypes = async ()=>{
        await axios.get(`${BaseUrl}/DeviceTypes`).then(res=>{
            // console.log(res.data);
            setAllTypes(res.data)

        }).catch(err=>{
            console.log(err);
        })
    }

    let  getWorkShops = async ()=>{
        await axios.get(`${BaseUrl}/Workshops`).then(res=>{
            // console.log(res.data);
            setAllWorkShops(res.data)

        }).catch(err=>{
            console.log(err);
        })
    }
    let  getWorkShopDev = async (id)=>{
        // console.log(id);
        
        await axios.get(`${BaseUrl}/Transactions/getWithDevice/${id}`).then(res=>{
            // console.log(res.data);
            setWorkShopDev(res.data)

        }).catch(err=>{
            console.log(err);
        })
    }
    let  GetlastWorkShops = async (id)=>{
        // console.log(id);
        
        await axios.get(`${BaseUrl}/Information/LastWorkShop/${id}`).then(res=>{
            // console.log(res.data);
            setLastWorkShop(res.data)

        }).catch(err=>{
            console.log(err);
        })
    }

    let  getLocations = async ()=>{
        await axios.get(`${BaseUrl}/Locations`).then(res=>{
            // console.log(res.data);
            setAllLocations(res.data)

        }).catch(err=>{
            console.log(err);
        })
    }
    let  getDeviceLocation =  async(id)=>{


        await axios.get(`${BaseUrl}/Information/LastLocation/${id}`).then(res=>{
            setLastDevLocation(res.data)

        }).catch(err=>{
            console.log(err);
        })

        // return loc.name
    }
    let  LocationGetDevices =  async(id)=>{


        await axios.get(`${BaseUrl}/Information/InformationByLocationId/${id}`).then(res=>{
            setLocationsAllDevices(res.data)

        }).catch(err=>{
            console.log(err);
        })

        // return loc.name
    }

    let  getDevices = async ()=>{
        await axios.get(`${BaseUrl}/Information`).then(res=>{
            // console.log(res.data);
            setAllDevices(res.data)

        }).catch(err=>{
            console.log(err);
        })
    }

    let  getSpares = async ()=>{
        await axios.get(`${BaseUrl}/SpareParts`).then(res=>{
            // console.log(res.data);
            setAllSapares(res.data)

        }).catch(err=>{
            console.log(err);
        })
    }
    // tools
    let  getTools = async ()=>{
        await axios.get(`${BaseUrl}/Tools`).then(res=>{
            // console.log(res.data);
            setAllTools(res.data)

        }).catch(err=>{
            console.log(err);
        })
    }

    let  getDeviceSpares = async (id)=>{
        await axios.get(`${BaseUrl}/Information/DeviceSpareParts/${id}`).then(res=>{
            // console.log(res.data);
            setDeviceSpares(res.data)

        }).catch(err=>{
            console.log(err);
        })
    }
    
    let  getDeviceLocations = async (id)=>{
        await axios.get(`${BaseUrl}/Information/Location2/${id}`).then(res=>{
            // console.log(res.data);
            setAllDevLocation(res.data)

        }).catch(err=>{
            console.log(err);
        })
    }
    let  TransactionFix = async (id)=>{
        // console.log(id);
        
        await axios.put(`${BaseUrl}/Transactions/Receive/${id}`).then(res=>{
            // console.log(res.data);
            getTransactions()
            toast.success("تم اصلاح الجهاز بنجاح")
            getDeviceTransaction(id)
        }).catch(err=>{
            console.log(err);
        })
    }
    let  getTransactions = async ()=>{
        await axios.get(`${BaseUrl}/Transactions`).then(res=>{
            // console.log(res.data);

            setِAllTransactions(res.data)

            
            // get1Device(res.data.informationId)

        }).catch(err=>{
            console.log(err);
        })
    }

    let  getUserTransactions = async ()=>{
        await axios.get(`${BaseUrl}/Users/transactions`).then(res=>{


            setِUserTransaction(res.data)

            
            // get1Device(res.data.informationId)

        }).catch(err=>{
            console.log(err);
        })
    }
    let  getSpecTransaction = async (id)=>{
        await axios.get(`${BaseUrl}/Transactions/${id}`).then(res=>{
            // console.log(res.data);

            setِSpecTransaction(res.data)

            
            // get1Device(res.data.informationId)

        }).catch(err=>{
            console.log(err);
        })
    }
    let  deleteTrans = async (id)=>{
        await axios.delete(`${BaseUrl}/Transactions/${id}`).then(res=>{
            // console.log(res.data);
            getTransactions()
            toast.success("تم حذف العطل بنجاح")


            
            // get1Device(res.data.informationId)

        }).catch(err=>{
            console.log(err);
        })
    }

    let  getDeviceWithSerial = async (id)=>{
        await axios.get(`${BaseUrl}/Information/SerialNumber/${id}`).then(res=>{
            // console.log(res.data);

            setِDeviceSerial(res.data)

            
            // get1Device(res.data.informationId)

        }).catch(err=>{
            console.log(err);
        })
    }

    let  getDeviceTransaction = async (id)=>{
        // console.log(id);
        
        await axios.get(`${BaseUrl}/Information/DeviceTransaction/${id}`).then(res=>{
            // console.log(res.data);

            setِDeviceDeviceTransaction(res.data)

            
            // get1Device(res.data.informationId)

        }).catch(err=>{
            console.log(err);
        })
    }

    let  getAllInfo = async (id)=>{
        // console.log(id);
        
        await axios.get(`${BaseUrl}/Information/info`).then(res=>{
            // console.log(res.data);

            setِAllInfo(res.data)

            
            // get1Device(res.data.informationId)

        }).catch(err=>{
            console.log(err);
        })
    }

    let  returnToInventory = async (id, userId)=>{
        // console.log(id);
        
        await axios.put(`${BaseUrl}/Information/returnToInventory/${id}/${userId}`).then(res=>{
            console.log(res.data);
            toast.success("تم إعادة الجهاز للمخزن بنجاح")

            
            // get1Device(res.data.informationId)

        }).catch(err=>{
            toast.error(err.response.data);
        })
    }





 




    return (
        <authcontext.Provider value={{ allUser, GetAllUser , GetSpecUser , SpecUser , BlockUser
                                        ,loginData , LoginAPi ,
                                        deviceData , get1Device
                                        , getTypes ,AllTypes , getSpares , Allspares ,
                                        GetlastWorkShops , LastWorkShop , getWorkShopDev , WorkShopDev ,
                                        getLocations , AllLocations ,
                                        getDeviceLocation , LastDevLocations , getDeviceWithSerial , DeviceSerial , deleteTrans ,
                                        getUserTransactions , UserTransaction ,
                                        getDeviceLocations , AllDevLocations ,
                                        LocationGetDevices ,LocationsAllDevices ,
                                        getDeviceSpares , DeviceSpares ,
                                        getWorkShops ,AllWorkShops ,
                                        getDevices ,AllDevices ,
                                        addClinic , deleteClinic ,
                                        AllTools , getTools ,
                                        getTransactions , AllTransactions , TransactionFix , getSpecTransaction , SpecTransaction ,
                                        getDeviceTransaction , DeviceTransaction , 
                                        getAllInfo , AllInfo , returnToInventory

                                        // GetMilSpecificClininc , spesMilClinic , 
                                        
                                        // GetCivSpecificClininc , spesCivClinic
                                        }} >
            {children}
        </authcontext.Provider>
    )

}