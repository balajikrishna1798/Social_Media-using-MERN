import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { createPost, updatePost } from '../../features/postSlice';
import { useAppDispatch, useAppSelector } from "../../hooks";
import Navbar from '../NavBar/NavBar';
import './Forms.css'

interface post{
  name:string;
   title:string;
    message:string;
    tags:string[];
    selectedFile:object
}
const Forms = (props:any) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const navigate=useNavigate();
  const [postdata,setPostdata] = useState<post>({
    name:user?.result?.name,
    title:"",
    message:"",
    tags:[],
    selectedFile:{}
  })




  const post = useAppSelector((state:any)=>props.currentId?state.posts.posts.find((p:any)=>p._id===props.currentId):null)
  const dispatch = useAppDispatch()
  const handleSubmit = (e:any) =>{
    e.preventDefault();
    console.log(postdata.name,postdata.title,postdata.message)
     const postData  = new FormData();
     postData.append("name",postdata.name)
     postData.append("title",postdata.title)
     postData.append("message",postdata.message)
     for(const tags of postdata.tags)
     postData.append("tags",tags)
     postData.append("selectedFile",postdata.selectedFile[0])
   
    if(props.currentId){
      
      dispatch(updatePost({id:props.currentId ,postData:postdata,navigate}))
      
    }
    else{
      dispatch(createPost({postData,navigate}))
    }
    clear()
  }
  const clear = () =>{
    props.setCurrentId(null);
 
    setPostdata({name:user?.result?.name,title:"",message:"",tags:[],selectedFile:{}})
  }


useEffect(() => {
 if(post){
  setPostdata(post)
 }
}, [post,navigate,dispatch])


  return (
    <>
    <Navbar />
    <div className='container'>
      <form onSubmit={handleSubmit} className='mt-4' autoComplete='off' encType="multipart/form-data">
       <div className='text-center fw-bold mb-2'>{!props.currentId?'Creating' : 'Editing'} a Memory</div>
       <input type="text" placeholder='Name' className="form-control mb-3" name="name" value={user?.result?.name} disabled/>







       <input type="text" placeholder='Title' className="form-control mb-3" name="title" value={postdata.title} onChange={(e)=>setPostdata({...postdata, title:e.target.value})}/>
        <input type="text" placeholder='Tags' className="form-control mb-3" name="tags" value={postdata.tags} onChange={(e)=>setPostdata({...postdata, tags:e.target.value.split(",")})}/>
        <input type="text" placeholder='Description' className="form-control mb-3" name="message" value={postdata.message} onChange={(e)=>setPostdata({...postdata, message:e.target.value})}/>
        <div>
       
           <input type="file"
          required={!props.currentId?true:false}
         name="selectedFile" 
         id="selectedFile"
         onChange={(e)=>setPostdata({...postdata, selectedFile:e.target.files})} />
        </div>
        <button className="btn btn-primary mb-3 mt-3" type='submit'>Submit</button>
        <button className="btn btn-danger" type="button"  onClick={clear}>Clear</button>

      </form>
      </div>
      </>
  
  )
}

export default Forms