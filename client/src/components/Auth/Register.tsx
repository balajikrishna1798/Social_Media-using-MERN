
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { registerr } from '../../features/authSlice';
import { useAppDispatch } from '../../hooks';
import 'react-toastify/dist/ReactToastify.css';
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup";
import { useForm } from "react-hook-form";


const Register = () => {
  
    const schema = yup.object().shape({
        firstName: yup
          .string()
          .required("Please enter your first name")
          .min(2)
          .max(24),
        email: yup.string().email().required("Email is invalid"),
        password: yup
          .string()
          .min(
            6,
            "Passwords must be at least 6 characters, and contain one special character"
          )
          .max(24)
          .required("Enter your password"),
        confirmPassword: yup
          .string()
          .required("Type your password again")
          .oneOf([yup.ref("password")], "Passwords must match")
      });
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(schema),
        defaultValues:{
          firstName:"",
          email:"",
          password:"",
          confirmPassword:""
        }
      });
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    


    const onSubmit = (formData) =>{
     
            dispatch(registerr({formData,navigate}))
        }
       
 
        
    

 
  
   
   
        const [isRevealPwd, setIsRevealPwd] = useState(false);

        const hidePassword = "https://png.pngitem.com/pimgs/s/495-4950508_show-password-show-password-icon-png-transparent-png.png"
        const showPassword = "https://banner2.cleanpng.com/20190701/gbw/kisspng-computer-icons-password-portable-network-graphics-password-icon-png-vector-clipart-psd-peoplepng-5d1a0c1602a108.9242962015619881180108.jpg"
   return (
    <div className='container'>
       
        <div className='position-fixed mb' style={{paddingTop:"50px",paddingBottom:"70px",width:"50%", left:"50%",top:"50%",transform: "translate(-50%, -50%)"}}>
        <p className='text-center text-primary' style={{fontWeight:600,fontSize:"25px"}}>Sign Up</p>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off"> 
            <div className='container w-75'>
              
                
                
                <input type="text" className={`form-control shadow-none ${errors.firstName?"mb-0":"mb-3"}`} 
                style={{borderColor:`${errors.firstName? "red":"green"}` }}
                {...register("firstName")} 
                placeholder="First Name" />
                {
                 errors&& <small className="text-danger">{errors.firstName?.message}</small>}
               
              
                 

                <input type="email"  className={`form-control shadow-none ${errors.email?"mb-0":"mb-3"}`} 
                style={{borderColor:`${errors.email? "red":"green"}` }} 
                 placeholder="Email Address" {...register("email")}/>
                 {
                  errors&& <small className="text-danger">{errors.email?.message}</small>}
<div className='position-relative'>
  
                <input type={isRevealPwd ? "text" : "password"} className={`form-control shadow-none ${errors.password?"mb-0":"mb-3"}`} 
                style={{borderColor:`${errors.password? "red":"green"}` }}
                placeholder="Password" {...register("password")}/>
                {
                  errors&& <small className="text-danger">{errors.password?.message}</small>}
                <img style={{width:`${isRevealPwd?"20px":"26px"}`,top:10,right:10,cursor:"pointer"}} className="position-absolute" 
          title={isRevealPwd ? "Hide password" : "Show password"}
          src={isRevealPwd ? hidePassword : showPassword}
          onClick={() => setIsRevealPwd(prevState => !prevState)}
        />
             </div>
                
                <input type='password' className={`form-control shadow-none ${errors.confirmPassword?"mb-0":"mb-3"}`} 
                style={{borderColor:`${errors.confirmPassword? "red":"green"}` }}
                {...register("confirmPassword")} placeholder="Confirm Password" />
                 {
                 errors&& <small className="text-danger">{errors.confirmPassword?.message}</small>}
               
                
                
                <div className='d-flex justify-content-around mb-3'>
               
                <button type='submit' className='btn btn-outline-success w-25' >Sign Up</button>
                <button type='button' className="btn btn-secondary w-50">
                    <Link to = "/auth"><span style={{color:"black"}} >Already have an account?Sign In</span></Link>
                </button>
                </div>
            </div>
        </form>
      
        </div>
    </div>

  )
}

export default Register