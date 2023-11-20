import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";

export const router = createBrowserRouter([
    {
        path: "/",
        element:   <Main>  </Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/menu',
                element: <Restaurants></Restaurants>
            },
            {
                path: '/restaurantItem/:id', // dinmic route
                element: <RestaurantItem></RestaurantItem>,
                loader: () => fetch("http://localhost:5000/menu")
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    },
]);