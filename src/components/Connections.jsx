import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { Link } from "react-router-dom";
import SecondaryUserCard from "./SecondaryUserCard";

const Connections = () => {
  const [error, setError] = useState(null);

  const connectionsData = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      // getting the connections data from the DB
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      //updating the connections data in the redux store
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  useEffect(() => {
    connectionsData.length === 0 && fetchConnections();
  }, []);

  if (connectionsData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Time to light up your profile!
        </h2>
        <p className="text-base text-white leading-relaxed">
          A great connection starts with a great profile.{" "}
          <Link
            to="/"
            className="btn btn-link text-secondary no-underline px-1 py-1"
          >
            Tap here
          </Link>{" "}
          to connect to the people around the world!
        </p>
      </div>
    );
  } else {
    return (
      <div className="ml-5 flex flex-wrap my-16">
        {connectionsData.map((feed) => (
          <SecondaryUserCard key={feed._id} user={feed} />
        ))}
      </div>
    );
  }
};

export default Connections;
