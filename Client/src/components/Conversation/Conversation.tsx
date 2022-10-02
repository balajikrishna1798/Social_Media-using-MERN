import axios from 'axios';
import { useEffect, useState } from 'react'
import './Conversation.css'
const Conversation = ({ conversation, currentUser }) => {
    const [users,setUsers] = useState(null)

    useEffect(() => {
      const friendId = conversation.members.find((m: any) => m !== currentUser?.result?._id);

        console.log(friendId)
        const getUser = async () => {
          try {
           const res = await axios.get("http://localhost:5000/api/users?userId="+friendId)
          setUsers(res.data)
          
          } catch (err) {
            console.log(err);
          }
        };
         getUser();
      }, [currentUser, conversation]);
console.log(users)
  return (
    <div className='conversation'>

        <img
        className='conversationImg' src={
            users?.pic
              ?  `${!users.googleId?`http://localhost:5000/uploads/${users?.pic}`:users?.pic}`
              :"https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg"
          } />
    <span className='conversationName'>{users?.name}</span>
    </div>
  )
}

export default Conversation