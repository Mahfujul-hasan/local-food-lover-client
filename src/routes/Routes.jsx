import { createBrowserRouter } from "react-router";
import RootLayout from "../Root/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/Register/Register";
import AllReviews from "../pages/AllReviews/AllReviews";
import MyReviews from "../pages/MyReviews/MyReviews";
import AddReview from "../pages/AddReview/AddReview";
import UpdateReview from "../pages/UpdateReview/UpdateReview";
import Error404 from "../components/Error404";
import MyFavorite from "../pages/MyFavorite/MyFavorite";
import PrivateRoute from "../components/privateRoute/PrivateRoute";
import AboutUs from "../pages/aboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import AuthLayout from "../AuthLayout/AuthLayout";
import ReviewDetails from "../pages/ReviewDetails/ReviewDetails";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import UpdateProfile from "../pages/Dashboard/User/UpdateProfile";
import Faq from "../pages/FAQ/Faq";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-reviews",
        Component: AllReviews,
      },
      {
        path:"/reviews/:id",
        Component:ReviewDetails
      },
      {
        path:"about-us",
        Component: AboutUs
      },
      {
        path:"contact-us",
        Component: ContactUs
      },
      {
        path:"faq",
        Component:Faq
      },
      {
        path: "/my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-review",
        element: (
          <PrivateRoute>
            <AddReview></AddReview>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-review/:id",
        element: (
          <PrivateRoute>
            <UpdateReview></UpdateReview>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-favorite",
        element: (
          <PrivateRoute>
            <MyFavorite></MyFavorite>
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        Component: Error404,
      },
    ],
  },
  {
    path:"/",
    Component:AuthLayout,
    children:[
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
    ]
  },
  {
    path: '/dashboard',
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
      {
        path:'my-profile',
        Component:MyProfile

      },
      {
        path:'update-profile',
        Component:UpdateProfile
      },
      {
        path:'my-reviews',
        Component:MyReviews
      },
      {
        path:'my-favorites',
        Component:MyFavorite
      }
    ]
  }
]);
