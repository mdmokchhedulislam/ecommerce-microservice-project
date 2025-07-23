import React, { useState } from "react";
import AddBook from "./sellerdashboard/AddBook";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiSlideshow4Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaFirstOrder } from "react-icons/fa";
import axios from "axios";
import { updateUserRole } from "../../redux/slice/userSlice";
function DashBoardLayout({ children }) {
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  const currentUserRole = currentUser?.data?.data?.user?.role;

  // console.log("current user is ", currentUser.data.data.user.name);

  const [size, setSize] = useState(280);
  const navigate = useNavigate();


  const dispatch = useDispatch();
  const handleUserDashboard = async(role)=>{
    console.log(role);
    try {
      const res = await axios.put(
        "https://bookcycle-qdl4.onrender.com/api/user/update/role",
        { role },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(updateUserRole(role));
        navigate("/dashboard/user/order")
       
      }
    } catch (error) {
      console.error(error);
    }
    
    
  }

  const handleSellerDashboard = async(role)=>{
    try {
      const res = await axios.put(
        "https://bookcycle-qdl4.onrender.com/api/user/update/role",
        { role },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(updateUserRole(role));
        navigate("/dashboard/seller/product")
      }
    } catch (error) {
      console.error(error);
    }
    
  }


  return (
    <div className="flex  ">
      <div
      
        className="md:fixed w-[100px] relative md:w-[280px] left-0 top-0  z-50 h-screen bg-black p-5 pt-3"
      >
        {currentUserRole === "user" ? (
          <div className="mt-[25px]">
             <button onClick={()=>handleSellerDashboard("seller")} className="text-black px-3 my-[20px] rounded-lg text text-[12p] bg-cyan-50">Go to Seller Account</button>
            <h1 className="text-[10px] text-center text-white font-bold font-oswald shadow-cardShadow md:text-2xl">User Dashboard</h1>


            <div className="mt-[30px] flex flex-col gap-10">
              <RiSlideshow4Fill onClick={() => navigate("/dashboard/user/order")} className="text-white text-2xl text-center md:hidden" />
              <RiSlideshow4Fill onClick={() => navigate("/dashboard")} className="text-white text-2xl text-center md:hidden" />
              <RiSlideshow4Fill onClick={() => navigate("/dashboard")} className="text-white text-2xl text-center md:hidden" />

            </div>

            
            <div className=" flex-col hidden md:flex  ">
              <button
                 onClick={() => navigate("/dashboard/user/order")}
                className="px-3 py-1 rounded-lg bg-white mt-[20px] "
              >
                Show Order
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-3 py-1 rounded-lg bg-white mt-[20px] "
              >
                Update Profile
              </button>
            </div>

            <div className="flex flex-col gap-1 justify-center items-center absolute bottom-5 ">
              <img className="w-[40px] h-[40px] md:w-[120px] md:h-[120px] rounded-full" src={currentUser?.data?.data?.user?.image} alt="" />
              <p className="text-[12px] text-center md:text-[16px] font-bold text-white font-onest ">{currentUser?.data?.data?.user?.name}</p>
              <p className="hidden md:flex md:text-[13px] font-bold text-white font-onest ">{currentUser?.data?.data?.user?.email}</p>
              <p className=" text-[10px] md:text-[16px] font-bold text-white font-onest ">{currentUser?.data?.data?.user?.phone}</p>

            </div>
          </div>
        ) : (
          <div className="mt-[25px]">
            <button onClick={()=>handleUserDashboard("user")} className="text-black px-3 my-[20px] rounded-lg text text-[12p] bg-cyan-50">Go to user Account</button>
            <h1 className="text-[10px] text-center text-white font-bold font-oswald shadow-cardShadow md:text-2xl">Seller Dashboard</h1>

            <div className="mt-[30px] flex flex-col gap-10 items-center">
              <IoIosAddCircleOutline onClick={() => navigate("/dashboard/seller/addproduct")} className="text-white text-2xl text-center md:hidden" />
              <MdEditSquare onClick={() => navigate("/dashboard/seller/product")} className="text-white text-2xl text-center md:hidden" />
              <FaFirstOrder onClick={() => navigate("/dashboard/seller/order")} className="text-white text-2xl text-center md:hidden" />
        

            </div>


            <div className=" flex-col hidden md:flex  ">
              <button
                onClick={() => navigate("/dashboard/seller/addproduct")}
                className="px-3 py-1 rounded-lg bg-white mt-[20px] "
              >
                AddProduct
              </button>
              <button
                onClick={() => navigate("/dashboard/seller/product")}
                className="px-3 py-1 rounded-lg bg-white mt-[20px] "
              >
                Product
              </button>
              <button
                onClick={() => navigate("/dashboard/seller/order")}
                className="px-3 py-1 rounded-lg bg-white mt-[20px] "
              >
                Order
              </button>
            </div>

            <div className="flex flex-col gap-1 justify-center items-center absolute bottom-5 ">
              <img className="w-[40px] h-[40px] md:w-[120px] md:h-[120px] rounded-full" src={currentUser?.data?.data?.user?.image} alt="" />
              <p className="text-[12px] text-center md:text-[16px] font-bold text-white font-onest ">{currentUser?.data?.data?.user?.name}</p>
              <p className="hidden md:flex md:text-[13px] font-bold text-white font-onest ">{currentUser?.data?.data?.user?.email}</p>
              <p className=" text-[10px] md:text-[16px] font-bold text-white font-onest ">{currentUser?.data?.data?.user?.phone}</p>

            </div>
          </div>
        )}
      </div>
      <div className="ml-[10px] md:ml-[320px] w-full h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default DashBoardLayout; 