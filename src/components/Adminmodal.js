import React from 'react'
import './modal.css'

export default function Adminmodal({e,set}) {
    console.log(e)
    let switchHandler = () =>{
           set(false)
    }

    return (
        <div className='modal-order'>
            <div>
            <div className='index'>
                <p>Name</p>
                <p>{e.travel[0].name}</p>
            </div>
            <div className='index'>
                <p>phone number</p>
                <p>{e.phoneNumber}</p>
            </div>
            <div className='index'>
                <p>Email</p>
                <p>{e.travel[0].email}</p>
            </div>
            <div className='index'>
                <p>advance</p>
                <p>&#8377; {e.travel[0].advance}</p>
            </div>
            <div className='index'>
                <p>Total amount</p>
                <p>&#8377; {e.travel[0].billAmount}</p>
            </div>
            <div className='index'>
                <p>Starting Address</p>
                <p>{e.travel[0].startingAdd}</p>
            </div>
            <div className='index'>
                <p>Destination Address</p>
                <p>{e.travel[0].endingAdd}</p>
            </div>
            <div className='index'>
                <p>Distance</p>
                <p>{(e.travel[0].distance/1000).toFixed(2)} Km</p>
            </div>
            <div>
                <button  onClick={switchHandler}>Cancel</button>
                </div>
        </div>
        </div>
    )
}
