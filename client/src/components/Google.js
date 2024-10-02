import React, { useState, useContext } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { app } from "../firebase";
import { UserContext } from "../Usercontext";

export default function Google() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      //   console.log(result.user.displayName);
      console.log(result);
      const response = await fetch("http://localhost:5001/api/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          phone: 0,
          photo: result.user.photoURL,
        }),
        credentials: "include",
      });

      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
        // alert("Login successful");
        setRedirect(true);
      } else {
        alert("Login Failed");
      }

      //   const data = await res.json();
      navigate("/dashboard");
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };

  // if (redirect) {
  //   return <Navigate to={user ? "/dashboard" : "/login"} />;
  // }

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      // className="btn btn-danger"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 16px",
        borderRadius: "4px",
        border: "none",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        cursor: "pointer",
        backgroundColor:"white",
        color: "black",
        fontWeight: "bold",
        fontSize: "14px",
      }}
    >
      <img
        src="images/googlelogo.png"
        alt="Google logo"
        style={{ width: "20px", marginRight: "10px" }}
      />
      <span>Continue with Google</span>
    </button>
  );
}
