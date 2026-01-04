import { useEffect } from "react";
import { useForm } from "react-hook-form";
import addContestImg from "../../assets/traditional_food.jpg";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useParams, useNavigate } from "react-router";
import Spinner from "../../components/Spinner";

const UpdateReview = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch current review
  const { data: review, isLoading } = useQuery({
    queryKey: ["review", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Pre-fill form when review loads
  useEffect(() => {
    if (review) {
      setValue("foodName", review.foodName);
      setValue("restaurantName", review.restaurantName);
      setValue("restaurantLocation", review.restaurantLocation);
      setValue("description", review.foodReview);
      setValue("rating", review.rating);
    }
  }, [review, setValue]);

  if (loading || isLoading) return <Spinner />;

  const handleReviewSubmit = async (data) => {
    let foodImageUrl = review.foodImageUrl;

    // If user uploads a new image, upload to imgbb
    if (data.foodImage?.[0]) {
      const formData = new FormData();
      formData.append("image", data.foodImage[0]);
      const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`;
      const res = await axios.post(url, formData);
      foodImageUrl = res.data.data.image.url;
    }

    const updatedReview = {
      foodName: data.foodName,
      foodImageUrl,
      foodReview: data.description,
      restaurantName: data.restaurantName,
      restaurantLocation: data.restaurantLocation,
      rating: data.rating,
      creatorId: user._id,
      creatorName: user.displayName,
      creatorEmail: user.email,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      await axiosSecure.patch(`/reviews/${id}`, updatedReview);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your review has been updated successfully!",
        showConfirmButton: false,
        timer: 1500,
        color: "orange",
      });
      navigate("/my-reviews");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-5 md:px-10 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center shadow-md border-2 border-gray-50 rounded-3xl">
        {/* Left Image */}
        <div className="hidden md:flex lg:flex h-full">
          <img
            src={addContestImg}
            alt="Food"
            className="rounded-l-3xl h-full w-full object-cover"
          />
        </div>

        {/* Form */}
        <div className="rounded-r-3xl p-5 bg-white">
          <h1 className="text-4xl font-extrabold text-center p-5 text-primary">
            Update Your Review
          </h1>
          <form onSubmit={handleSubmit(handleReviewSubmit)}>
            <fieldset className="fieldset space-y-3">
              {/* Creator Info */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="label">Your Name</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={user.displayName}
                    readOnly
                  />
                </div>
                <div>
                  <label className="label">Your Email</label>
                  <input
                    type="email"
                    className="input w-full"
                    value={user.email}
                    readOnly
                  />
                </div>
              </div>

              {/* Food Name & Image */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="label">Food Name</label>
                  <input
                    type="text"
                    className="input w-full"
                    {...register("foodName", { required: "Food Name is required" })}
                  />
                  {errors.foodName && (
                    <p className="text-red-500">{errors.foodName.message}</p>
                  )}
                </div>
                <div>
                  <label className="label">Food Image (Optional)</label>
                  <input
                    type="file"
                    className="file-input file-input-ghost w-full"
                    {...register("foodImage")}
                  />
                </div>
              </div>

              {/* Restaurant Info */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="label">Restaurant Name</label>
                  <input
                    type="text"
                    className="input w-full"
                    {...register("restaurantName", {
                      required: "Restaurant Name is required",
                    })}
                  />
                  {errors.restaurantName && (
                    <p className="text-red-500">{errors.restaurantName.message}</p>
                  )}
                </div>
                <div>
                  <label className="label">Restaurant Location</label>
                  <input
                    type="text"
                    className="input w-full"
                    {...register("restaurantLocation", {
                      required: "Restaurant Location is required",
                    })}
                  />
                  {errors.restaurantLocation && (
                    <p className="text-red-500">{errors.restaurantLocation.message}</p>
                  )}
                </div>
              </div>

              {/* Rating */}
              <label className="label">
                <span className="label-text font-semibold">Your Rating</span>
              </label>
              <div className="rating rating-lg">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    value={star}
                    {...register("rating", { required: "Rating is required" })}
                    className="mask mask-star-2 bg-yellow-400"
                  />
                ))}
              </div>
              {errors.rating && (
                <p className="text-red-500">{errors.rating.message}</p>
              )}

              {/* Food Review */}
              <div>
                <label className="label">Food Review</label>
                <textarea
                  className="textarea w-full"
                  {...register("description", {
                    required: "Food review is required",
                  })}
                />
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>

              <button className="btn btn-primary text-white text-lg rounded w-full mt-3">
                Update Review
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateReview;
