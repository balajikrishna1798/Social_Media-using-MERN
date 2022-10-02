import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { searchUsers } from '../../api';
import { getPosts } from '../../features/postSlice';
import { useAppDispatch } from '../../hooks';
import './SearchCreator.css'
const SearchCreator = () => {
    const [search,setSearch] = useState("")
    const dispatch = useAppDispatch()
    const [userDetails,setUserDetails] = useState([])
    const fetchUsers = (name) =>{
      setSearch(name)
      searchUsers({name:name}).then(results =>{
        console.log(results)
        setUserDetails(results?.data?.user)
        
      })
    }
    useEffect(()=>{
        dispatch(getPosts())
        
       
      },[dispatch])
  return (
    <div className='container'>
   
     <input type="text" className="form-control shadow-none mb-2 mt-2 col-md-4 p-3 search"  name="name" value={search} placeholder="Search user" autoComplete="off" 
     onChange={(e)=>fetchUsers(e.target.value)}/>
     {/* </div> */}
    <ul>
      {userDetails && userDetails.map(item=>{
        return(
          <div key={item._id}>
          
        <Link to={`${"/userProfile/"+item._id}`}> 
        <div className="row">
        
        {(item.isVerified||item.googleId)&&<li className='card m-1 p-2 position-relative col-12' key={item._id} style={{listStyle:"none",color:"black"}}>
           {item.name}
      
        </li>}
        
        </div>
        </Link>
        </div>
        
        )
      })}
      

    </ul>
    </div>
   /* { posts.length>0 && posts.filter((val)=>{
        if(name==""){
         return val
        }
        else if(val.name.toLowerCase().includes(name.toLowerCase())){
         return val
        }
        }).
        map((post:any) => (
         <div key={post._id} >
            {post?.name}
         </div>))
}
         </div>
  ) */
)}


export default SearchCreator