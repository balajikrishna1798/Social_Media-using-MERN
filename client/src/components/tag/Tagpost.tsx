import { useAppDispatch, useAppSelector } from '../../hooks'
import { Link, useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { getPostByTag } from '../../features/postSlice'
import moment from 'moment'
import Navbar from '../NavBar/NavBar'

const Tagpost = () => {

  const {tagPosts} = useAppSelector((state)=>({...state.posts}))

    const dispatch = useAppDispatch()
const navigate = useNavigate()
const user = JSON.parse(localStorage.getItem("profile"));

const {tag} = useParams()
    useEffect(() => {
        if(tag){
            dispatch(getPostByTag(tag))
        }
      }, [tag])

  return (
 <div>
    <Navbar />
    <h5 className='text-center mt-4 text-success'>#{tag}</h5>
   { tagPosts&&tagPosts.map(tags=>(      
    
     <div
       className="card mt-2 mb-3"
       style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}
     >
            <img
          src={`http://localhost:5000/uploads/${tags?.selectedFile}`}
          alt=""
          className="card-img-top"
          style={{height: "500px" }}
          
        />
         <div className="card-body">
          
           
              {user && (
                <>
                <h5 style={{ color: "red" }}>{`Uploaded by ${tags?.name}  `}</h5>
                <h6 style={{ color: "blue" }}>{moment(new Date(tags?.createdAt)).fromNow()}</h6>
                </>
              ) }
          

          <h6 className="mb-2">{tags?.title}</h6>         
          <h6>{tags?.tags.map((tag: any) => (
          
          <Link to={`/posts/tag/${tag}`} style={{color:"black"}}> #{tag}</Link>))}</h6>
          <h5>{tags?.message}</h5>
          
            </div>
        </div>
     
      
   

   ))}
 </div>
  )
}

export default Tagpost