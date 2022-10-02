import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changePassword } from '../../features/authSlice';
import { useAppDispatch } from '../../hooks';
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup";
import { useForm } from "react-hook-form";
const ChangePassword = () => {
  const emailChange = JSON.parse(sessionStorage.getItem("email"));
  const hidePassword = "https://png.pngitem.com/pimgs/s/495-4950508_show-password-show-password-icon-png-transparent-png.png"
  const showPassword = "https://banner2.cleanpng.com/20190701/gbw/kisspng-computer-icons-password-portable-network-graphics-password-icon-png-vector-clipart-psd-peoplepng-5d1a0c1602a108.9242962015619881180108.jpg"

  const schema = yup.object().shape({
      
    password: yup
      .string()
      .min(
        6,
        "Passwords must be at least 6 characters"
      )
      .max(24)
      .required("Enter your password"),
   
  });
  
   
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm({
      defaultValues:{
        email:emailChange,
        password:"",
        code:""
      },
      resolver: yupResolver(schema)
    });
    console.log(emailChange);
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
   
    const [isRevealPwd, setIsRevealPwd] = useState(false);

const ChangepasswordHandle = (formData) =>{ 
  dispatch(changePassword({formData,navigate,toast}))
  console.log(formData);
 
}
  return (
    <div  style={{height:"100vh",backgroundColor:"rgb(163, 163, 73)"}}>
            <Link to="/auth"> <i className="fa-solid fa-backward mt-5" style={{color:"yellow",marginLeft:"20px",fontSize:"25px"}}></i><span style={{color:"black",marginLeft:"10px",fontWeight:"bolder",fontSize:"25px"}}>Back to Login Page</span></Link>
       <div className='container w-50 position-fixed' style={{backgroundImage: "linear-gradient(to right, blue , green)",padding:"40px",top:"50%",left:"50%", transform: "translate(-50%, -50%)"}}>
      <form className='container' onSubmit={handleSubmit(ChangepasswordHandle)} autoComplete="off">
        <input type="email" className='form-control mb-3'  value={emailChange} disabled 
       {...register("email")}
        placeholder='Email'/>
          {/* <input type="password" className={`form-control shadow-none ${errors.password?"mb-0":"mb-3"}`} {...register("password")} placeholder='Password' />
                  {errors&& <small className="text-danger">{errors.password?.message}</small>} */}
                  <div className='position-relative'>
                   <input type={isRevealPwd ? "text" : "password"} className={`form-control shadow-none ${errors.password?"mb-0":"mb-3"}`} 
                style={{borderColor:`${errors.password? "red":"green"}` }}
                placeholder="Password" {...register("password")}/>
                {
                  errors&& <small className="text-danger">{errors.password?.message}</small>}
                <img style={{width:`${isRevealPwd?"22px":"26px"}`,top:10,right:10,cursor:"pointer"}} className="position-absolute" 
          title={isRevealPwd ? "Hide password" : "Show password"}
          src={isRevealPwd ? hidePassword : showPassword}
          onClick={() => setIsRevealPwd(prevState => !prevState)}/>
          </div>
          <input type="text" className='form-control mb-3 w-25' {...register("code")} placeholder='OTP' />
          
          <button type='submit' className='btn btn-danger d-flex align-items-center'>Change Password</button>
        </form>
    </div>
    </div>
  )
}

export default ChangePassword