import { useEffect, useState } from "react";
import Forms from "../Form/Forms";
import {useAppDispatch, useAppSelector}  from "../../hooks";
import Posts from "../Posts/Posts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getPosts,getPostBySearch } from "../../features/postSlice";
import ChipInput from "material-ui-chip-input";
import Navbar from "../NavBar/NavBar";


function Home({setCurrentId}) {
  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useAppDispatch();




 

  useEffect(()=>{
    dispatch(getPosts())
    
   
  },[dispatch])
  

  return (
    
      <div>

        <Navbar />

      <div>
         </div>
          <div>
            <Posts setCurrentId={setCurrentId}/>
            </div>
            <div>
         </div>
        
         {user?.result?.name&&<div style={{marginBottom:"70px"}}>
             <div className="d-flex justify-content-around fixed-bottom" style={{backgroundColor:"pink"}}>  
    
 
    
    </div>
              </div>}
          </div> 

  );
}

export default Home;

