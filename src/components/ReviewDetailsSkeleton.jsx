import React from "react";

const ReviewDetailsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-xl shadow-md animate-pulse">
      {/* Food Image Skeleton */}
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-md h-64 bg-gray-300 rounded-lg"></div>
      </div>

      {/* Food Name Skeleton */}
      <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>

      {/* Rating Skeleton */}
      <div className="flex space-x-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-5 h-5 bg-gray-300 rounded-full"></div>
        ))}
      </div>

      {/* Review Text Skeleton */}
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      </div>

      {/* Restaurant Info Skeleton */}
      <div className="mb-4">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>

      {/* Creator Info Skeleton */}
      <div className="mb-4">
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>

      {/* Status and Date Skeleton */}
      <div className="flex justify-between items-center mt-6 p-4 bg-gray-100 rounded-lg">
        <div className="h-6 w-24 bg-gray-300 rounded-full"></div>
        <div className="h-4 w-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default ReviewDetailsSkeleton;
