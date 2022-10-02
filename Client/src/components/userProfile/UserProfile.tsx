import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { usersProfile, follow, unfollow } from "../../features/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const UserProfile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const userId = JSON.parse(localStorage.getItem("profile"));

  const { id } = useParams();
  const [followed, setFollowed] = useState(true);
  console.log(user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setFollowed(userId?.result?.following.includes(id));
    console.log(userId);
  }, [id, userId]);
  useEffect(() => {
    dispatch(usersProfile(id));
  }, [id, dispatch]);

  const handleClick = async () => {
    if (!followed) {
      await dispatch(follow({ id: id, userId: userId?.result?._id }));
    } else {
      await dispatch(unfollow({ id: id, userId: userId?.result?._id }));
    }
    setFollowed(!followed);
  };

  return (
    <div className="container mt-5">
      <img
        src={`${
          user?.user?.googleId
            ? user?.user?.pic
            : `http://localhost:5000/uploads/${user?.user?.pic}`
        }`}
        style={{ width: "60px", borderRadius: "50%", height: 50 }}
      />
      <div>
        <span className="fw-bold">Name:</span>
        <span
          className="fw-bolder p-3 text-success"
          style={{ fontSize: "20px" }}
        >
          {user?.user?.name}
        </span>
      </div>
      <div>
        <span className="fw-bold">Email Address:</span>
        <span
          className="fw-bolder p-3 text-success"
          style={{ fontSize: "20px" }}
        >
          {user?.user?.email}
        </span>
      </div>
      {user?.user?.mobileNumber && (
        <>
          <span className="fw-bold">Mobile Number:</span>
          <span
            className="fw-bolder p-3 text-success"
            style={{ fontSize: "20px" }}
          >
            {user?.user?.mobileNumber}
          </span>
        </>
      )}

      {userId && (
        <button
          onClick={handleClick}
          style={{ width: "90px", marginLeft: "90%" }}
          className="btn btn-primary shadow-none"
        >
          {followed ? "Unfollow" : "Follow"}
        </button>
      )}
      <div className="row mt-5">
        <p
          style={{
            fontWeight: 600,
            fontSize: "20px",
            color: "red",
            textAlign: "center",
          }}
        >
          {" "}
          {user && user?.user?.name} <span>Posts</span>
        </p>

        <hr />
        {user &&
          user.posts &&
          user.posts.map((item: any) => (
            <div className="col-md-4">
              <div key={item._id}>
                <div className="card">
                  <Link to={"/posts/" + item._id}>
                    <img
                      src={`http://localhost:5000/uploads/${item.selectedFile}`}
                      className="card-img-top img-fluid"
                      style={{ height: 250 }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserProfile;
