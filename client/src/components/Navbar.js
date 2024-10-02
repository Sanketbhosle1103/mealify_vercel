import { Link } from "react-router-dom";
import { UserContext } from "../Usercontext";
import axios from "axios";
import React, { useContext, useState } from "react";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5001/api/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const Button = ({ children, onClick }) => (
    <button
      onClick={onClick}
      className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-md transition duration-300 shadow-lg"
    >
      {children}
    </button>
  );

  return (
    <>
      <div className="bg-black/90 py-3 fixed top-0 z-50 w-full shadow-md">
        {/* Mobile Menu */}
        <div className="flex items-center justify-between mx-4 sm:mx-8 lg:hidden">
          <Link to="/">
            <h2 className="text-white text-2xl font-bold">Mealify</h2>
          </Link>
          <div className="mx-4">
            {mobileMenu ? (
              <button onClick={() => setMobileMenu(false)} className="text-white text-2xl">
                ✖
              </button>
            ) : (
              <button onClick={() => setMobileMenu(true)} className="text-white text-2xl">
                ≡
              </button>
            )}
          </div>
          {mobileMenu && (
            <ul className="absolute bg-white w-full left-0 top-16 px-2 pb-4 rounded-b-md shadow-md">
              {user ? (
                <>
                  <Link to="/dashboard" className="block px-4 py-2 text-black hover:text-orange-600 text-lg">
                    <li>Dashboard</li>
                  </Link>
                  <li className="block px-4 py-2">
                    <Button onClick={handleLogout}>Log Out</Button>
                  </li>
                </>
              ) : (
                <>
                  <li className="block px-4 py-2">
                    <Link to="/login">
                      <Button>Log In</Button>
                    </Link>
                  </li>
                  <li className="block px-4 py-2">
                    <Link to="/register">
                      <Button>Sign Up</Button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between mx-12">
            <Link to="/">
              <h2 className="text-orange-500 text-3xl font-bold">Mealify</h2>
            </Link>
            <ul className="flex items-center space-x-8">
              {user ? (
                <>
                  <Link to="/dashboard" className="text-white hover:text-orange-600 text-lg transition">
                    <li>Dashboard</li>
                  </Link>
                  <li>
                    <Button onClick={handleLogout}>Log Out</Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">
                      <Button>Log In</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">
                      <Button>Sign Up</Button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
