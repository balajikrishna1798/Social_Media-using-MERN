import React, { useEffect, useRef, useState } from 'react'
import { getMessages, postMessages } from '../../api';
import { getConversation } from '../../features/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ChatOnline from '../ChatOnline/ChatOnline';
import Conversation from '../Conversation/Conversation';
import Message from '../Message/Message';
import Navbar from '../NavBar/NavBar'
import './FunChat.css';
import {io} from 'socket.io-client'


const FunChat = () => {
  const dispatch = useAppDispatch()

  const [currentChat, setCurrentChat] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket:any = useRef();

  const [onlineUsers, setOnlineUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("profile"));
  const scrollRef:any = useRef();
  const convo = useAppSelector(state=>state.auth.convo)
  
  useEffect(() => {
    socket.current = io("ws://localhost:8080");
    socket.current.on("getMessage",(data)=>{
    setArrivalMessage({
      sender:data.senderId,
      text: data.text,
      createdAt: Date.now(),
    });
  });
}, [])
  
useEffect(() => {
  arrivalMessage&&currentChat.members.includes(arrivalMessage.sender)
  &&setMessages((prev)=>[...prev,arrivalMessage])
}, [arrivalMessage,currentChat])


  useEffect(()=>{
    socket.current.emit("addUser",user?.result?._id)
    socket.current.on("getUsers",users=>   
    setOnlineUsers( user?.result?.following.filter((f) => users.some((u) => u.userId === f)))
    
    )
  },[])
  

  
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await dispatch(getConversation(user?.result?._id));
        console.log(res);
        
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user?.result?._id]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await getMessages(currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessage();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user?.result?._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((m: any) => m !== user?.result?._id);

    socket.current.emit("sendMessage",{
      senderId: user?.result?._id,
      receiverId,
      text: newMessage,
    })  

    try {
      const res = await postMessages(message);
      console.log(message)
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])


  return (
      <div className='funchat'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
           
            {convo?.map(c=>(
              <div onClick={() => setCurrentChat(c)}>
              <Conversation  conversation={c} currentUser={user} />
              </div>

            )
            )}
            
           
          </div>
        </div>
        <div className='chatBox'>
        <div className='chatBoxWrapper'>
        {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    
                    <div ref={scrollRef}>
                     
                      
                      <Message message={m} own={m.sender === user?.result?._id} />
                    </div>
                  ))}
          
          
        </div>
        <div className='chatBoxBottom'>
        <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
          <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
        </div>
        </>):(
          <h1 style={{textAlign:"center"}}>
          Open a conversation to start a chat.
        </h1>
      )}
        </div>
        </div>
        <div className='chatOnline'>
          <div className='chatOnlineWrapper'>
            <ChatOnline onlineUsers={onlineUsers} currentId={user?.result?._id} setCurrentChat={setCurrentChat}/>
          </div>
        </div>
      </div>
  )
}

export default FunChat