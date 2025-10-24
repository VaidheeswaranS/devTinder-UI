import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import {
  addConnectionRequest,
  removeConnectionRequest,
} from "../utils/connectionRequestsSlice";
import { Link } from "react-router-dom";

const ConnectionRequests = () => {
  const connectionRequestsData = useSelector(
    (store) => store.connectionRequests
  );
  const dispatcher = useDispatch();

  const handleReviewRequest = async (status, id) => {
    try {
      // sending the "accepted" or "rejected" request to the backend
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );

      // once "accepted" or "rejected" dispatch an action to remove the request from the page
      dispatcher(removeConnectionRequest(id));
    } catch (err) {
      console.error(err);
    }
  };

  const getConnectionRequests = async () => {
    try {
      // sending the request to the backend
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      // adding the request sent data to the redux store
      dispatcher(addConnectionRequest(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    connectionRequestsData.length === 0 && getConnectionRequests();
  }, []);

  if (connectionRequestsData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">No new requests!</h2>
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
        {connectionRequestsData.map((request) => {
          const {
            _id,
            firstName,
            lastName,
            age,
            gender,
            about,
            skills,
            photoUrl,
          } = request.fromUserId;

          const requestId = request._id;

          const genderLetter = gender === "male" ? "M" : "F";

          return (
            <div
              key={_id}
              className="relative w-80 h-[800px] bg-white rounded-2xl shadow-lg overflow-hidden mr-5 mb-5"
            >
              <div className="h-2/4 overflow-hidden">
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="w-full h-full object-cover"
                />
                {genderLetter === "M" ? (
                  <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-blue-500 px-3 py-1 rounded-full text-sm font-bold">
                    {genderLetter}
                  </div>
                ) : (
                  <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-pink-500 px-3 py-1 rounded-full text-sm font-bold">
                    {genderLetter}
                  </div>
                )}
              </div>

              <div className="p-6 h-1/4 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-gray-500 text-sm">{age} years old</p>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mt-2 mb-3">
                  {about}
                </p>

                {skills && skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skills.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {skills.length > 4 && (
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-medium">
                        +{skills.length - 4}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex justify-center space-x-6">
                  <button
                    className="w-full h-14 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer"
                    onClick={() => handleReviewRequest("rejected", requestId)}
                  >
                    Reject
                  </button>

                  <button
                    className="w-full h-14 rounded-full bg-pink-500 hover:bg-pink-600 transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer"
                    onClick={() => handleReviewRequest("accepted", requestId)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default ConnectionRequests;
