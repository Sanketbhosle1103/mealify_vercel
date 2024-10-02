import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black/90 text-white py-8 mt-12">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="mb-6">
            <h4 className="text-orange-500 text-xl font-bold mb-4">About Mealify</h4>
            <p className="text-gray-300">
              Mealify is your personal nutrition and diet planning assistant. Tailored meal plans, recipe suggestions, and progress tracking to help you achieve your health goals.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="mb-6">
            <h4 className="text-orange-500 text-xl font-bold mb-4">Quick Links</h4>
            <ul>
              <li className="mb-2">
                <Link to="/" className="text-gray-300 hover:text-orange-500">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard" className="text-gray-300 hover:text-orange-500">
                  Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/login" className="text-gray-300 hover:text-orange-500">
                  Log In
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/register" className="text-gray-300 hover:text-orange-500">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="mb-6">
            <h4 className="text-orange-500 text-xl font-bold mb-4">Follow Us</h4>
            <ul className="flex space-x-4">
              <li>
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                  <i className="fab fa-facebook text-gray-300 hover:text-orange-500 text-2xl"></i>
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                  <i className="fab fa-twitter text-gray-300 hover:text-orange-500 text-2xl"></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                  <i className="fab fa-instagram text-gray-300 hover:text-orange-500 text-2xl"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                  <i className="fab fa-linkedin text-gray-300 hover:text-orange-500 text-2xl"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Mealify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
