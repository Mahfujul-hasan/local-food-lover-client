import React, { use } from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/logo.png";
import { AuthContext } from "../AuthContext/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdAddCircleOutline, MdReviews } from "react-icons/md";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const links = (
    <>
      <li className="font-bold text-lg text-primary">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="font-bold text-lg text-primary">
        <NavLink to="/all-reviews">All reviews</NavLink>
      </li>
      
    </>
  );

  const handleSignOut = () => {
    logOut()
      .then()
      .catch((err) => console.log(err));
  };
  return (
    <div className="nav navbar mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className=" flex items-center ">
          <img className="w-20" src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end flex gap-5">
        {user ? (
          <>
            <div className="dropdown dropdown-end z-10">
              <div tabIndex={0} role="button" className=" m-1">
                <img className="rounded-full h-12 cursor-pointer border-2 border-primary" src={user.photoURL} alt="" />
              </div>
              <div
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1  w-52 p-2 shadow-sm space-y-3"
              >
                <Link
                  to="/add-review"

                  className="font-bold pb-2 border-primary border-b-2 flex gap-2 items-center hover:bg-base-200 p-2 rounded-md"
                >
                  <MdAddCircleOutline />
                  Add Review
                </Link>
                <Link
                  to="/my-reviews"
                  className="font-bold pb-2 border-primary border-b-2 flex gap-2 items-center hover:bg-base-200 p-2 rounded-md"
                >
                  <MdReviews />
                  My Review
                </Link>
                <Link
                  to="/my-favorite"
                  className="font-bold pb-2 border-primary border-b-2 flex gap-2 items-center hover:bg-base-200 p-2 rounded-md"
                >
                  <MdReviews />
                  My Favorites
                </Link>
                <Link
                  onClick={handleSignOut}
                  className="font-bold pb-2 border-primary border-b-2 flex gap-2 items-center hover:bg-base-200 p-2 rounded-md"
                >
                  <FaSignOutAlt /> Logout
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="btn button ">
              Login
            </Link>
            <Link to="/register" className="btn button ">
              Register
            </Link>
          </>
        )}
        {/*  */}
      </div>
    </div>
  );
};

export default Navbar;
