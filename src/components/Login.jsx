import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      // sending the user data to the redux store
      dispatch(addUser(res?.data?.data));

      // sending the user to the profile page after he logged in
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      // sending the userData to the redux store
      dispatch(addUser(res.data));

      // sending the user to the feed page after he logged in
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mb-3">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                {" "}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text mb-1">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs mb-3 px-3"
                    onChange={(e) => setFirstName(e.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        isLoginForm ? handleLogin() : handleSignUp();
                      }
                    }}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text mb-1">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs mb-3 px-3"
                    onChange={(e) => setLastName(e.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        isLoginForm ? handleLogin() : handleSignUp();
                      }
                    }}
                  />
                </label>
              </>
            )}
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
                    isLoginForm ? handleLogin() : handleSignUp();
                  }
                }}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text mb-1">Password</span>
              </div>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs mb-3 px-3"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    isLoginForm ? handleLogin() : handleSignUp();
                  }
                }}
              />
            </label>
            <div className="text-red-500">{error}</div>
          </div>
          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary px-10 py-2 bg-base-100 text-lg"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <div>
            {isLoginForm ? "New User, then " : "Already a User, then "}
            <span
              className="text-pink-500 cursor-pointer"
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              {isLoginForm ? "Sign up now." : "Login"}
            </span>
          </div>
          {isLoginForm && (
            <div>
              Forgot your password?{" "}
              <span
                className="text-pink-500 cursor-pointer"
                onClick={() => {
                  navigate("/changePassword");
                }}
              >
                Reset now
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
