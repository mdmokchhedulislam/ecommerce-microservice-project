import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/slice/cartSlice";
import { toast } from "react-toastify";
import Container from "../common/Container";
import Loading from "../../pages/Loading";

function NewRelease() {
  const [releaseProduct, setReleaseProduct] = useState([]);
  const [isUser, setIsUser] = useState(false);
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch();


  const { currentUser, isAuthenticated } = useSelector((state) => ({
    currentUser: state.user.currentUser || null, 
    isAuthenticated: state.user.isAuthenticated || false, 
  }));

  
  useEffect(() => {
    if (isAuthenticated && currentUser?.data?.data?.user?.role === "user") {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [isAuthenticated, currentUser]);

  
  useEffect(() => {
    const fetchReleaseProducts = async () => {
      try {
        setLoading(true)
        const res = await axios.get(
          "http://localhost:3001/api/product/find-product",
          { withCredentials: true }
        );

        console.log("fetching data is");
        
        console.log("Release Products Response:", res.data); 
        setReleaseProduct(res.data?.AllProduct || []);
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
        toast.error("Failed to fetch new release products.");
        setLoading(false)
      }
    };

    fetchReleaseProducts();
  }, []);


  const handleCart = (product) => {
    if (isUser) {
      dispatch(addToCart(product));
      toast.success("Book added successfully!");
    } else {
      toast.error("Only users can add to the cart.");
    }
  };


  return (
    <>
      <Container>
        <div className="new-release">
          <h1 className="text-[24px] sm:text-[45px] md:text-[45px] font-bold text-center py-[20px]">
            New Release Book
          </h1>
          {
            loading ?<Loading />:(   <div>
              <div className="grid grid-cols-12 gap-4 mt-[40px]">
                {releaseProduct.length > 0 ? (
                  releaseProduct
                    .slice(-8)
                    .reverse()
                    .map((product) => (
                      <div
                        key={product._id}
                        className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 p-5 rounded-md shadow-cardShadow transition-all duration-700 hover:scale-95 bg-[#e5e7eb]/50 hover:bg-[#e5e7eb]"
                      >
                        <div className="flex justify-between pb-5 items-center relative">
                          <p className="text-[20px] font-bold rounded-sm pb-2">
                            {product.semister || "Unknown Semester"}
                          </p>
  
                          <div className="absolute top-4 left-[70px]">
                            {product.isSold && (
                              <p className="font-oswald font-bold text-red-600 text-xl z-50 hover:scale-125">
                                SOLD OUT
                              </p>
                            )}
                          </div>
  
                          <p className="text-[14px] font-bold capitalize rounded-sm pb-2">
                            {product.department || "Unknown Department"}
                          </p>
                        </div>
                        <img
                          className="w-[150px] h-[150px] object-cover object-top mx-auto rounded-lg hover:scale-105 transition-all duration-1000"
                          src={product.productImage || "/default-image.jpg"}
                          alt={product.bookname || "Book Image"}
                        />
                        <div className="flex flex-col gap-2 mt-3">
                          <p className="mt-[5px] font-bold text-center text-[20px] sm:text-[20px] md:text-[17px] lg:text-[22px] capitalize">
                            {product.bookname?.slice(0, 20) || "Unknown Book"}
                          </p>
                          <p className="font-semibold text-center opacity-50 text-[12px] sm:text-[12px] md:text-[12px] lg:text-[16px]">
                            {product.description?.slice(0, 50) || "No description"}...
                          </p>
                          <p className="text-3xl text-center">
                            {product.price || "N/A"}{" "}
                            <span className="text-4xl text-red-500">৳</span>
                          </p>
                        </div>
  
                        <div className="flex justify-between px-3 my-3 pt-4 w-full gap-1">
                          <Link
                            to={`/books/${product._id}`}
                            className="bg-slate-500 px-2 py-1 rounded-md text-white w-[50%] font-bold text-[10px] md:text-[11px] lg:text-[15px] text-center hover:bg-slate-600 hover:text-white transition-all duration-500"
                          >
                            Show details
                          </Link>
                          {product.isSold ? (
                            <p className="bg-red-400 px-2 py-1 rounded-md cursor-pointer text-white w-[50%] font-bold text-[9px] md:text-[10px] lg:text-[15px] text-center hover:bg-white hover:text-black transition-all duration-500">
                              Not Available
                            </p>
                          ) : (
                            <button
                              onClick={() => handleCart(product)}
                              className="bg-slate-500 px-2 py-1 rounded-md text-white w-[50%] font-bold text-[10px] md:text-[11px] lg:text-[15px] text-center hover:bg-slate-600 hover:text-white transition-all duration-500"
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="col-span-12 text-center text-gray-500">
                    No new releases available.
                  </p>
                )}
              </div>
            </div>)
          }
       
        </div>
      </Container>
    </>
  );
}

export default NewRelease;
