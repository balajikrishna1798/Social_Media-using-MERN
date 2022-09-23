import { useEffect, useState } from "react";
import {useAppDispatch}  from "../../hooks";
import './NavBar.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logout } from "../../features/authSlice";
import { Modal } from "react-bootstrap";
import Donate from "../Donate/Donate";
import { getPosts,getPostBySearch } from "../../features/postSlice";

function Navbar() {
  const [show,setShow] = useState(false);
  const navigate = useNavigate()
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useAppDispatch();
  const location = useLocation()
  const [search,setSearch] = useState('')
  const logout = () =>{
    //@ts-expect-error
    dispatch(Logout())
    setUser(null)
    navigate(0)
    
  }
  const searchPost = () =>{
    if(search.trim()){
      dispatch(getPostBySearch(search))
  
      setSearch("")
    }
    else{
      navigate("/")
    }
  } 
  useEffect(()=>{
    return setUser(JSON.parse(localStorage.getItem('profile')))       
  },[location])
  const handleModal = () =>{
    setShow(!show)
  }
  

  return (
    
    
//     <div className="sticky-top" >

//     <div className="card text-center p-1" style={{backgroundColor:"yellow",overflowX:"hidden"}}>
//       <div className="row">
//       <button onClick={handleModal} title="Donate to Funtabulous if you wish.ThankYou!!!" 
//        className="offset-lg-1 offset-md-1 position-relative btn btn-outline-danger col-lg-1 col-md-2 shadow-none">
//         Donate
//       </button>
// 

//       <div className="offset-lg-2 col-md-4 col-8 memories"><Link to = "/">Funtabulous</Link>
     
//     </div>
//         {user?.result ? (
//             <>
//                  {user?.result.pic ?<img className="col-md-2 offset-md-0  offset-3 col-2 mt-1 userDp"
//                   src={user && !user?.result?.googleId ? `http://localhost:5000/uploads/${user?.result.pic}`:`${user?.result.pic}`}></img>
//                 :<h5 className="text-light col-md-2 col-sm-5 col-2 p-1 defaultDp">{user?.result?.name.charAt(0)}</h5>}

//                 <h5 className="text-success col-md-2 col-sm-3 col-3 mt-3" >{user?.result?.name}</h5>

//                 <button onClick={logout} className="btn btn-danger col-md-2 col-lg-1 col-4 mt-2">Logout</button>
//                 </> 
//         ):(
//           <div className="col-md-4 p-2">
//           <Link to="/auth">
//             <button className="Signin btn btn-dark w-25">SignIn</button>
//             </Link>
//             </div>
//         ) }
  
//     </div>
//     </div>
//     </div>
<nav className="navbar navbar-expand-lg bg-light sticky-top">
<button onClick={handleModal} title="Donate to Funtabulous if you wish.ThankYou!!!" 
       className="btn btn-outline-danger col-md-1 shadow-none" style={{marginLeft:"1rem"}}>
         Donate
      </button>
      <Modal show={show} onHide={handleModal}>
     <Modal.Header closeButton>
     Thanks For your Contribution <span style={{fontWeight:600,color:"blue",marginRight:"auto",marginLeft:"3px"}}>{user&&user.result.name}</span>
   </Modal.Header>
   <Modal.Body>
   <Donate handleModal={handleModal}/>
    </Modal.Body>
   </Modal>
  <div className="container">
 
    <a className="navbar-brand offset-1"><Link to = "/posts" className="text">Funtabulous</Link></a>
   
    <div className="menu" id="navbarSupportedContent">
    
      <ul className="navbar-nav">
        
        <li className="nav-item" >
        <Link to="/forms"> <i className="fa-solid fa-square-plus mb-2 mt-2" style={{color:"blue",fontSize:"25px"}}></i></Link>
        </li>
        <li className="nav-item"  style={{marginLeft:"30px"}}>
        <Link to="/searchCreator"><i className="fa-brands fa-searchengin mb-2 mt-2" style={{color:"brown",fontSize:"25px",cursor:"pointer"}}></i></Link></li>
        <li className="nav-item dropdown" style={{marginLeft:"30px"}}>
          <a className="nav-link dropdown-toggle text-success align-items-center" role="button" data-bs-toggle="dropdown" >
            
          {!user?.result ? <i className="fa-solid fa-user" style={{fontSize:"25px"}}></i>:
(
               <>
                    {user?.result.pic ?<img className="col-md-2 col-2" style={{borderRadius:"50%"}}
                     src={user && !user?.result?.googleId ? `http://localhost:5000/uploads/${user?.result.pic}`:`${user?.result.pic}`}></img>
                   :<h5 className="text-light col-md-2 col-sm-5 col-2 p-1 defaultDp">{user?.result?.name.charAt(0)}</h5>
                   
                   }
</>
)}

          <span style={{fontSize:"16px",marginLeft:"10px"}}>{user?.result?.name}</span>
          </a>
          {user?.result ? (
          <ul className="dropdown-menu">
            
            <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
            <li><Link className="dropdown-item" to="/posts">Dark Mode</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" onClick={logout}>Logout</a></li>
          </ul>
          ):(
            <ul className="dropdown-menu">
            
            <li><Link className="dropdown-item" to="/auth">Sign in</Link></li>
            </ul>
          )}
        </li>
      
       
      </ul>
      
    </div>
  </div>
  <form className="d-flex" style={{marginRight:"80px"}}>
        <input className="form-control me-2 shadow-none" placeholder="Search with title" value={search} aria-label="Search"  onChange={(e)=>setSearch(e.target.value)}/>
        <button className="btn btn-outline-success w-25 " onClick={searchPost} type="button"><i className="fab fa-affiliatetheme"></i></button>
      </form>
</nav>
  );
}

export default Navbar;
