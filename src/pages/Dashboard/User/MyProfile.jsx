import { Link } from "react-router";
import { FiEdit } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Spinner from "../../../components/Spinner";
import useAuth from "../../../hook/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: loginUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", user?.email],
    enabled: !!user?.email, // ✅ prevents unnecessary request
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // 🔄 Loading state
  if (isLoading) return <Spinner />;

  // ❌ Error state
  if (isError || !loginUser) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold">
        Failed to load profile data.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 mt-5 p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <h3 className="text-2xl font-semibold text-primary">
          Profile Information
        </h3>

        <Link to="/dashboard/update-profile">
          <button className="flex items-center gap-2 px-5 py-2 rounded-xl 
                             bg-orange-500 hover:bg-orange-600 text-white 
                             font-semibold transition">
            <FiEdit />
            Edit Profile
          </button>
        </Link>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Avatar */}
        <div className="flex justify-center">
          <img
            src={loginUser.photoURL || "/avatar.png"}
            alt="User profile"
            className="w-52 h-52 rounded-full object-cover 
                       ring-4 ring-orange-400"
          />
        </div>

        {/* User Info */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-2xl p-6 space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                readOnly
                value={loginUser.displayName || "N/A"}
                className="w-full px-4 py-2 rounded-md bg-white border"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                readOnly
                value={loginUser.email}
                className="w-full px-4 py-2 rounded-md bg-white border"
              />
            </div>

            {/* Role (future-proof) */}
            {loginUser.role && (
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  readOnly
                  value={loginUser.role}
                  className="w-full px-4 py-2 rounded-md bg-white border"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
