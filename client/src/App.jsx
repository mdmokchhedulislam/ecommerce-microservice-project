import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import NotFound from "./pages/NotFound";
import Registration from "./pages/Registration";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import SingleBook from "./pages/SingleBook";
import Cart from "./pages/Cart";
import PrivateRoute from "./components/PrivateRoute";
import Order from "./pages/Order";
import OrderConferm from "./pages/OrderConferm";
import DashBoardLayout from "./components/dashboard/DashBoardLayout";
import AddBook from "./components/dashboard/sellerdashboard/AddBook";
import UserDashboard from "./components/dashboard/userdashboard/UserDashboard";
import ShowProduct from "./components/dashboard/sellerdashboard/ShowProduct";
import OrderProduct from "./components/dashboard/sellerdashboard/OrderProduct";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import Update from "./components/dashboard/sellerdashboard/Update";
function App() {
  const { currentUser } = useSelector((state) => state.user);
  const role = currentUser?.data?.data?.user?.role || "guest";

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<SingleBook />} />
        <Route path="/order-confirmation" element={<OrderConferm />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashBoardLayout />
            </PrivateRoute>
          }
        >
          {role === "user" && <Route path="/dashboard" element={<UserDashboard />} />}
          {role === "seller" && <Route path="/dashboard" element={<ShowProduct />} />}
          {!["user", "seller"].includes(role) && (
            <Route path="/dashboard" element={<NotFound />} />
          )}

          <Route path="/dashboard/seller/addproduct" element={<AddBook />} />
          <Route path="/dashboard/seller/product" element={<ShowProduct />} />
          <Route path="/dashboard/seller/product/update/:id" element={<Update />} />
          <Route path="/dashboard/seller/order" element={<OrderProduct />} />
          <Route path="/dashboard/user/order" element={<UserDashboard />} />
          <Route path="/dashboard/user/order" element={<UserDashboard />} />
        </Route>

        <Route
          path="/order"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
