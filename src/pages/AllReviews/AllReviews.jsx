import React, { useState } from "react";
import ReviewCard from "../../components/ReviewCard";
import Spinner from "../../components/Spinner";
import NotFound from "../../components/NotFound";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "", rating: "" });
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(8); // reviews per page

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["reviews", search, filters, sort, page],
    queryFn: async () => {
      const params = {
        foodName: search || undefined,
        category: filters.category || undefined,
        rating: filters.rating || undefined,
        sort: sort || undefined,
        page,
        limit,
      };
      const res = await axiosSecure.get("/reviews/all", { params });
      return res.data;
    },
    keepPreviousData: true, // keeps old data while fetching new
  });

  const reviews = data?.reviews || [];
  const totalPages = data?.totalPages || 1;

  // Handlers
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
    setSearch(value);
    setPage(1);
    // refetch();
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
    refetch();
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
    refetch();
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    refetch();
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-10/12 mx-auto pt-10">
      <h1 className="text-4xl font-bold text-center text-primary mb-10">
        All Reviews
      </h1>

      {/* Search */}
      <form
        onSubmit={handleSearchSubmit}
        className="my-5 flex justify-center items-stretch gap-0"
      >
        <input
          type="text"
          name="search"
          placeholder="Search by Food Name"
          className="h-11 px-4 border border-primary rounded-l-md 
               focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          type="submit"
          className="h-11 px-6 bg-primary text-white font-semibold 
               rounded-r-md hover:bg-primary/90 transition"
        >
          Search
        </button>
      </form>

      {/* Filters & Sorting */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-5">
        <select
          name="rating"
          value={filters.rating}
          onChange={handleFilterChange}
          className="px-4 py-2 outline-2 outline-primary"
        >
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars & Up</option>
          <option value="3">3 Stars & Up</option>
        </select>

        <select
          value={sort}
          onChange={handleSortChange}
          className="px-4 py-2 outline-2 outline-primary"
        >
          <option value="">Sort By</option>
          <option value="date_desc">Newest First</option>
          <option value="date_asc">Oldest First</option>
          <option value="rating_desc">Rating High to Low</option>
          <option value="rating_asc">Rating Low to High</option>
        </select>
      </div>

      {/* Reviews */}
      {reviews.length < 1 ? (
        <NotFound />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center gap-2">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {/* Previous */}
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-md border text-sm font-medium 
                 hover:bg-primary hover:text-white
                 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>

          {/* Page Info */}
          <span className="px-4 py-2 text-sm font-semibold bg-gray-100 rounded-md">
            Page {page} of {totalPages}
          </span>

          {/* Next */}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-md border text-sm font-medium 
                 hover:bg-primary hover:text-white
                 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default AllReviews;
