import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Google from "./Google";
import { registerValidation } from "../validations/RegisterValidation";

function Signin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const registerUser = async (event) => {
    event.preventDefault();

    try {
      await registerValidation.validate(
        { name, email, password, phone },
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
      const response = await axios.post("http://localhost:5001/api/register", {
        name,
        email,
        password,
        phone,
      });
      alert("Registration successful");
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
    } catch (error) {
      if (error.response) {
        alert("Registration failed: " + error.response.data.message);
      } else {
        alert("Registration failed: " + error.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="bg-fixed bg-cover bg-center min-h-screen flex justify-center items-center"
        style={{ backgroundImage: `url('/images/signinbg.jpg')` }} // Add your background image here
      >
        <div className="bg-black bg-opacity-50 shadow-lg rounded-lg overflow-hidden w-full max-w-md p-8 mt-10">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-center text-white">
              Sign Up
            </h2>
          </div>
          <form onSubmit={registerUser}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold text-white">
                Username
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:ring-orange-500 focus:border-orange-500"
                placeholder="Your name"
              />
              {errors.name && (
                <div className="text-red-500 text-sm mt-2">{errors.name}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-white">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:ring-orange-500 focus:border-orange-500"
                placeholder="abc@gmail.com"
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
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:ring-orange-500 focus:border-orange-500"
                placeholder="*****"
              />
              {errors.password && (
                <div className="text-red-500 text-sm mt-2">{errors.password}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-semibold text-white">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white focus:ring-orange-500 focus:border-orange-500"
                placeholder="9999999999"
              />
              {errors.phone && (
                <div className="text-red-500 text-sm mt-2">{errors.phone}</div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-orange-600 transition"
              >
                Sign Up
              </button>
              <Google />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signin;
