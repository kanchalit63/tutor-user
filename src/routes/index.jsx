import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../layouts/LandingPage";
import Aboutus from "../pages/aboutus/Aboutus";
import Policy from "../pages/policy/Policy";
import SearchTutor from "../pages/search/SearchTutor";
import Listtutor from "../pages/listtutor/Listtutor";
import ProfileUser from "../pages/profile/ProfileUser";
import PasswordUser from "../pages/profile/PasswordUser";
import DetailTutor from "../pages/detailtutor/DetailTutor";
import CheckBooking from "../pages/checkbooking/CheckBooking";
import Rating from "../pages/rating/Rating";
import Registerfortutor from "../pages/registertutor/Registerfortutor";
import Index from "../pages/main/Index";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import CheckPayment from "../pages/checkpayment/CheckPayment";


const router = createBrowserRouter([

    {
        path: '/',
        element: <LandingPage />,
        children: [
            {
                path: '/',
                element: <Index />
            },
            {
                path: '/aboutus',
                element: <Aboutus />
            },
            {
                path: '/policy',
                element: <Policy />
            },
            {
                path: '/searchTutor',
                element: <SearchTutor />
            },
            {
                path: '/listtutor',
                element: <Listtutor />
            },
            {
                path: '/userprofile',
                element: <ProfileUser />
            },
            {
                path: '/usersecurity',
                element: <PasswordUser />
            },
            {
                path: '/detailtutor/:id', 
                element: <DetailTutor />
            },
            {
                path: '/check-booking',
                element: <CheckBooking />
            },
            {
                path: '/review/:id',
                element: <Rating />
            },
            {
                path: '/registerfortutor',
                element: <Registerfortutor />
            },
            {
                path: '/check-payment',
                element: <CheckPayment />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },

])


export default router