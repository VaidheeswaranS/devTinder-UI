import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, showButtons }) => {
  const dispatcher = useDispatch();
  const { _id, firstName, lastName, age, gender, about, skills, photoUrl } =
    user;
  const genderLetter = gender === "male" ? "M" : "F";

  const handleSendRequest = async (status, id) => {
    // sending the "interested" or "ignored" request to the backend
    await axios.post(
      BASE_URL + "/request/send/" + status + "/" + id,
      {},
      { withCredentials: true }
    );

    // once "interested" or "ignored" dispatching an action to remove the profile from the feed page
    dispatcher(removeUserFromFeed(id));
  };

  return (
    <div className="relative w-80 h-[800px] bg-white rounded-2xl shadow-lg overflow-hidden mr-5 mb-5">
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

        {showButtons && (
          <div className="flex justify-center space-x-6">
            <button
              className="w-full h-14 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer"
              onClick={() => {
                handleSendRequest("ignored", _id);
              }}
            >
              Ignore
            </button>

            <button
              className="w-full h-14 rounded-full bg-pink-500 hover:bg-pink-600 transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer"
              onClick={() => {
                handleSendRequest("interested", _id);
              }}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
