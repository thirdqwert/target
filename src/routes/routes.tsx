import { createHashRouter } from "react-router-dom";
import PrivateRoute from "../HOC/PrivateRoute";
import Home from "../pages/home/Home";
import PublicRoute from "../HOC/PublicRoute";
import Login from "../pages/login/Login";
import Contacts from "../pages/contacts/Contacts";



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
    },
    {
        path: '/contacts',
        element: <PrivateRoute />,
        children: [
            {
                index: true,
                element: <Contacts />
            }
        ]
    },
])