import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Singup from "../Pages/Singup/Singup";
import DashboardLayout from "../Root/DashboardLayout";
import GeneralUser from "../Pages/Dashboard/GeneralUser/GeneralUser";
import CompanyDashboard from "../Pages/Dashboard/CompanyDashboard/CompanyDashboard";
import AboutUs from "../Pages/AboutUs/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'Login',
        element: <Login></Login>
      },
      {
        path: 'Singup',
        element: <Singup></Singup>
      },
      {
        path: 'aboutUs',
        element: <AboutUs></AboutUs>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "GeneralUser",
        element: <GeneralUser></GeneralUser>
      },
      {
        path: "CompanyDashboard",
        element: <CompanyDashboard></CompanyDashboard>
      },
    ]
  }
]);