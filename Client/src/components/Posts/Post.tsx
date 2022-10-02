import moment from "moment";
import { useAppDispatch } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";
import { deletePost, likePost } from "../../features/postSlice";
import Comments from "../Comments/Comments";
import {  useState } from "react";
import './Posts.css'
import { LikeCount } from "../LikeCount/LikeCount";

const Post = ({ post, setCurrentId }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile"));

  const userId = user?.result?._id;
  const dispatch = useAppDispatch();
  const handleLike = async () => {
    await dispatch(likePost(post._id));
  };
  const [showComment, setShowComment] = useState(true);
  const handleClick = () => {
    setShowComment((prevshowComment) => !prevshowComment);
  };
  
 
  const Likes = () => {
    if (post?.likes.length > 0) {
      return post.likes.find((like: any) => like === userId) ? (
        <>
          <i className="fa-solid fa-handshake" style={{ color: "blue"}}><span style={{marginLeft:"5px"}}>Liked</span></i>
        </>
      ) : (
        <>
          <i className="fa-solid fa-thumbs-up "> Like</i>
         
        </>
      );
    }
    return (
      <>
        <i className="fa-solid fa-thumbs-up ">Like</i>
      </>
    );
  };
  const openPost = () => {
    navigate(`/posts/${post?._id}`);
    
  };


  return (
    <div className=" ">
      
      <div
        className="card mt-5"
        style={{ marginLeft: "auto", marginRight: "auto" }}
        key={post?._id}
      >
      
        {user?.result?._id === post?.creator && (
          <button
            className="position-absolute"
            style={{
              zIndex: 10,
              border: "none",
              right: 10,
              width:"10px",
              backgroundColor: "rgba(240, 248, 255, 0)",
            }}
            onClick={() => setCurrentId(post?._id)}
          >
            <Link to="/forms">
              <i
                className="fa-solid fa-ellipsis-vertical"
                style={{ color: "black" }}
              ></i>
            </Link>
          </button>
        )}

        <img
          src={`http://localhost:5000/uploads/${post?.selectedFile}`}
          alt=""
          className="card-img-top position-relative img"
          style={{ cursor: "pointer", height: "500px" }}
          onClick={openPost}
        />

        <div className="card-body">
          {
            <Link 
              to={`/${
               "userProfile"}/${post?.creator}`}
            >
              {user && (
                <div >
                <h5 style={{ color: "red" }}>{`Uploaded by ${post?.name}  `}</h5>
                <h6 style={{ color: "blue" }}>{moment(new Date(post?.createdAt)).fromNow()}</h6>
                </div>
              )}
            </Link>
          }

          <h6 className="mb-2">{post?.title}</h6>
          <h6>{post?.tags.map((tag: any) => (
          
          <Link to={`/posts/tag/${tag}`} style={{color:"green"}}> #{tag}</Link>))}</h6>
          <h5>{post?.message}</h5><hr></hr>
          <p className="fw-bold" style={{marginLeft:"80%"}}>
          <LikeCount post={post}/>
          </p>
          <hr></hr>
          <div className="row">
            <div className="col-md-4 col-xs-4" >
            <button 
              style={{ border: "none", backgroundColor: "white"}}
              disabled={!user?.result}
              onClick={handleLike}
            >
              
              <Likes />
            </button>
            </div>
         
            <div className="col-md-4 col-xs-3">
           {user?.result && <button
              style={{ border: "none", backgroundColor: "white" }}
              onClick={handleClick}
            >
              <i className="fa-solid fa-comments text-success">Comment</i>
            </button>}
            </div>

            {
              user?.result?._id === post?.creator && (
              <div className="offset-md-1 col-md-3 col-xs-3">
              <button
                
                style={{ border: "none", backgroundColor: "white",width:"5%" }}
                onClick={() => dispatch(deletePost({ id: post?._id, navigate }))}
              >
                <i className="fas fa-trash" style={{color:"red"}}>delete</i>
                
              </button>
              </div>
            )}
          </div>
        </div>
        {showComment ? (
          ""
        ) : (
          <div>
            <Comments post={post} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
