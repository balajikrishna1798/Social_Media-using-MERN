import moment from 'moment';
import { useEffect } from 'react'
import {  useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import { getPost } from '../features/postSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

const PostDetails = () => {
    const post = useAppSelector((state:any) => state.posts.posts);
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {id} = useParams()
    useEffect(()=>{
        dispatch(getPost({id,navigate}))
    },[id,dispatch])
  return (
    <div className='container' style={{width:"60%"}}>
       <Link to="/posts"> <i className="fa-solid fa-backward" style={{color:"blue"}}></i></Link>
        <div className='card mt-1 mb-5' key={post._id}>
      
        <img src={`http://localhost:5000/uploads/${post.selectedFile}`} className="card-img-top position-relative" style={{height:500}}/>
        <div className="card-body">
        <h5 style={{ color: "red" }}>{`Uploaded by ${post?.name}  `}</h5>
        <h6 style={{ color: "blue" }}>{moment(new Date(post?.createdAt)).fromNow()}</h6>
        <h6 className='mb-3'>{post.title}</h6>
        {post.tags && <h6>{post.tags.map((tag:any)=>(`#${tag}`))}</h6>}
        <h5>{post.message}</h5>
        </div>
        </div>
        </div>
  )
}

export default PostDetails