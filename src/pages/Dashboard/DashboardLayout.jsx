import { Link, Outlet } from "react-router";
import Logo from "../../assets/logo.png";
import { IoHome, IoHeart } from "react-icons/io5";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { MdRateReview } from "react-icons/md";

import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DashboardLayout = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: loginUser } = useQuery({
    queryKey: ["users", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="user-dashboard" type="checkbox" className="drawer-toggle" />

      {/* CONTENT */}
      <div className="drawer-content">
        {/* NAVBAR */}
        <nav className="navbar bg-white rounded-2xl shadow-md my-3 px-4">
          <div className="navbar-start">
            <label
              htmlFor="user-dashboard"
              className="btn btn-square btn-ghost lg:hidden"
            >
              <AiOutlineMenuUnfold size={22} />
            </label>
            <h2 className="text-xl font-bold text-primary">
              User Dashboard
            </h2>
          </div>

          {loginUser && (
            <div className="navbar-end">
              <img
                src={loginUser.photoURL}
                alt="User"
                className="w-12 h-12 rounded-full border-2 border-primary p-0.5"
              />
            </div>
          )}
        </nav>

        {/* PAGE CONTENT */}
        <Outlet />
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="user-dashboard" className="drawer-overlay"></label>

        <div className="flex min-h-full w-64 flex-col bg-white rounded-2xl shadow-lg mx-3">
          <ul className="menu p-4 gap-2">

            {/* LOGO */}
            <li className="mb-6">
              <div className="flex justify-center">
                <img src={Logo} alt="Logo" className="w-32" />
              </div>
            </li>

            {/* HOME */}
            <li>
              <Link to="/" className="font-semibold text-primary">
                <IoHome size={18} />
                Homepage
              </Link>
            </li>

            {/* MY PROFILE */}
            <li>
              <Link
                to="/dashboard/my-profile"
                className="font-semibold text-primary"
              >
                <BsFillPersonFill size={18} />
                My Profile
              </Link>
            </li>

            {/* MY REVIEWS */}
            <li>
              <Link
                to="/dashboard/my-reviews"
                className="font-semibold text-primary"
              >
                <MdRateReview size={18} />
                My Reviews
              </Link>
            </li>

            {/* MY FAVORITES */}
            <li>
              <Link
                to="/dashboard/my-favorites"
                className="font-semibold text-primary"
              >
                <IoHeart size={18} />
                My Favorites
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
