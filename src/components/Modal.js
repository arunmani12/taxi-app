import React,{useState} from 'react'
import './modal.css'





function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}







export default function Modal(
    {time,
    distance,
    startingAddress,
    destinationAddress,
    jsondata,
    setmodel,
    number,
    email,
    name}
    ) {


    async  function displayRazerpay(){


        console.log(jsondata)
        console.log(startingAddress)
        console.log(destinationAddress)

		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    
		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}


    
		const data = await fetch('http://localhost:1337/razorpay', { 
            method: 'POST' ,
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...jsondata,startingAddress,destinationAddress,name,number})
        }).then((t) =>
    t.json()
  )

  console.log(data)


    let options = {
    	key: 'rzp_test_0vkBRjhVSBDtBK',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'pay taxi',
			description: 'Thank you for approch over taxi service ',
			image: 'http://localhost:1337/logo.svg',
			handler: function (response) {
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
			},
			prefill: {
				name,
				email,
				phone_number: number
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
  }



    let timeInMintes = time/60;
    let distanceInKm = distance/1000;
    let BillAmmount = distanceInKm*10

   




    const [modal2, setModal2] = useState(false)

    const switchhandler = () =>{
        setmodel(false)
    }

    const  switchmo2 = () =>{
        setModal2(!modal2)
    }

    return (
       
        <>
           
        {modal2 && <>
        <div className='modal-order m2'>

           <div className='text-text m3'>
           <h3>Cars</h3>
           <button onClick={displayRazerpay}>Pay advance Online</button>
           <button>Cash On</button>
           <button onClick={switchmo2}>Cancel</button>
           </div>
       </div>
        </>}
        
        <>
        {distance && jsondata.driving === 'driving' ?
        <div className='modal-order'>
            <div>
                <p className='logo'>Taxi Taxi</p>
                <div className='index'>
                <p>Phone number</p>
                <p>{number}</p>
        
                </div>
                <div className='index'>
                <p>Travel Time </p>
                 <p>{timeInMintes.toFixed(2)}(aprx)</p>
        
                </div>
                <div className='index'>
                <p>Travel Distance</p>
                <p>{distanceInKm.toFixed(2)}kms</p>
        
                </div>
                <div className='index'>
                <p>Bill Amount</p>
                <p>&#8377; {BillAmmount.toFixed(2)} (1km/&#8377;10)</p>
        
                </div>


                <div className='index'>
                <p> Advance</p>
                <p>&#8377; {(BillAmmount/10).toFixed(2)}</p>
        
                </div>


                <div className='index'>
                <p>Starting Address</p>
                <div className='address'>
                <p>{startingAddress}</p>
                </div>
                </div>
                
                <div className='index'>
                <p>Destination Address</p>
                <div className='address'>
                <p>{destinationAddress}</p>
                </div>
                </div>
                <div>
                <button onClick={switchmo2} >Book Now</button>
                <button onClick={switchhandler}>Cancel</button>
                </div>
            </div>
        </div>
       :<>
       <div className='modal-order'>
           <div className='text-text'>
           <h3>{!distance ?'please select route' :'please select driving mode'}</h3>
           <button onClick={()=>setmodel(false)}>Cancel</button>
           </div>
       </div>
       </> }
        </>
        </>
    )
}
