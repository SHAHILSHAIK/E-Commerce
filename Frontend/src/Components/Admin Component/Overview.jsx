import React from "react";

function Overview() {
  return (
    <div>
      <div className="w-full mt-20 md:w-1/5 bg-gray-900 text-white p-4 shadow-lg fixed  md:relative bottom-0 left-0 z-50 ">
        <h1 className="text-2xl font-bold text-center md:text-left">
          Admin Dashboard
        </h1>
        <h2 className="text-lg text-gray-300 text-center md:text-left mt-2">
          Products Overview
        </h2>
        <ul className="mt-4 flex md:block overflow-x-auto md:overflow-visible justify-around md:justify-start space-x-4 md:space-x-0 md:space-y-4">
          {Object.entries(categoryData).map(([category, count]) => (
            <li
              key={category}
              className="flex items-center justify-between p-3 bg-white rounded-lg shadow-md text-black text-sm md:text-lg min-w-[140px] md:min-w-full"
            >
              <span className="capitalize font-semibold">{category}</span>
              <span className="font-bold text-white bg-blue-500 px-3 py-1 rounded-full">
                {count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Overview;
