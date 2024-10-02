import React, { useContext } from "react";
import { UserContext } from "../Usercontext";
import Navbar from "./Navbar";

const ViewProfile = () => {
  const { user } = useContext(UserContext);

  return (
    <>    
    <div className="profile-container">
      <Navbar/>
      {user ? (
        <div className="profile">
          <h1>Profile</h1>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <img src={user.avatar} alt="Avatar" className="avatar" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </>
  );
};

export default ViewProfile;
