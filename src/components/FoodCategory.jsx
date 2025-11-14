import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import fast_food from '../assets/national-fast-food-day.avif'
import traditional_food from '../assets/traditional_food.jpg'
import desserts_sweets from '../assets/Desserts_and_Sweets.jpg'
import healthy_food from '../assets/Healthy _choices.webp'
import street_food from '../assets/Street_food.webp'
import drinks_beverages from '../assets/Drinks_Beverages.jpg'

const FoodCategory = () => {
  return (
    <div className="max-w-10/12 mx-auto">
      <h3 className="text-5xl font-bold text-center text-primary">
        What Kind of Food <br />
        Are You Craving?
      </h3>
      <div className="mt-10">
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        speed={2000}
        loop={true}
        freeMode={true}
          modules={[Pagination, Autoplay]}
          className="mySwiper rounded-2xl"
        >
          <SwiperSlide>
            <img className="relative rounded-3xl h-[400px] w-full mx-auto" src={fast_food} alt="" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent rounded-3xl"></div>
            <div className="absolute top-[170px] w-full">
                <h3 className="text-center text-white text-7xl font-extrabold z-10" >Fast Food</h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img className="relative rounded-3xl h-[400px] w-full mx-auto" src={traditional_food} alt="" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent rounded-3xl"></div>
            <div className="absolute top-[170px] w-full">
                <h3 className="text-center text-white text-7xl font-extrabold z-10" >Traditional Meals</h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img className="relative rounded-3xl h-[400px] w-full mx-auto" src={desserts_sweets} alt="" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent rounded-3xl"></div>
            <div className="absolute top-[170px] w-full">
                <h3 className="text-center text-white text-7xl font-extrabold z-10" >Desserts & Sweets</h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img className="relative rounded-3xl h-[400px] w-full mx-auto" src={healthy_food} alt="" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent rounded-3xl"></div>
            <div className="absolute top-[170px] w-full">
                <h3 className="text-center text-white text-7xl font-extrabold z-10" >Healthy Choices</h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img className="relative rounded-3xl h-[400px] w-full mx-auto" src={street_food} alt="" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent rounded-3xl"></div>
            <div className="absolute top-[170px] w-full">
                <h3 className="text-center text-white text-7xl font-extrabold z-10" >Street Food</h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img className="relative rounded-3xl h-[400px] w-full mx-auto" src={drinks_beverages} alt="" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent rounded-3xl"></div>
            <div className="absolute top-[170px] w-full">
                <h3 className="text-center text-white text-7xl font-extrabold z-10" >Drinks & Beverages</h3>
            </div>
          </SwiperSlide>
          
        </Swiper>
      </div>
    </div>
  );
};

export default FoodCategory;
