import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaStar } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hook/useAxiosSecure";
import ReviewDetailsSkeleton from "../../components/ReviewDetailsSkeleton";
import Swal from "sweetalert2";
import useAuth from "../../hook/useAuth";
import { GrFavorite } from "react-icons/gr";
import { IoLocationOutline, IoRestaurantOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMailOutline } from "react-icons/md";
import { SlCalender } from "react-icons/sl";

const ReviewDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: review, isLoading } = useQuery({
    queryKey: ["review", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      const data = res.data;
      return data;
    },
  });

  const handleFavorite = () => {
     if (!user) {
    navigate("/login", { state: { from: location } }); 
    return;
  }
    const favorite = {
      review_id: review._id,
      foodName: review.foodName,
      foodImageUrl: review.foodImageUrl,
      restaurantName: review.restaurantName,
      restaurantLocation: review.restaurantLocation,
      rating: review.rating,
      foodReview: review.foodReview,
      Created_by: review.Created_by,
      creator: review.creator,
      favorite_by: user.email,
      created_at: new Date(),
    };

    axiosSecure.post("/favorite", favorite).then(() => {
      Swal.fire(
        "Added!",
        "This review has been added to your favorites.",
        "success"
      );
    });
  };
  if (isLoading) {
    return <ReviewDetailsSkeleton />;
  }

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`h-5 w-5 ${
          i < review.rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 my-10 bg-white">
      {/* Food Image */}
      <div className="flex justify-center mb-6">
        <img
          src={review.foodImageUrl}
          alt={review.foodName}
          className="w-full max-w-md rounded-lg object-cover shadow-md"
        />
      </div>

      {/* Food Info */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-primary">
            {review.foodName}
          </h1>
          <div className="flex items-center"><span className="mr-2">Rating:</span>{renderStars()}</div>
          <p className="text-gray-700 text-lg mt-4">{review.foodReview}</p>
        </div>
        {/* Favorite Button */}
        <div>
          <button
            onClick={handleFavorite}
            className="text-red-500 hover:text-red-600 transition-colors text-2xl"
            title="Add to Favorites"
          >
            <GrFavorite />
          </button>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
        <h2 className="text-xl font-semibold mb-1">Restaurant Info</h2>
        <p className="text-gray-700 flex items-center gap-3"><IoRestaurantOutline />{review.restaurantName}</p>
        <p className="text-gray-500 flex items-center gap-3"><IoLocationOutline />{review.restaurantLocation}</p>
      </div>

      {/* Creator Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
        <h2 className="text-xl font-semibold mb-1">Reviewed By</h2>
        <p className="text-gray-700 flex items-center gap-3"><CgProfile />{review.creatorName}</p>
        <p className="text-gray-500 flex items-center gap-3"><MdOutlineMailOutline />{review.creatorEmail}</p>
      </div>

      {/* Metadata */}
      <div className="flex gap-3 items-center mt-6 p-4 bg-gray-100 rounded-lg text-gray-600"><SlCalender />
        <span>Posted: {new Date(review.created_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default ReviewDetails;
