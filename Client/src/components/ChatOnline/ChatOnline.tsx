import axios from 'axios';
import  { useEffect, useState } from 'react'
import { getFriends } from '../../api';
import './ChatOnline.css'

const ChatOnline = ({onlineUsers,currentId,setCurrentChat}) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriendsList = async () => {
      const res = await getFriends(currentId);

      setFriends(res.data)
    };

    getFriendsList();
  }, [currentId]);

const onlineFriendFilter = friends.filter((f) => onlineUsers?.includes(f._id))

  useEffect(() => {
    setOnlineFriends(onlineFriendFilter);
    console.log("first")

  }, [ friends,onlineUsers]);

  
  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/conversation/find/${currentId}/${user._id}`
      );
      
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className='chatOnline'>
        {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.pic
                  ?  `http://localhost:5000/uploads/${o.pic}`
                  :  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.name}</span>
        </div>
      ))}
    </div>
  )
}

export default ChatOnline