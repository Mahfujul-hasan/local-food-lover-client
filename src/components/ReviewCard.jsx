import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoRestaurant } from "react-icons/io5";
import useAuth from "../hook/useAuth";
import { GrFavorite } from "react-icons/gr";
import useAxios from "../hook/useAxios";

const ReviewCard = ({ review }) => {
  const { loading, user } = useAuth();
  const axiosInstance = useAxios()
  const [myFavorite, setMyFavorite]=useState([]);
  const [favorited, setfavorited]=useState(myFavorite.some(fav=>fav.review_id.toString() === review._id.toString()))
  

  const handleFavorite = () => {
    if(favorited){
      return;
    }
    const favorite={
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
      created_at: new Date()

    }
    setfavorited(true);
    axiosInstance.post('/favorite',favorite).then()
  };

  useEffect(() => {
    axiosInstance.get("/favorite").then((data) => {
      setMyFavorite(data.data)
    });
  }, [axiosInstance]);

  const isfavorite=myFavorite.some(fav=>fav.review_id.toString() === review._id.toString())
  
  if (loading) {
    return <h3>loading...</h3>;
  }
  return (
    <div className="card bg-base-100 shadow-sm">
      <figure className="p-3  ">
        <img
          src={review.foodImageUrl}
          alt="Shoes"
          className="rounded-xl h-[250px] w-full"
        />
      </figure>
      <div className="card-body ">
        <div className="flex justify-between items-center">
          <h2 className="card-title text-xl text-primary font-bold">
            {review.foodName}
          </h2>
          <span onClick={()=>{handleFavorite()}}>
            <GrFavorite className={`cursor-pointer ${favorited || isfavorite ? "text-red-500":""}`}/>
          </span>
        </div>
        <p className="flex items-center gap-1 text-base font-medium">
          <CgProfile />
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
