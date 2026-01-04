import NotFound from "../../components/NotFound";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import FavoriteSkeleton from "../../components/FavoriteSkeleton";

const MyFavorite = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: myFavorites = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myFavorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorite?email=${user.email}`);
      return res.data;
    },
  });

  const handleDeleteFavorite = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/favorite/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your favorite has been removed.",
          icon: "success",
        });
        queryClient.invalidateQueries(["myFavorites", user?.email]);
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "Failed to delete favorite. Try again.",
          icon: "error",
        });
        console.error(err);
      }
    }
  };

  if (loading || isLoading) {
    return <FavoriteSkeleton rows={5} />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load favorites: {error.message}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl pt-10 px-5 md:px-10 lg:px-20">
      <h3 className="text-3xl font-bold text-center text-primary mb-5">
        My Favorites
      </h3>

      <div className="overflow-x-auto bg-white p-5 rounded-lg shadow">
        {myFavorites.length < 1 ? (
          <NotFound message="You have no favorites yet." />
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Food Image</th>
                <th>Food Name</th>
                <th>Restaurant Name</th>
                <th>Posted Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myFavorites.map((review) => (
                <tr key={review._id}>
                  <td>
                    <img
                      className="h-16 w-16 mask mask-squircle object-cover"
                      src={review.foodImageUrl}
                      alt={review.foodName}
                    />
                  </td>
                  <td className="font-medium">{review.foodName}</td>
                  <td className="font-medium">{review.restaurantName}</td>
                  <td>{new Date(review.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteFavorite(review._id)}
                      className="btn btn-outline btn-error btn-xs text-sm px-3"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyFavorite;
