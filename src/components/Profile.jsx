import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  // getting the user date from the redux store
  const userData = useSelector((store) => store.user);

  return (
    userData && (
      <div>
        <EditProfile data={userData} />
      </div>
    )
  );
};

export default Profile;
