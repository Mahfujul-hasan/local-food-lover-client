import React, { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import useAxios from "../../hook/useAxios";
import useAuth from "../../hook/useAuth";
import HeroSlider from "../../components/HeroSlider";
import ReviewCard from "../../components/ReviewCard";
import { Link } from "react-router";
import HowItWorks from "../../components/HowItWorks";
import FoodCategory from "../../components/FoodCategory";
import Spinner from "../../components/Spinner";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [topReviews, setTopReviews] = useState([]);
  const { loading } = useAuth();
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/reviews").then((data) => {
      setReviews(data.data);
    });
  }, [axiosInstance]);

  useEffect(() => {
    axiosInstance.get("/reviews/top").then((data) => {
      setTopReviews(data.data);
    });
  }, [axiosInstance]);

  if (loading) {
    return <Spinner />;
  }

  console.log(reviews);
  console.log("top rated reviews", topReviews);
  return (
    <div>
      {/* slider section  */}
      <Swiper
        
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable:true
        }}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        
        speed={2000}
        loop={true}
        freeMode={true}
      >
        {reviews.map((review) => (
          <SwiperSlide>
            <HeroSlider key={review._id} review={review}></HeroSlider>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* top 6 review  */}
      <div className="mt-20 max-w-10/12 mx-auto">
        <h3 className="text-4xl font-bold text-center text-primary mb-5">
          Top Reviews
        </h3>
        <p className="text-center text-base font-medium text-gray-600 mb-10">
          Explore the top-rated food experiences shared by our community. These
          reviews showcase the best restaurants, unique flavors, and memorable
          meals chosen by real diners. Each review reflects genuine experiences
          and honest opinions from food lovers like you. Let their stories guide
          you to your next delicious discovery!
        </p>
        <div className="grid grid-cols-3 gap-5   ">
          {topReviews.map((review) => (
            <ReviewCard key={review._id} review={review}></ReviewCard>
          ))}
        </div>
      </div>

      {/* show all  */}
      <div className="flex items-center justify-center mt-10">
        <Link to="/all-reviews"><button className="btn button">Show All Reviews</button></Link>
      </div>
      
      {/* how it works?  */}
      <div className="mt-10">
        <HowItWorks />
      </div>

      {/* food category  */}
      <div>
        <FoodCategory/>
      </div>

    </div>
  );
};

export default Home;
