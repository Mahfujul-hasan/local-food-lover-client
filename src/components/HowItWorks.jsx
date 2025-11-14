import React from "react";
import food_explore from "../assets/explore.png";
import genuine_reviews from "../assets/Genuine_reviews.png";
import share_experience from "../assets/experience.png";
import save_favorite from "../assets/likes-folder.png";

const HowItWorks = () => {
  return (
    <div className=" px-5  lg:px-[150px] py-20">
      <h3 className="text-5xl font-bold text-center text-primary">
        How It Works?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-15">
        <div className="flex flex-col items-center p-5 rounded-lg shadow-2xl ">
          <img className="h-30 hover:h-32" src={food_explore} alt="" />
          <p className="text-lg font-bold text-[#444444] text-center">
            Discover local restaurants, street food stalls, and home chefs
            around your area.
          </p>
        </div>
        <div className="flex flex-col items-center  p-5 rounded-lg shadow-2xl">
          <img className="h-30 hover:h-32" src={genuine_reviews} alt="" />
          <p className="text-lg font-bold text-[#444444] text-center">
            See what others are saying about their favorite dishes and
            experiences.
          </p>
        </div>
        <div className="flex flex-col items-center  p-5 rounded-lg shadow-2xl">
          <img className="h-30 hover:h-32" src={share_experience} alt="" />
          <p className="text-lg font-bold text-[#444444] text-center">
            Add your own review easily — include food photo, restaurant info,
            and star rating.
          </p>
        </div>
        <div className="flex flex-col items-center  p-5 rounded-lg shadow-2xl">
          <img className="h-30 hover:h-32" src={save_favorite} alt="" />
          <p className="text-lg font-bold text-[#444444] text-center">
            You can save your favorite dishes and can get access all of your
            favorite dishes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
