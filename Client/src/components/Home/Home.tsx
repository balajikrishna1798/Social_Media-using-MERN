import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import Posts from "../Posts/Posts";
import { getPosts } from "../../features/postSlice";
import RightBar from "../RightBar/RightBar";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../NavBar/NavBar";

function Home({ setCurrentId }) {
  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="offset-md-3 col-md-6 mb-5">
          {user ? (
            <Posts setCurrentId={setCurrentId} />
          ) : (
            <h1 className="text-danger" style={{ marginTop: "40%" }}>
              <span>
                <Link to="/auth">Login</Link>{" "}
              </span>
              or{" "}
              <span>
                <Link to="/register">Register</Link>
              </span>{" "}
              to continue!!!
            </h1>
          )}
        </div>
        <div
          className="col-md-2 mt-5 position-fixed"
          style={{ marginLeft: "100px" }}
        >
          {user && <RightBar />}
        </div>
      </div>
    </div>
  );
}

export default Home;
