import React, { useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../features/authSlice';
import { useAppDispatch } from '../../hooks';
import { toast } from 'react-toastify';
import './ForgotPassword.css'

const ForgotPassword = () => {
    const [formData,setFormData] = useState({
        email:"",code:"",password:""
    }) 
    const dispatch = useAppDispatch()

    const navigate = useNavigate();
    const handleClick = () =>{
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(forgotPassword({formData,navigate,toast}))
        sessionStorage.setItem("email",JSON.stringify(formData.email))
    }
    const handleChange = (e:any) =>{
      setFormData({...formData,[e.target.name]:e.target.value}) 
      
      
  }
  return (
    <div style={{height:"100vh",backgroundColor:"rgb(163, 163, 73)"}}>
       <Link to="/auth"> <i className="fa-solid fa-backward mt-5 backward"></i><span className='backwardText'>Back to Login Page</span></Link>
    <div className='container w-50 position-fixed forgotPasswordBG'>
   
        {<form onSubmit={handleSubmit} autoComplete="off">
        <input className='form-control mb-3' type="email" name='email' placeholder='Please enter your Email Address' onChange={handleChange}/>
        <button type="submit" className='btn btn-danger w-100 forgotPasswordSubmit'  onClick={handleClick}>Submit</button>
        </form>
      }
     
    </div>
    </div>
  )
}

export default ForgotPassword