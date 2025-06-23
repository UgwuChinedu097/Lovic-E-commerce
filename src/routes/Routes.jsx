// import React from "react";
// import { createBrowserRouter } from "react-router-dom";

// import Home from "../pages/Home";
// import SignUp from "../auth/SignUp";
// import Signin from "../auth/SignIn"; 
// import ProductDetail from "../utilities/ProductDetails";
// import CartPage from "../utilities/Cartpage";
// import CategoryPage from "../utilities/Categories"; 
// import SearchResultsPage from "../utilities/SearchResultPage"; 
// import { Error } from "./Error";

// // Admin/Dashboard pages
// import DashboardLayout from "../Admin/AdminDashboardLayout";
// import ProtectedRoute from "../Admin/AdminProtectedRoues";
// import UsersPage from "../Admin/User";
// import Orders from "../Admin/Order";
// import AddProduct from "../Admin/AddProduct";
// import AllProducts from "../Admin/AllProduct";
// import AdminDashboard from "../Admin/AdminDashboard";
// import AdminProfile from "../Admin/AdminProfile";
// import EditProduct from "../Admin/EditProduct";
// import AdminProductDetails from "../Admin/ViewProduct";

// const Routes = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/signup",
//     element: <SignUp />,
//   },
//   {
//     path: "/signin",
//     element: <Signin />,
//   },
//   {
//     path: "/productdetails/:id",
//     element: <ProductDetail />,
//   },
//   {
//     path: "/cartpage",
//     element: <CartPage />,
//   },
//   {
//     path: "/categories",
//     element: <CategoryPage />,
//   },
//   {
//     path: "/category/:categoryName",
//     element: <CategoryPage />,
//   },
//   {
//     path: "/search/:keyword",
//     element: <SearchResultsPage />, 
//   },

//   {
//     path: "/dashboard",
//     element: <ProtectedRoute adminOnly={true} />,
//     children: [
//       {
//         path: "",
//         element: <DashboardLayout />,
//         children: [
//           { path: "", element: <AdminDashboard /> },
//           { path: "users", element: <UsersPage /> },
//           { path: "orders", element: <Orders /> },
//           { path: "products/addproduct", element: <AddProduct /> },
//           { path: "allproduct", element: <AllProducts /> },
//           { path: "profile", element: <AdminProfile /> },
//           { path: "view-product/:id", element: <AdminProductDetails /> },
//           { path: "edit-product/:id", element: <EditProduct /> },
//         ],
//       },
//     ],
//   },

//   {
//     path: "*",
//     element: <Error />,
//   },
// ]);

// export default Routes;
import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import SignUp from "../auth/SignUp";
import Signin from "../auth/SignIn";
import ProductDetail from "../utilities/ProductDetails";
import CartPage from "../utilities/Cartpage";
import CategoryPage from "../utilities/Categories";
import SearchResultsPage from "../utilities/SearchResultPage";
import { Error } from "./Error";

// Admin/Dashboard pages
import DashboardLayout from "../Admin/AdminDashboardLayout";
import ProtectedRoute from "../Admin/AdminProtectedRoues";
import UsersPage from "../Admin/User";
import Orders from "../Admin/Order";
import AddProduct from "../Admin/AddProduct";
import AllProducts from "../Admin/AllProduct";
import AdminDashboard from "../Admin/AdminDashboard";
import AdminProfile from "../Admin/AdminProfile";
import EditProduct from "../Admin/EditProduct";
import AdminProductDetails from "../Admin/ViewProduct";

// Footer Pages
import OurStoryPage from "../pages/OurStory";
import ContactUsPage from "../pages/Contact";
import FAQPage from "../pages/Faq";
import PrivacyPolicyPage from "../pages/PrivacyPolicy";
import TermsAndConditionsPage from "../pages/TermsConditions";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/productdetails/:id",
    element: <ProductDetail />,
  },
  {
    path: "/cartpage",
    element: <CartPage />,
  },
  {
    path: "/categories",
    element: <CategoryPage />,
  },
  {
    path: "/category/:categoryName",
    element: <CategoryPage />,
  },
  {
    path: "/search/:keyword",
    element: <SearchResultsPage />,
  },

  // Footer Pages
  {
    path: "/our-story",
    element: <OurStoryPage />,
  },
  {
    path: "/contact-us",
    element: <ContactUsPage />,
  },
  {
    path: "/faq",
    element: <FAQPage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyPage />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditionsPage />,
  },

  // Admin Routes
  {
    path: "/dashboard",
    element: <ProtectedRoute adminOnly={true} />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          { path: "", element: <AdminDashboard /> },
          { path: "users", element: <UsersPage /> },
          { path: "orders", element: <Orders /> },
          { path: "products/addproduct", element: <AddProduct /> },
          { path: "allproduct", element: <AllProducts /> },
          { path: "profile", element: <AdminProfile /> },
          { path: "view-product/:id", element: <AdminProductDetails /> },
          { path: "edit-product/:id", element: <EditProduct /> },
        ],
      },
    ],
  },

  // Catch-All
  {
    path: "*",
    element: <Error />,
  },
]);

export default Routes;
