import { Controller, useForm } from "react-hook-form";
import addContestImg from "../../assets/traditional_food.jpg";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
const AddReview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data: currentUser } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const handleReviewSubmit = async (data) => {
    const foodImg = data.foodImage[0];
    const formData = new FormData();
    formData.append("image", foodImg);
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_KEY
    }`;
    const res = await axios.post(url, formData);
    const foodImage = res.data.data.image.url;
    const foodInfo = {
      foodName: data.foodName,
      foodImageUrl: foodImage,
      foodReview: data.description,
      restaurantName: data.restaurantName,
      restaurantLocation: data.restaurantLocation,
      rating: data.rating,
      creatorId: currentUser._id,
      creatorName: data.creatorName,
      creatorEmail: data.creatorEmail,
      status: "pending",
      createdAt: new Date(),
    };

    axiosSecure.post("/reviews", foodInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your review has been added successfull!",
          showConfirmButton: false,
          timer: 1500,
          color: "orange",
        });
        reset();
      }
    });
  };
  return (
    <div className="max-w-7xl mx-auto py-10 px-5 md:px-10 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center shadow-md border-2 border-gray-50 rounded-3xl">
        <div className="hidden md:flex lg:flex h-full">
          <img
            src={addContestImg}
            alt=""
            className="rounded-l-3xl h-full w-full"
          />
        </div>
        <div className="rounded-r-3xl p-5 bg-white">
          <h1 className="text-4xl font-extrabold text-center p-5 text-primary">
            Add your Review
          </h1>
          <form onSubmit={handleSubmit(handleReviewSubmit)}>
            <fieldset className="fieldset space-y-3">
              {/* creator information  */}
              <div className="grid grid-cols-2 gap-5">
                {/* creator name  */}
                <div>
                  <label className="label">Your Name</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Your Name"
                    defaultValue={user.displayName}
                    readOnly
                    {...register("creatorName", {
                      required: "Name is required",
                    })}
                  />
                  {errors.creatorName && (
                    <p className="text-red-500 font-bold">
                      {errors.creatorName.message}
                    </p>
                  )}
                </div>

                {/* creator email  */}
                <div>
                  <label className="label">Your Email</label>
                  <input
                    type="email"
                    className="input w-full"
                    placeholder="Your Email"
                    defaultValue={user.email}
                    readOnly
                    {...register("creatorEmail", {
                      required: "Email is required",
                    })}
                  />
                  {errors.creatorEmail && (
                    <p className="text-red-500 font-bold">
                      {errors.creatorEmail.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  {/* Food name  */}
                  <label className="label">Food Name</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Food Name"
                    {...register("foodName", {
                      required: "Food Name is required",
                    })}
                  />
                  {errors.foodName && (
                    <p className="text-red-500 font-bold">
                      {errors.foodName.message}
                    </p>
                  )}
                </div>

                <div>
                  {/* food image  */}
                  <label className="label">Food Image</label>
                  <input
                    type="file"
                    className="file-input file-input-ghost w-full"
                    {...register("foodImage", {
                      required: "Food Image is required",
                    })}
                  />
                  {errors.foodImage && (
                    <p className="text-red-500 font-bold">
                      {errors.foodImage.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  {/* restaurant name  */}
                  <label className="label">Restaurant Name</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Restaurant Name"
                    {...register("restaurantName", {
                      required: "Restaurant Name is required",
                    })}
                  />
                  {errors.restaurantName && (
                    <p className="text-red-500 font-bold">
                      {errors.restaurantName.message}
                    </p>
                  )}
                </div>
                <div>
                  {/* Restaurant location  */}
                  <label className="label">Restaurant Location</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="location"
                    {...register("restaurantLocation", {
                      required: "Food Name is required",
                    })}
                  />
                  {errors.restaurantLocation && (
                    <p className="text-red-500 font-bold">
                      {errors.restaurantLocation.message}
                    </p>
                  )}
                </div>
              </div>
              <label className="label">
                <span className="label-text font-semibold">Your Rating</span>
              </label>
              <div className="rating rating-lg">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    value={star}
                    {...register("rating", { required: true })}
                    className="mask mask-star-2 bg-yellow-400"
                  />
                ))}
              </div>

              {errors.rating && (
                <p className="text-red-500">Rating is required</p>
              )}

              <div>
                {/* Food review  */}
                <label className="label">Food Review</label>
                <textarea
                  className="textarea w-full"
                  placeholder="Add food review"
                  {...register("description", {
                    required: "food review is required",
                  })}
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 font-bold">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <button className="btn btn-primary text-white text-lg rounded">
                Add Now
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
