import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {  getMyProfile, updateUser } from '../../features/authSlice'
import { getPostByUser,getPostByGoogleUser} from '../../features/postSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

const Profile = () => {
  const [formdata,setFormData] = useState({
    name:"",email:""
})

const [pic,setPic] = useState()


    const user = JSON.parse(localStorage.getItem('profile'));
    const userPosts = useAppSelector((state)=>(state.posts.userPosts))
    const userId = user?.result?._id 
    const googleUserId = user?.result?.googleId;
    const dispatch = useAppDispatch()

    const submitHandler =  async (e:any) =>{
      e.preventDefault();
    const formData = new FormData();
    formData.append("name",formdata.name)
    formData.append("pic",pic)

       await dispatch(updateUser(formData))
       await dispatch(getMyProfile(userId))
      
    }
    const handleChange = (e:any) =>{
      setFormData({...formdata,[e.target.name]:e.target.value})
  }
  const changeHandler = (event) => {
		setPic(event.target.files[0]);
    
	};

 
useEffect(()=>{
  const checkID = async () =>{
  if(googleUserId){
    return await  dispatch(getPostByGoogleUser(googleUserId))
}
    if(userId){
      return await dispatch(getPostByUser(userId))
    }
  }
  checkID();
},[userId,googleUserId])
  return (
    <div className='container mb-5'>

        <div className='position-relative' style={{zIndex:100}}>
      <Link to="/posts"> <i className="fa-solid fa-backward" style={{color:"blue"}}></i></Link>
      <p className='text-center text-danger' style={{fontWeight:600,fontSize:"40px"}}>Profile</p>
      
      <p ><span style={{fontSize:"25px"}}>Name:</span><span className='text-success' style={{fontWeight:600,fontSize:"25px"}}>&nbsp;{user?.result?.name}</span></p>
      
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <input type="text" className="form-control mb-3" defaultValue={user?.result?.name} placeholder='Name' name="name" onChange={handleChange}/>
        <input type="text" placeholder='Email' defaultValue={user?.result?.email} className="form-control mb-3" name="email" disabled onChange={handleChange}/>
        <label htmlFor="pic" style={{cursor:"pointer"}}>
          <div 
          style={{ border: "solid 2px #9f070a",borderRadius: "100%",backgroundColor:"black",
          width:" 100px",height: "100px",textAlign:"center"}}>
          <i className="fa-sharp fa-solid fa-upload" style={{fontSize:"30px",margin: "27%",color:"white"}}></i>
          </div>
          </label>
        <input type="file"
         name="pic" 
         id="pic"  
         style={{display:"none"}}
         onChange={changeHandler} />
        <button type='submit' className='btn btn-danger mb-1 mt-3'>Submit</button>
        
      </form>
      <p className='text-center' style={{fontWeight:600,fontSize:"30px",color:"blue"}}>My Posts</p>
      <div className="row">
      {
        
        userPosts && userPosts.map((item)=>(
          <div className="col-md-4">
          <div key={item._id}>
          <div className='card'>
         <img src={`http://localhost:5000/uploads/${item.selectedFile}`} className="card-img-top img-fluid" style={{height:250}}/>
         
         </div>
         </div>
         </div>
        ))
      }
      </div>
      </div>
    </div>
 
  )
}

export default Profile