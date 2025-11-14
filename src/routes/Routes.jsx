import { createBrowserRouter } from "react-router"
import RootLayout from "../Root/RootLayout"
import Home from "../pages/Home/Home"
import Login from "../pages/login/Login"
import Register from "../pages/Register/Register"
import AllReviews from "../pages/AllReviews/AllReviews"
import MyReviews from "../pages/MyReviews/MyReviews"
import AddReview from "../pages/AddReview/AddReview"
import UpdateReview from "../pages/UpdateReview/UpdateReview"

export const router = createBrowserRouter([
    {
        path:'/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path:'/register',
                Component: Register
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/all-reviews',
                Component: AllReviews
            },
            {
                path: '/my-reviews',
                Component: MyReviews
            },
            {
                path: '/add-review',
                Component: AddReview
            },
            {
                path: '/my-review/:id',
                Component: UpdateReview
            },

        ]
    }
])