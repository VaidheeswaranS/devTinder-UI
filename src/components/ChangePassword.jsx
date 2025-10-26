import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [emailId, setEmailId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePasswordChange = async () => {
    try {
      await axios.patch(
        BASE_URL + "/profile/forgotPassword",
        { emailId, newPassword },
        { withCredentials: true }
      );

      // clearing the user info in the redux store once password changed
      dispatch(removeUser());

      // navigating the user back to login page
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mb-3">
            Change Password
          </h2>
          <div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text mb-1">Email ID</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs mb-3 px-3"
                onChange={(e) => setEmailId(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handlePasswordChange();
                  }
                }}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text mb-1">New Password</span>
              </div>
              <input
                type="password"
                value={newPassword}
                className="input input-bordered w-full max-w-xs mb-3 px-3"
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handlePasswordChange();
                  }
                }}
              />
            </label>
            <div className="text-red-500">{error}</div>
          </div>
          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary px-10 py-2 bg-base-100 text-lg"
              onClick={() => {
                handlePasswordChange();
              }}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
