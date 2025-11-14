import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoRestaurant } from "react-icons/io5";
import useAuth from "../hook/useAuth";

const ReviewCard = ({ review }) => {
    const{loading}=useAuth();
    if(loading){
      return <h3>loading...</h3>
    }
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="p-3  ">
        <img
          src={review.foodImageUrl}
          alt="Shoes"
          className="rounded-xl h-[250px] w-full"
        />
      </figure>
      <div className="card-body ">
        <h2 className="card-title text-xl text-primary font-bold">{review.foodName}</h2>
        <p className="flex items-center gap-1 text-base font-medium">
                  <CgProfile
                   />
                  {review.creator}
                </p>
        <h4 className="text-base font-medium flex items-center gap-1">
          <IoRestaurant />
          {review.restaurantName}
        </h4>
        <p className="flex items-center font-medium">
          
          {review.restaurantLocation}
        </p>
        <div className="rating rating-xs mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <input
              key={star}
              type="radio"
              className={`mask mask-star-2 bg-primary `}
              readOnly
              checked={star === review.rating}
            />
          ))}
        </div>
        
        <div className="card-actions w-full">
          <button className="btn button w-full">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
