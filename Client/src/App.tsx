import {BrowserRouter as Router,Routes,Route, Navigate, useLocation} from 'react-router-dom'
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Forms from "./components/Form/Forms";
import { useEffect, useState } from "react";
import Profile from "./components/Profile/Profile";
import UserProfile from './components/userProfile/UserProfile';
import { useAppDispatch } from './hooks';
import { setUser } from './features/authSlice';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ChangePassword from './components/ChangePassword/ChangePassword';
import SearchCreator from './components/searchCreator/SearchCreator';
import Register from './components/Auth/Register';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import Success from './components/Donate/Success';
import Failure from './components/Donate/Failure';
import Tagpost from './components/tag/Tagpost';
import FunChat from './components/FunChat/FunChat';
import Navbar from './components/NavBar/NavBar';
import PostDetails from './components/PostDetails/PostDetails';




function App() {
  const [currentId,setCurrentId] = useState(null);
  const stripePromise = loadStripe("pk_live_51LLijESDK40ce5vjWswCCiVxdL3xmFJrbFQhJgBpWBqeBqoYyenL91fZB5LtKea6qBPKpWvcOfzgy1sKUZD8HwRh00XzaANvqu");
 
  const dispatch = useAppDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  
  return (
    <Router>
       <Routes>
        <Route path="/auth" element={!user?.result.name?<Auth/>:<Navigate to="/posts"></Navigate>}/>
        <Route path="/register" element={!user?.result.name?<Register/>:<Navigate to="/posts"></Navigate>}/>
        </Routes>
        <Navbar />
        <Routes>
      <Route path="/" element={<Navigate to="/posts"/>}/>
      <Route path="/funchat" element={<FunChat />}/>

        <Route path="/posts" element={<Elements stripe={stripePromise}> <Home setCurrentId={setCurrentId}/></Elements>} />
        <Route path="/searchCreator" element={<SearchCreator/>} />
        <Route path="/forms" element={<Forms currentId={currentId} setCurrentId={setCurrentId}/>}/>
        <Route path="/posts/:id" element={<PostDetails/>}/>
        <Route path="/posts/tag/:tag" element={<Tagpost/>}/>

        <Route path="/success" element={<Success/>}/>
        <Route path="/failure" element={<Failure/>}/>
        <Route path="/profile" element={<Profile />} />
       

        <Route path="/userProfile/:id" element={<UserProfile />} />
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        
      </Routes>
    
    </Router>
   
  );
}

export default App;

