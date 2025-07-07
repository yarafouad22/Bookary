import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound";
import Products from "../pages/Products/Products";
import WishlistPage from "../pages/WishlistPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckOut/CheckOut";
import ChatPage from "../Component/chat/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "chat", element: <ChatPage /> },
      { path: "/wishlist", element: <WishlistPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
