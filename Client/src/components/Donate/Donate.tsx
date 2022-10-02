import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { payment } from '../../api';
import './Donate.css'
const Donate = ({handleModal}) => {

    const user = JSON.parse(localStorage.getItem('profile'));
    const [quantity,setQuantity]:any = useState(1)
    const amount = 20;

    const handlePay = () =>{
       
        payment({amount,quantity}).then((res)=>{

            if(res.data.url){
        
                window.location.href = res.data.url
        
                console.log(res.data.url)
        
            }
        
        })
        
        .catch((err)=>{
        
            console.log(err.message);
        
        
        
           })
    }
  return (
    <div className='container donate'>   
<input type="number" className='w-100 mt-4 form-control shadow-none' placeholder="Amount" value={amount} disabled></input><br/>
<input type="number" className='w-100 mt-1 form-control shadow-none' placeholder="Quantity" min="1" value={quantity} onChange={(e)=>setQuantity(e.target.value)}></input><br/>

<button className='p-1 btn btn-danger w-100' onClick={handlePay}>Sure to pay</button>
<Button onClick={handleModal} style={{marginTop:"10px"}}>Close Modal</Button>
</div>
  )
}

export default Donate