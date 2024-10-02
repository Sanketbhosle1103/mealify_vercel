import React, { useContext } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { UserContext } from "../Usercontext";

export default function Google() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
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
        navigate("/dashboard");
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 16px",
        borderRadius: "4px",
        border: "none",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        cursor: "pointer",
        backgroundColor: "white",
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
