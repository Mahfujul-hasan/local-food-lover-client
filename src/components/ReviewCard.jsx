import { CgProfile } from "react-icons/cg";
import { IoRestaurant } from "react-icons/io5";
import useAuth from "../hook/useAuth";
import { GrFavorite } from "react-icons/gr";

import { Link } from "react-router";

const ReviewCard = ({ review }) => {
  const { loading } = useAuth();

  if (loading) {
    return <h3>loading...</h3>;
  }
  return (
    <div className="card bg-base-100 h-full shadow-sm">
      <figure className="p-2  ">
        <img
          src={review.foodImageUrl}
          alt="Shoes"
          className="rounded-lg  h-[220px] object-cover w-full"
        />
      </figure>
      <div className=" p-2 space-y-0.5 ">
        <div className="flex justify-between items-center space-y-0.5">
          <h2 className="card-title text-xl text-primary font-bold">
            {review.foodName}
          </h2>
        </div>
        <p className="flex items-center gap-1 text-base font-medium">
          <CgProfile />
          {review.creatorName}
        </p>
        <h4 className="text-base font-medium flex items-center gap-1">
          <IoRestaurant />
          {review.restaurantName}
        </h4>
        <div className="rating rating-xs mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <input
              key={star}
              type="radio"
              className={`mask mask-star-2 bg-primary `}
              readOnly
              checked={star === parseInt(review.rating)}
            />
          ))}
        </div>

        <Link to={`/reviews/${review._id}`} className="card-actions w-full">
          <button className="btn button w-full">View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default ReviewCard;
