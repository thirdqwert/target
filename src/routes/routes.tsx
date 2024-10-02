import { createHashRouter } from "react-router-dom";
import PrivateRoute from "../HOC/PrivateRoute";
import Home from "../pages/home/Home";
import PublicRoute from "../HOC/PublicRoute";
import Login from "../pages/login/Login";



export const route = createHashRouter([
    {
        path: '/',
        element: <PrivateRoute />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    },
    {
        path: '/login',
        element: <PublicRoute />,
        children: [
            {
                index: true,
                element: <Login />
            }
        ]
    }
])