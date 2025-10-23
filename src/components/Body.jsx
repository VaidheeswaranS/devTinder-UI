import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  // fetching the profile of the user to check if he is logged in or not
  const fetchUser = async () => {
    try {
      const userProfile = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      // adding the user details to the redux store if he is logged in
      dispatch(addUser(userProfile.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err.message);
    }
  };

  useEffect(() => {
    // this will check if userData is present in store it will not make an API call - this is called "MEMOIZATION"
    !user && fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
