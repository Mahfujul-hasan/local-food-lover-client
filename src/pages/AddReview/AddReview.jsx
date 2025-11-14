import React, { useState } from "react";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxios from "../../hook/useAxios";

const AddReview = () => {
  const [rating, setRating] = useState(0);
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const handleAddReview = (e) => {
    e.preventDefault();
    const foodName = e.target.foodName.value;
    const foodImageUrl = e.target.foodUrl.value;
    const restaurantName = e.target.RestaurantName.value;
    const restaurantLocation = e.target.RestaurantLocation.value;
    const foodReview = e.target.review.value;
    const created_at = new Date();
    const newReview = {
      foodName,
      foodImageUrl,
      restaurantName,
      restaurantLocation,
      rating,
      foodReview,
      Created_by: user.email,
      creator: user.displayName,
      created_at,
    };
    axiosInstance.post("/reviews", newReview).then(() => {
      Swal.fire({
        title: "Your review has been submitted successfully!",
        icon: "success",
        draggable: false,
      });
      
      navigate('/all-reviews')

    });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-2xl shrink-0 shadow-2xl p-5 mt-10">
        <h3 className=" text-center text-3xl font-bold">Create Your Review</h3>
        <div className="card-body">
          <form onSubmit={handleAddReview}>
            <fieldset className="fieldset space-y-5">
              {/* food name  */}
              <div className="flex flex-col space-y-2">
                <label className=" font-semibold text-lg">Food Name:</label>
                <input
                  type="text"
                  className="input w-full"
                  name="foodName"
                  placeholder="Food Name"
                  required
                />
              </div>
              {/* restaurant name  */}
              <div className="flex flex-col space-y-2">
                <label className=" font-semibold text-base">
                  Restaurant Name{" "}
                </label>
                <input
                  type="text"
                  className="input w-full"
                  name="RestaurantName"
                  placeholder="Add restaurant name"
                  required
                />
              </div>

              {/* restaurant location  */}
              <div className="flex flex-col space-y-2">
                <label className=" text-base font-semibold">Location </label>
                <input
                  type="text"
                  className="input w-full"
                  name="RestaurantLocation"
                  placeholder="Add restaurant location"
                  required
                />
              </div>
              {/* food url  */}
              <div className="flex flex-col space-y-2">
                <label className=" text-base font-semibold">Food Url</label>
                <input
                  type="url"
                  className="input w-full"
                  name="foodUrl"
                  placeholder="image url"
                  required
                />
              </div>

              {/* food rating  */}

              <div className="flex items-center  space-x-5">
                <label className=" text-base font-semibold">Rating:</label>
                <div className="rating rating-sm gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <input
                      key={star}
                      type="radio"
                      name="rating"
                      className="mask mask-star-2 bg-orange-400 "
                      aria-label={`${star} star`}
                      onChange={() => setRating(star)}
                      required
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-base font-semibold ">Food Review</label>
                <textarea
                  className="input h-40 w-full"
                  name="review"
                  required
                  placeholder="Add descriptive food review"
                />
              </div>

              <button className="btn btn-neutral mt-4">Submit Review</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
