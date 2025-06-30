import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAdmin from "../../../Hooks/useAdmin";
import { LogOut, LayoutDashboard, UserRound } from "lucide-react";

const Navbar = ({ scrollToReview }) => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();

  const handleLogout = () => {
    logOut().catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li>
        <Link to="/" className="text-yellow-500 hover:text-black">
          Home
        </Link>
      </li>
      <li>
        <Link to="/BioData" className="text-yellow-500 hover:text-black">
          Bio Data
        </Link>
      </li>
      <li>
        <button
          onClick={() => window.dispatchEvent(new Event("scrollToReview"))}
          className="text-yellow-500 hover:text-black"
        >
          Customer Review
        </button>
      </li>
      {user && !isAdmin && (
        <li>
          <Link to="/addreview" className="text-yellow-500 hover:text-black">
            Share Your Experience
          </Link>
        </li>
      )}
      {user && isAdmin && (
        <li>
          <Link to="/adminreview" className="text-yellow-500 hover:text-black">
            User Complain
          </Link>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar py-4 px-8 max-w-screen-xl mx-auto sticky top-0 z-50 backdrop-blur shadow-md">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-lg mt-3 w-52 p-4 shadow-lg z-50"
          >
            {navOptions}
          </ul>
        </div>
        <>
          {/* Fancy Cursive Font Style */}
          <style>
            {`
      @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

      .knot-logo {
        font-family: 'Great Vibes', cursive;
        font-size: 2.25rem;
        color: #facc15; /* Tailwind's yellow-500 */
        font-weight: normal;
        letter-spacing: 1px;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.15);
        transition: transform 0.3s ease;
      }

      .knot-logo:hover {
        transform: scale(1.05);
      }
    `}
          </style>
          <Link to="/" className="knot-logo">
            KnotNest
          </Link>
        </>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>

      {/* Navbar End - Profile Dropdown */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform duration-200"
            >
              <div className="w-10 rounded-full ring ring-yellow-400 ring-offset-base-100 ring-offset-2">
                <img
                  src={user?.photoURL || "https://i.ibb.co/2nFjZfm/user.png"}
                  alt="user avatar"
                />
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] p-4 shadow-xl menu menu-sm dropdown-content rounded-xl w-64 bg-white/40 backdrop-blur border border-yellow-100 transition-all duration-300"
            >
              <div className="flex flex-col items-center gap-2 text-center mb-3">
                <img
                  src={user?.photoURL || "https://i.ibb.co/2nFjZfm/user.png"}
                  alt="profile"
                  className="w-16 h-16 rounded-full border-2 border-yellow-400"
                />
                <span className="text-sm font-semibold text-yellow-700">
                  {user?.displayName}
                </span>
                <span className="text-xs text-gray-600">{user?.email}</span>
              </div>
              <div className="divider my-1"></div>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    to={
                      isAdmin ? "/dashboard/adminDashboard" : "/dashboard/user"
                    }
                    className="flex items-center gap-2 text-sm text-yellow-600 hover:text-yellow-800 transition-colors"
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn btn-ghost text-yellow-500 hover:text-black"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
