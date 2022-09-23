import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usersProfile, googleusersProfile } from '../../features/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

const UserProfile = () => {
  const user = useAppSelector(state => state.auth.user)
  const { id } = useParams()
  const { googleid } = useParams()
  console.log(id);
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (id) {
      dispatch(usersProfile(id))
    }
    if (googleid) {
      dispatch(googleusersProfile(googleid))
    }
  }, [id,googleid])
  
  return (
    <div className='container mt-5'>
      <div><span className='fw-bold'>Name:</span><span className="fw-bolder p-3 text-success" style={{fontSize:"20px"}}>{user?.user?.name}</span></div>
      <span className='fw-bold'>Email Address:</span><span className="fw-bolder p-3 text-success" style={{fontSize:"20px"}}>{user?.user?.email}</span>
      <div className='row mt-5' >
        <p style={{ fontWeight: 600, fontSize: "20px", color: "red", textAlign: "center" }}> {user && user?.user?.name} <span>Posts</span></p>
        <hr />
        {user && user.posts && user.posts.map((item: any) => (
          <div className="col-md-4" >
            <div key={item._id}>
              <div className='card'>
                <Link to={"/posts/"+item._id}><img src={`http://localhost:5000/uploads/${item.selectedFile}`} className="card-img-top img-fluid" style={{ height: 250 }} /></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


export default UserProfile