import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import UserDetails from "../components/Checkout/UserDetails";
import OrderSamary from "../components/Checkout/OrderSamary";
import { removeAllCartItem } from "../redux/slice/cartSlice";

function Order() {
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  const user = currentUser?.data?.data?.user;
  const { totalPrice, cartItem, totalQuantity } = useSelector((state) => state.cart);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    district: "",
    city: "",
    zip: "",
    phone: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    if (user) {
      setUserData({
        name: user?.name || "",
        email: user?.email || "",
        district: user?.district || "",
        city: user?.city || "",
        zip: user?.zip || "",
        phone: user?.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(userData);
  console.log(user);

  const orderData = {
    name: userData.name,
    email: userData.email,
    district: userData.district,
    city: userData.city,
    zip: userData.zip,
    phone: userData.phone,
    bookId: cartItem.map((item) => item._id),
    book: cartItem.map((item) => `${item.bookname} × ${item.quantity}`),
    totalprice: totalPrice,
  };

  const placeOrderHandle = async () => {
    if (
      !userData.name ||
      !userData.email ||
      !userData.district ||
      !userData.city ||
      !userData.zip ||
      !userData.phone
    ) {
      return toast.error("Please fill in all required fields!");
    }

    try {
      const res = await axios.post("https://bookcycle-qdl4.onrender.com/api/order/addorder", orderData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.status === 201) {
        toast.success("Order placed successfully!");
        dispatch(removeAllCartItem()); 
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="my-10 mx-[20px]">
      <h1 className="text-2xl font-bold">Enter your details to complete this order</h1>
      <div className="flex gap-[50px]">
        <UserDetails userData={userData} handleChange={handleChange} />
        <OrderSamary placeOrderHandle={placeOrderHandle} />
      </div>
    </div>
  );
}

export default Order;
