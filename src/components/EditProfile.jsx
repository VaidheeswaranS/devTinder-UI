import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ data }) => {
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [age, setAge] = useState(data.age);
  const [gender, setGender] = useState(data.gender);
  const [about, setAbout] = useState(data.about);
  const [photoUrl, setPhotoUrl] = useState(data.photoUrl);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const handleSaveProfile = async () => {
    try {
      const profileData = {
        firstName,
        lastName,
        age,
        gender,
        about,
        photoUrl,
      };

      // this updates the profile with new data
      const res = await axios.patch(BASE_URL + "/profile/edit", profileData, {
        withCredentials: true,
      });

      // updating the user slice in redux store with new data
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  return (
    data && (
      <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-[420px] shadow-xl mx-10">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl mb-3">
              Edit Profile
            </h2>

            <label className="firstName form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text mb-1">First Name</span>
              </div>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full max-w-xs mb-3 px-3"
                onChange={(event) => setFirstName(event.target.value)}
              />
            </label>

            <label className="lastName form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text mb-1">Last Name</span>
              </div>
              <input
                type="text"
                value={lastName}
                className="input input-bordered w-full max-w-xs mb-3 px-3"
                onChange={(event) => setLastName(event.target.value)}
              />
            </label>

            <label className="age form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text mb-1">Age</span>
              </div>
              <input
                type="number"
                value={age}
                className="input input-bordered w-full max-w-xs mb-3 px-3"
                onChange={(event) => setAge(event.target.value)}
              />
            </label>

            <label className="gender form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text mb-1">Gender</span>
              </div>
              <select
                name="gender"
                id="choose-a-gender"
                className="input input-bordered w-full max-w-xs mb-3 px-3"
                onChange={(event) => setGender(event.target.value)}
              >
                <option value={gender}>
                  {gender !== "" ? gender : "Select your gender"}
                </option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </label>

            <label className="photo form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text mb-1">Photo</span>
              </div>
              <input
                type="text"
                value={photoUrl}
                className="input input-bordered w-full max-w-xs mb-3 px-3"
                onChange={(event) => setPhotoUrl(event.target.value)}
              />
            </label>

            <label className="about form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text mb-1">About</span>
              </div>
              <fieldset className="fieldset">
                <textarea
                  className="textarea h-24 px-3 py-3 textarea-md"
                  onChange={(event) => setAbout(event.target.value)}
                  value={about}
                >
                  {about}
                </textarea>
              </fieldset>
            </label>

            <div className="text-red-500">{error}</div>

            <div className="card-actions justify-center m-2">
              <button
                className="btn btn-primary px-10 py-2 bg-violet-500 text-lg"
                onClick={handleSaveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="mb-2">
            This is how your profile will look to others !!!
          </p>
          <div>
            <UserCard
              user={{ firstName, lastName, age, gender, about, photoUrl }}
              showButtons={false}
            />
          </div>
        </div>
        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile updated successfully !!</span>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default EditProfile;
