import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../redux/slice/cartSlice'
import { toast } from "react-toastify";

function SingleBook() {
  const dispatch = useDispatch()
  const [singleBook, setSingleBook] = useState();
  const [loading, setLoading] = useState(false)
  const [isUser, setIsUser] = useState(false)
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  const { id } = useParams();


  useEffect(() => {
    if (isAuthenticated && currentUser?.data.data.user.role === "user") {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    const singlebook = async () => {
      setLoading(true)
      const res = await axios.get(
        `https://bookcycle-qdl4.onrender.com/api/product/singleproduct/${id}`
      );
      setSingleBook(res.data.data);
      setLoading(false)
    };
    singlebook();
  }, []);

  if (loading) {
    return <Loading />
  }



  const handleCart = (product) => {
    console.log(product);
    
    if (isUser) {
      dispatch(addToCart(product));
      toast.success("Book added successfully!");
    } else {
      toast.error("Only users can add to the cart.");
    }
  };



  return (
    <>
      <h1 className="text-[20px] lg:text-3xl font-bold uppercase text-center mt-[20px] lg:mt-[40px] font-onest">
        <span className="">"{singleBook?.bookname}" </span>Book Details
      </h1>
      <div className="w-3/4 mx-auto grid grid-cols-12 gap-5 my-[20px] lg:my-[100px] items-center">
        <div className="col-span-12 md:col-span-6">
          <img className="w-[300px] rounded-lg hover:scale-110 transition-all duration-500 hover:rounded-2xl" src={singleBook?.productImage} />
        </div>
        <div className="col-span-12 md:col-span-6">
          <h1 className="text-[16px] my-[10px]  lg:text-[30px] uppercase font-bold font-oswald">
            {singleBook?.bookname}
          </h1>
          <p className="text-[10px]  lg:text-[16px]">{singleBook?.description}</p>


          {
            singleBook?.isSold ? <p className="bg-red-400 px-2 text-center py-1 rounded-md text-white mt-[20px] w-full hover:bg-black hover:text-white transition-all duration-500 font-oswald font-bold">Not Available</p> :
              <button
                onClick={() => handleCart(singleBook)}
                className={` bg-red-400 px-2 py-1 rounded-md text-white mt-[20px] w-full hover:bg-black hover:text-white transition-all duration-500 font-oswald font-bold`}
              >
                Add to Cart
              </button>
          }

        </div>
      </div>

      <div className="w-2/4 mx-auto ">
        <h1 className="text-[14px] lg:text-3xl">Book Posted by:</h1>
        <div className="flex gap-10 items-center mt-[30px] justify-center flex-col md:flex-row">
          <div className="font-onest font-semibold text-center md:text-left">
            <p className="">{singleBook?.productOwner?.name}</p>
            <p>{singleBook?.productOwner?.email}</p>
            <p>{singleBook?.productOwner?.phone}</p>
          </div>
          <div>
            <img
              className="w-[130px] h-[120px] rounded-full "
              src={singleBook?.productOwner?.image}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleBook;



