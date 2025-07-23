import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slice/cartSlice";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../components/common/Container";

function Books() {
  const [releaseProduct, setReleaseProduct] = useState([]); 
  const [search, setSearch] = useState(""); 
  const [isUser, setIsUser] = useState(false); 
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false); 
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (isAuthenticated && currentUser?.data?.data?.user?.role === "user") {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [isAuthenticated, currentUser]);

  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); 
      try {
        const res = await axios.get(
          "http://localhost:3001/api/product/find-product",
          { withCredentials: true }
        );

        console.log("response product is", res?.data?.data);

        // const AllProduct = res?.data?.data
        
        console.log("API Response:", res?.data?.data); 
        setReleaseProduct(res?.data?.data || []); 
      } catch (error) {
        console.error("Error fetching products:", error.message);
        toast.error("Failed to fetch products. Please try again later.");
        setReleaseProduct([]); 
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  
  const filteredProducts = releaseProduct.filter(
    (item) =>
      item?.title?.toLowerCase().includes(search.toLowerCase()) ||
      item?.shortDes?.toLowerCase().includes(search.toLowerCase())
  );

  
  const handleCart = (product) => {
    if (isUser) {
      dispatch(addToCart(product)); 
      toast.success("Book added to cart successfully!"); 
    } else {
      toast.error("Only users can add to the cart.");
    }
  };

  return (
    <Container>
      <div>
        <h1 className="text-[24px] sm:text-[45px] md:text-[45px] font-bold text-center py-[20px]">
          Find Your Relevant Book
        </h1>

      
        <div className="w-full sm:w-3/2 md:w-1/2 mx-auto mb-[40px]">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            name="search"
            type="text"
            placeholder="Search your book"
            className="w-full outline-none border-2 border-black rounded-md px-3 py-1"
          />
        </div>

      
        {loading ? (
          <Loading />
        ) : filteredProducts.length > 0 ? (
          
          <div className="grid grid-cols-12 gap-4">
            {filteredProducts
              .reverse()
              .map((product) => (
                <div
                  key={product?._id}
                  className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 p-5 rounded-md shadow-cardShadow hover:scale-95 transition-all duration-700 bg-[#e5e7eb]/50 hover:bg-[#e5e7eb]"
                >
                
                  <div className="flex justify-between pb-5 items-center relative">
                    <p className="text-[20px] font-bold rounded-sm pb-2">
                      {product?.title || "Unknown Semester"}
                    </p>

                    {product?.isSold && (
                      <p className="font-oswald font-bold text-red-600 text-xl absolute top-4 left-[70px]">
                        SOLD OUT
                      </p>
                    )}

                    <p className="text-[14px] font-bold capitalize rounded-sm pb-2">
                      {product?.department || "Unknown Department"}
                    </p>
                  </div>

              
                  <img
                    className="w-[150px] h-[150px] object-cover object-top mx-auto rounded-lg hover:scale-105 transition-all duration-300"
                    src={product?.image || "/default-image.jpg"}
                    alt={"Book Image"}
                  />

                  
                  <div className="flex flex-col gap-2 mt-3">
                    <p className="mt-[5px] font-bold text-center text-[20px] sm:text-[20px] md:text-[17px] lg:text-[22px] capitalize">
                      {product?.bookname?.slice(0, 20) || "Unknown Book"}
                    </p>
                    <p className="font-semibold text-center opacity-50 text-[12px] sm:text-[12px] md:text-[12px] lg:text-[16px]">
                      {product?.shortDes?.slice(0, 50) || "No description"}...
                    </p>
                    <p className="text-3xl text-center">
                      {product?.price || "N/A"}{" "}
                      <span className="text-4xl text-red-500">৳</span>
                    </p>
                  </div>

                
                  <div className="flex justify-between px-3 my-3 pt-4 w-full gap-1">
                    <Link
                      to={`/books/${product?._id}`}
                      className="bg-slate-500 px-2 py-1 rounded-md text-white w-[50%] font-bold text-[10px] md:text-[11px] lg:text-[15px] text-center hover:bg-slate-600 hover:text-white transition-all duration-500"
                    >
                      Show details
                    </Link>
                    {product?.isSold ? (
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
              ))}
          </div>
        ) : (
          
          <p className="text-center">No products found. Try searching with a different term.</p>
        )}
      </div>
    </Container>
  );
}

export default Books;
