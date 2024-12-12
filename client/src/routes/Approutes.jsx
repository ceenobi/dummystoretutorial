import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, ProductDetails, Products } from "../pages";
import { Spinner } from "../components";
import Search from "../pages/search/Search";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import { PrivateRoutes, PublicRoutes } from "./ProtectedRoutes";
import Signup from "../pages/signup/Signup";
import Create from "../pages/admin/create/Create";
import AllProducts from "../pages/admin/AllProducts";
import EditProduct from "../pages/admin/EditProduct";

const Root = lazy(() => import("../layouts/Root"));
const Auth = lazy(() => import("../layouts/Auth"));
export default function Approutes() {
  const routes = [
    {
      path: "/",
      element: (
        <Suspense fallback={<Spinner />}>
          <Root />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "products/:categoryName",
          element: <Products />,
        },
        {
          path: "product/:productTitle",
          element: <ProductDetails />,
        },
        {
          path: "search",
          element: <Search />,
        },
        {
          path: "profile",
          element: (
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          ),
        },
        {
          path: "create",
          element: (
            <PrivateRoutes>
              <Create />
            </PrivateRoutes>
          ),
        },
        {
          path: "allproducts",
          element: (
            <PrivateRoutes>
              <AllProducts />
            </PrivateRoutes>
          ),
        },
        {
          path: "product/edit/:productId/:title",
          element: (
            <PrivateRoutes>
              <EditProduct />
            </PrivateRoutes>
          ),
        },
      ],
    },
    {
      element: (
        <Suspense fallback={<Spinner />}>
          <PublicRoutes>
            <Auth />
          </PublicRoutes>
        </Suspense>
      ),
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
