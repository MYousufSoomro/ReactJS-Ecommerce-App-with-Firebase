import About from "../screens/About";
import Home from "../screens/Home";
import Error from "../screens/Error";
import ProductDetails from "../screens/ProductDetails";
import Dashboard from "../components/Dashboard";
import { Navigate } from "react-router-dom";
import Signup from "../screens/Signup";
import Signin from "../screens/Signin";
import AddProduct from "../screens/AddProduct";

export const RouteList = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/add",
    element: <AddProduct />,
  },
  {
    path: "/product-details/:id",
    element: <ProductDetails />,
  },
  {
    path: "/dashboard/*",
    element: <Dashboard />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/product-details",
    element: <Navigate to="/" />,
  },
  {
    path: "*",
    element: <Error />,
  },
];
