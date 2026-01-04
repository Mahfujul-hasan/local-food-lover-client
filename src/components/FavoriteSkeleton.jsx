import React from "react";

const FavoriteSkeleton = ({ rows = 5 }) => {
  return (
    <div className="overflow-x-auto bg-white p-5 rounded-lg shadow">
      <table className="table w-full">
        <thead>
          <tr>
            <th className="animate-pulse bg-gray-200 h-6 w-20 rounded"></th>
            <th className="animate-pulse bg-gray-200 h-6 w-32 rounded"></th>
            <th className="animate-pulse bg-gray-200 h-6 w-32 rounded"></th>
            <th className="animate-pulse bg-gray-200 h-6 w-24 rounded"></th>
            <th className="animate-pulse bg-gray-200 h-6 w-24 rounded"></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, idx) => (
            <tr key={idx} className="animate-pulse">
              <td>
                <div className="h-16 w-16 bg-gray-200 rounded mask mask-squircle"></div>
              </td>
              <td>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </td>
              <td>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </td>
              <td>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </td>
              <td>
                <div className="h-6 w-20 bg-gray-200 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FavoriteSkeleton;
