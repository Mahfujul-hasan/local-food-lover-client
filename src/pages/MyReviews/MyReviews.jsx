import React, { useEffect, useState } from "react";
import useAxios from "../../hook/useAxios";
import useAuth from "../../hook/useAuth";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";

const MyReviews = () => {
  const axiosInstance = useAxios();
  const { user, loading } = useAuth();
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/reviews?email=${user?.email}`)
      .then((data) => setMyReviews(data.data));
  }, [axiosInstance, user]);

  const handleDeleteReview = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/reviews/${id}`).then(() => {
            const existingReviews =myReviews.filter(review=>review._id !== id)
            setMyReviews(existingReviews)
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        });
      }
    });
  };

  if (loading) {
    return <Spinner/>;
  }
  console.log(myReviews);
  return (
    <div className="mx-auto max-w-10/12 pt-10">
      <h3 className="text-3xl font-bold text-center text-primary mb-5">
        My Reviews
      </h3>
      <div>
        <div className="overflow-x-auto bg-white p-5 rounded-lg">
          <table className="table">
            {/* head */}
            <thead className="">
              <tr>
                <th>Food Image</th>
                <th>Food Name</th>
                <th>Restaurant Name</th>
                <th>Posted Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myReviews.map((review) => {
                return (
                  <tr>
                    <th>
                      <img
                        className="h-15 w-15 mask mask-squircle"
                        src={review.foodImageUrl}
                        alt=""
                      />
                    </th>
                    <td className="font-bold">{review.foodName}</td>
                    <td className="font-bold"> {review.restaurantName} </td>
                    <td>{new Date(review.created_at).toLocaleDateString()}</td>
                    <th className="space-x-3">
                      <Link
                        to={`/my-review/${review._id}`}
                        className="btn btn-outline btn-accent btn-xs text-sm px-3"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          handleDeleteReview(review._id);
                        }}
                        className="btn btn-outline btn-error btn-xs text-sm px-3"
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyReviews;
