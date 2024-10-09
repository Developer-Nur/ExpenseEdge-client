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
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AdvancedReports from "../Pages/Dashboard/AdvancedReports/AdvancedReports";
import CompanyOverview from "../Pages/Dashboard/CompanyOverview/CompanyOverview";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ManageCompany from "../Pages/Dashboard/ManageCompany/ManageCompany";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import FinancialOverview from "../Pages/Dashboard/FinancialOverview/FinancialOverview";
import ContactUs from "../Pages/ContactUs/ContactUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
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
      },
      {
        path: 'contactUs',
        element: <ContactUs></ContactUs>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: "GeneralUser",
        element: <PrivateRoute><GeneralUser></GeneralUser></PrivateRoute>
      },
      {
        path: "CompanyDashboard",
        element: <PrivateRoute><CompanyDashboard></CompanyDashboard></PrivateRoute>
      },
      {
        path: "AdvancedReports",
        element: <PrivateRoute><AdvancedReports></AdvancedReports></PrivateRoute>
      },
      {
        path: "CompanyOverview",
        element: <PrivateRoute><CompanyOverview></CompanyOverview></PrivateRoute>
      },
      {
        path: "financial-overview",
        element: <PrivateRoute><FinancialOverview></FinancialOverview></PrivateRoute>
      },

      // Admin route
      {
        path: "ManageUsers",
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: "ManageCompany",
        element: <AdminRoute><ManageCompany></ManageCompany></AdminRoute>
      },
    ]
  }
]);