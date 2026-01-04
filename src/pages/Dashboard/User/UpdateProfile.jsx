import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useState } from "react";
import Spinner from "../../../components/Spinner";

const UpdateProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetch logged-in user info
  const {
    data: loginUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const handleUpdateUser = async (data) => {
    try {
      setSubmitting(true);

      let photoURL = loginUser.photoURL;

      // Upload photo only if user selected a file
      if (data.photoURL?.length > 0) {
        const file = data.photoURL[0];

        if (!file.type.startsWith("image/")) {
          Swal.fire("Error", "Please upload a valid image", "error");
          return;
        }

        const formData = new FormData();
        formData.append("image", file);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
          formData
        );
        photoURL = res.data.data.url;
      }

      const updatedInfo = {
        displayName: data.displayName,
        photoURL,
      };

      const res = await axiosSecure.patch(`/users/${user.email}`, updatedInfo);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Profile updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/my-profile");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update profile", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <Spinner />;
  if (isError || !loginUser)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load user data.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-6 md:p-10">
      <h3 className="text-2xl font-bold text-center text-primary mb-6">
        Update Profile
      </h3>

      <form
        onSubmit={handleSubmit(handleUpdateUser)}
        className="space-y-5"
        encType="multipart/form-data"
      >
        {/* Photo Upload */}
        <div>
          <label className="block font-semibold mb-1">Profile Photo</label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            {...register("photoURL")}
          />
        </div>

        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Full Name</label>
          <input
            type="text"
            defaultValue={loginUser.displayName}
            className="input input-bordered w-full"
            {...register("displayName", { required: "Name is required" })}
          />
          {errors.displayName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.displayName.message}
            </p>
          )}
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="btn bg-primary text-white w-full rounded-full"
        >
          {submitting ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
