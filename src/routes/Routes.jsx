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
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/all-reviews",
        Component: AllReviews,
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
]);
