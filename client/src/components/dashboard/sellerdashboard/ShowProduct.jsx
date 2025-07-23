import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Loading from "../../../pages/Loading";
import { toast } from "react-toastify";
import Update from "./Update";
import { Link } from "react-router-dom";

function ShowProduct() {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    const ShowAllProduct = async () => {
      setLoading(true);
      try {
        setLoading(true);
        const res = await axios.get(
          "https://bookcycle-qdl4.onrender.com/api/product/products/by-owner",
          { withCredentials: true }
        );
        setLoading(false);
        setProduct(res.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };
    ShowAllProduct();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://bookcycle-qdl4.onrender.com/api/product/deleteproduct/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success("product delete successfully");
      window.location.reload();
      console.log("Delete successful:", res.data);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return <p className="text-center mt-[40px]"> product not Added yet</p>
    
  }

  return (
    <>
      {/* <table className="border border-collapse w-4/5 mx-auto mt-[30px]">
        <thead>
          <tr className="border">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">photo</th>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">status</th>
          </tr>
        </thead>
        <tbody>
          {product &&
            product?.reverse().map((item) => (
              <tr>
                <td className="border px-4 py-2">{item._id}</td>
                <td className="border px-4 py-2">
                  <img
                    className="w-[30px] "
                    src={item.productImage}
                    alt="image"
                  />
                </td>
                <td className="border px-4 py-2">{item.bookname}</td>
                <td className="border px-4 py-2">{item.price}</td>
                <td className="border px-4 py-2 ">
                  <div className="flex gap-4 items-center justify-center ">
                    <button className="">
                      <FiEdit className="text-2xl" />{" "}
                    </button>
                    <button onClick={() => handleDelete(item._id)}>
                      <MdDeleteForever className="text-2xl" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table> */}


      <div class="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table class="w-full  border-collapse table-auto text-center">
          <thead>
            <tr>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-semibold text-slate-500">BookId</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-semibold text-slate-500 ">
                  Book Image</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-semibold text-slate-500">BookName</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-semibold text-slate-500">Amount</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-semibold text-slate-500">Status</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {product?.length === 0 ? (
              <tr>
                <td colSpan="5" class="p-4 text-center text-slate-500">
                  No orders yet.
                </td>
              </tr>
            ) : (
              product?.reverse().map((item) => (
                <tr key={item._id} class="hover:bg-slate-50 border-b border-slate-200">
                  <td class="p-4 text-sm font-semibold text-slate-800">
                    {item._id.slice(-5)}
                  </td>
                  <td className="px-4 py-2">
                    <img
                      className="w-[50px] h-[50] object-cover flex mx-auto "
                      src={item.productImage}
                      alt="image"
                    />
                  </td>
                  <td class="p-4 text-sm text-slate-500">{item.bookname}<span className="text-2xl ml-2"></span></td>

                  <td class="p-4 text-sm text-slate-500">{item.price}<span className="text-2xl ml-2">৳</span></td>

                  <td className="px-4 py-2 ">
                    <div className="flex gap-4 items-center justify-center ">
                      
                      <Link to={`/dashboard/seller/product/update/${item._id}`}>
                      
                        <FiEdit className="text-2xl" />
                      </Link>
                      
                      {
                        update?<Update />:""
                      }
                      <button onClick={() => handleDelete(item._id)}>
                        <MdDeleteForever className="text-2xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div class="flex justify-between items-center px-4 py-3">
        </div>
      </div>





    </>
  );
}

export default ShowProduct;
