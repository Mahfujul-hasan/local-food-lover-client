import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import useAuth from "../../hook/useAuth";
import HeroSlider from "../../components/HeroSlider";
import ReviewCard from "../../components/ReviewCard";
import { Link } from "react-router";
import HowItWorks from "../../components/HowItWorks";
import FoodCategory from "../../components/FoodCategory";
import Spinner from "../../components/Spinner";
import NotFound from "../../components/NotFound";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: reviews, isLoading: reviewLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      const data = res.data;
      return data;
    },
  });
  const { data: topReviews, isLoading: topReviewsLoading } = useQuery({
    queryKey: ["topReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews/top");
      const data = res.data;
      return data;
    },
  });
  console.log(topReviews);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>

      {/* Slider Section */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        speed={2000}
        loop={true}
        freeMode={true}
      >
        {reviewLoading || !reviews ? (
          <SwiperSlide>
            <Spinner />
          </SwiperSlide>
        ) : (
          reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <HeroSlider review={review}></HeroSlider>
            </SwiperSlide>
          ))
        )}
      </Swiper>

      {/* Top Reviews Section */}
      <div className="mt-20 max-w-7xl px-5 md:px-10 lg:px-20 mx-auto">
        <h3 className="text-4xl font-bold text-center text-primary mb-6">
          Top Reviews
        </h3>
        <p className="text-center text-base font-medium text-gray-600 mb-10">
          Explore the top-rated food experiences shared by our community...
        </p>
        {topReviewsLoading || !topReviews ? (
          <Spinner />
        ) : topReviews.length < 1 ? (
          <NotFound />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center gap-2">
            {topReviews.map((review) => (
              <ReviewCard key={review._id} review={review}></ReviewCard>
            ))}
          </div>
        )}
      </div>

      {/* show all  */}
      <div className="flex items-center justify-center mt-10">
        <Link to="/all-reviews">
          <button className="btn button">Show All Reviews</button>
        </Link>
      </div>

      {/* how it works?  */}
      <div className="mt-10 max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
        <HowItWorks />
      </div>

      {/* food category  */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
        <FoodCategory />
      </div>
    </div>
  );
};

export default Home;
