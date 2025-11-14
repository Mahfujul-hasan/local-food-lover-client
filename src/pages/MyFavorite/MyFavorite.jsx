import React, { useEffect, useState } from "react";
// import useAxios from "../../hook/useAxios";
import NotFound from "../../components/NotFound";
import Swal from "sweetalert2";
import useAxios from "../../hook/useAxios";

const MyFavorite = () => {
  const axiosInstance = useAxios();

  const [myFavorites, setMyFavorites] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/favorite")
      .then((data) => setMyFavorites(data.data));
  }, [axiosInstance]);

  

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
        axiosInstance.delete(`/favorite/${id}`).then(() => {
          const existingReviews = myFavorites.filter(
            (review) => review._id !== id
          );
          setMyFavorites(existingReviews);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <div className="mx-auto max-w-10/12 pt-10">
      <h3 className="text-3xl font-bold text-center text-primary mb-5">
        My Favorites
      </h3>
      <div>
        <div className="overflow-x-auto bg-white p-5 rounded-lg">
          {myFavorites.length < 1 ? (
            <NotFound />
          ) : (
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
                {myFavorites.map((review) => {
                  return (
                    <tr key={review._id}>
                      <th>
                        <img
                          className="h-15 w-15 mask mask-squircle"
                          src={review.foodImageUrl}
                          alt=""
                        />
                      </th>
                      <td className="font-bold">{review.foodName}</td>
                      <td className="font-bold"> {review.restaurantName} </td>
                      <td>
                        {new Date(review.created_at).toLocaleDateString()}
                      </td>
                      <th className="space-x-3">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default MyFavorite;
