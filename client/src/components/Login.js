import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Usercontext";
import Navbar from "./Navbar";
import Google from "./Google";
import { loginValidation } from "../validations/LoginValidation";

function Login() {
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const [errors, setErrors] = useState({});

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      await loginValidation.validate(
        { email, password },
        { abortEarly: false }
      );
      setErrors({});
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
        alert("Login successful");
        setRedirect(true);
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      alert("Login Failed");
    }
  };

  if (redirect) {
    return <Navigate to={user ? "/dashboard" : "/login"} />;
  }

  return (
    <>
      <Navbar />
      <div
        className="bg-fixed bg-cover bg-center min-h-screen flex justify-center items-center"
        style={{ backgroundImage: `url('/images/signinbg.jpg')` }} // Add your background image here
      >
        <div className="bg-black bg-opacity-50 shadow-lg rounded-lg overflow-hidden w-full max-w-md p-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white text-center">Login</h2>
          </div>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-white">
                Email
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:ring-orange-500 focus:border-orange-500"
                id="email"
                name="email"
                value={email}
                placeholder="abc@gmail.com"
                onChange={(event) => setEmail(event.target.value)}
              />
              {errors.email && (
                <div className="text-red-500 text-sm mt-2">{errors.email}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-semibold text-white">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:ring-orange-500 focus:border-orange-500"
                id="password"
                name="password"
                placeholder="*****"
                onChange={(event) => setPassword(event.target.value)}
              />
              {errors.password && (
                <div className="text-red-500 text-sm mt-2">{errors.password}</div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-orange-600 transition"
              >
                Login
              </button>
              <Google />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
