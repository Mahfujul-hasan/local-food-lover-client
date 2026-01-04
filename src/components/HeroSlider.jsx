import React from "react";
import useAuth from "../hook/useAuth";
import { IoLocationOutline, IoRestaurant } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router";
import Spinner from "./Spinner";

const HeroSlider = ({ review }) => {
  const { loading } = useAuth();
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="slider w-full">
      <div className="h-[70vh] py-5 px-5 md:px-10 lg:px-20  max-w-7xl mx-auto  text-white flex   flex-col-reverse md:flex-row lg:flex-row md:items-center lg:items-center md:justify-between lg:justify-between gap-5">
        <div className="px-5 space-y-2.5 flex flex-col  gap-3">
          <h3 className="text-yellow-500 text-3xl lg:text-6xl font-bold">
            {review.foodName}
          </h3>
          <h4 className="text-xl lg:text-2xl font-medium lg:font-bold flex items-center gap-3">
            <IoRestaurant />
            {review.restaurantName}
          </h4>
          <p className="flex items-center gap-3 text-base font-bold">
            <CgProfile />
            {review.creatorName}
          </p>
          <p className="flex items-center gap-3 font-bold">
            <IoLocationOutline />
            {review.restaurantLocation}
          </p>
          <div className="rating rating-xs">
            {[1, 2, 3, 4, 5].map((star) => (
              <input
                key={star}
                type="radio"
                className={`mask mask-star-2 bg-yellow-300 `}
                readOnly
                checked={star === parseInt(review.rating)}
              />
            ))}
          </div>
          <Link to={`/reviews/${review._id}`}>
            <div className="btn btn-outline btn-warning font-bold">
              View details
            </div>
          </Link>
        </div>
        <div>
          <img
            className="h-[200px] lg:h-[300px] w-full  rounded-lg"
            src={review.foodImageUrl}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
