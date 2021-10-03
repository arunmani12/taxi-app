import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import  '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import geo from 'mapbox-geocoding'
import 'mapbox-gl/dist/mapbox-gl.css';
import Modal from './Modal'
import useInput from  '../hooks/use-input'




mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';
geo.setAccessToken('YOUR_MAPBOX_TOKEN');
function Home() {
  const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(80.26740923009906);
const [lat, setLat] = useState(13.084532827196531);
const [zoom, setZoom] = useState(12);
 let [jsondata, setjsondata] = useState(
   {time:'',distance:'',startinglat:'',startinglog:'',endinglat:'',endinglog:'',driving:''}
   )
const [model, setmodel] = useState(false)





useEffect(() => {
  if (map.current) return; // initialize map only once
  const map2 = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v10',
    // style:'mapbox://styles/mapbox/dark-v10',
    center: [lng, lat],
    zoom: zoom
  });


  let directions = new MapboxDirections({
    accessToken: 'YOUR_MAPBOX_TOKEN',
    unit: 'metric',
    profile: 'mapbox/driving'
  });
  map2.addControl(directions, 'top-left')
  map2.on('load',()=>{
    directions.on('route', ({route}) => {
      // const letss = JSON.stringify(route, null, 2)
      // console.log(route[0].legs[0].summary)
      if(!route){
        return
      }
     jsondata.driving = route[0].legs[0].steps[0].mode
     jsondata.distance = route[0].distance
     jsondata.time=route[0].duration
     

    })
    directions.on('origin', ({feature}) => {
     jsondata.startinglog = feature.geometry.coordinates[0]
     jsondata.startinglat = feature.geometry.coordinates[1]
    })
    directions.on('destination',({feature})=>{
      jsondata.endinglog=feature.geometry.coordinates[0]
      jsondata.endinglat=feature.geometry.coordinates[1]
    })
   
  })

 
  
},[]);
  // setjsondata(jsondata)
 
 const [Stardingaddres, setStardingaddres] = useState('')
 const [endingAddress, setEndingAddress] = useState('')




const showModel = async() =>{
  console.log(number)
  if(!jsondata.distance){
    setmodel(true)
    return
  }
    geo.reverseGeocode('mapbox.places',jsondata.endinglog,jsondata.endinglat,(err, geoData)=>{
   setEndingAddress(geoData.features[0].place_name)
   if(err){
     console.log(err)
   }
  })
  geo.reverseGeocode('mapbox.places',jsondata.startinglog,jsondata.startinglat,(err, geoData)=>{
   setStardingaddres(geoData.features[0].place_name)
     if(err){
       console.log(err)
     }
    })
  setmodel(true)
}

const { value:number ,
  hasError:numberHasError,
  isValid:numberisvalid,
  valueChangeHandler:numberchange,
  valueBlurHandler:numberBlur,
  reset:numres
} =  useInput(value => value.trim().length===10 ) 

const { value:name,
  hasError:nameHasError,
  isValid:nameisvalid,
  valueChangeHandler:namechange,
  valueBlurHandler:nameBlur,
  reset:nameres
} =  useInput(value => value.trim().length>=4 ) 


const { value:email,
  hasError:emailHasError,
  isValid:emailisvalid,
  valueChangeHandler:emailchange,
  valueBlurHandler:emailBlur,
  reset:emailres
} =  useInput(value => value.trim().length>=4 ) 







let Formisvalid= false

if(numberisvalid && nameisvalid&&emailisvalid){ 
   Formisvalid= true
}



// console.log(formisvalid)

  return (
     <>
     { model &&<Modal 
     setmodel={setmodel}
     time={jsondata.time}
    distance={jsondata.distance}
    startingAddress={Stardingaddres}
    destinationAddress={endingAddress}
    jsondata={jsondata}
    number={number}
    name={name}
    email={email}
     />}
     
      <div className='main'> 
        <div ref={mapContainer} className="map-container" />
         <div className='main-2'>
           <h2>Book Now</h2>
           <p>Choose the starting place and destination in map</p>
           <label htmlFor='phoneNumber'>Phone Number</label>
           <input type='number' onChange={numberchange} onBlur={numberBlur} id='phoneNumber'/>
           {numberHasError && <p className='error-txt'>Enter valid number</p>}
           <label htmlFor='name'>Name</label>
           <input type='text' id='name' onChange={namechange} onBlur={nameBlur}/>
           {nameHasError && <p className='error-txt'>Name must be more tha 4 letter</p>}
           <label htmlFor='email'>Email</label>
           <input type='email' id='email' onChange={emailchange} onBlur={emailBlur}/>
           {emailHasError && <p className='error-txt'>Enter a valid email</p>}
           <button
             className='btn btn--green' 
             disabled={!Formisvalid}
             onClick={showModel} >Click</button>
         </div>
     </div>
    </>
  );
}

export default Home;
