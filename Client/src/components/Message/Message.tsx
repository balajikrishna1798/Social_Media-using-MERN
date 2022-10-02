import React from 'react'
import { format } from "timeago.js";

import './Message.css'
const Message = ({message,own}) => {
   console.log(message);
   
  return (
    <div className={own?'message own':"message"}>
        <div className="messageTop">
            <img className='messageImg' src={message.pic} alt="" />
            <p className='messageText'>{message.text}</p>
        </div>
        <div className='messageBottom'>{format(message.createdAt)}</div>
    </div>
  )
}

export default Message