import React,{useState,useEffect} from 'react'
import './Admin.css'
import Adminmodal from './Adminmodal'
import Cookies from 'js-cookie'


export default function Admin() {
    let [data, setdata] = useState([])
    const [modelA, setModelA] = useState(false)
    const [modelAdata, setModelAdata] = useState({})
    let isLogedin = Cookies.get('token');

        
   useEffect(() => {
    if(isLogedin){
       const fetchData = async()=>{
        let token = Cookies.get('token')
       let fetchdata = await fetch('http://localhost:1337/admin',{
         headers: { Authorization: token }
       })
       const res = await fetchdata.json()
       setdata(res)
       }
       fetchData()
    }
    else{
        setdata([])
    }
    return () => {
        setdata([])
      };
   }, [])
     
   let showAd = (e) =>{
    //    console.log(e);
       setModelAdata(e)
       setModelA(true)
       console.log(modelAdata)
   }

    return (
        <>
        {modelA &&  <Adminmodal e={modelAdata} set={setModelA}/>}
        <div className='admin-con'>
            {data.map(e=>(
                <div onClick={()=>showAd(e)} key={e.travel[0].orderId} className='admin-div'>     
                         <p>{e.travel[0].name}</p> 
                         <p>{e.travel[0].orderId}</p>
                         <p>&#8377; {e.travel[0].advance}</p>
                         <p>{e.travel[0]._id}</p>
                </div>
            ))}
        </div>
        </>
    )
}
