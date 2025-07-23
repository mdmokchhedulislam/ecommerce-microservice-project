import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function OrderProduct() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]); // Stores all products

  // Fetch orders on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://bookcycle-qdl4.onrender.com/api/order/findbyowner",
          { withCredentials: true }
        );
        setProduct(res.data.myOrders);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  console.log(product);


  // Handle status change
  const handleChange = async (id, event) => {
    const selectedValue = event.target.value;
    console.log("Changing status for ID:", id, "to:", selectedValue);

    try {
      const response = await axios.put(
        `https://bookcycle-qdl4.onrender.com/api/order/orders/${id}/status`,
        { status: selectedValue },
        { withCredentials: true }
      );

      console.log("Status updated successfully:", response.data);


      const updatedProduct = await axios.get(
        "https://bookcycle-qdl4.onrender.com/api/order/findbyowner",
        { withCredentials: true }
      );


      setProduct(updatedProduct.data.myOrders)
      toast.success("status update successfully");


    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("product update failed")
    }
  };

  return (
    <>
      <div class="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table class="w-full  border-collapse table-auto text-center">
          <thead>
            <tr>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-semibold text-slate-500">BookId</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-semibold text-slate-500 text-left">
                  Delivery Details</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-semibold text-slate-500">Book Name and Qty</p>
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
              product?.reverse()?.map((item) => (
                <tr key={item._id} class="hover:bg-slate-50 border-b border-slate-200">
                  <td class="p-4 text-sm font-semibold text-slate-800">
                    {item._id.slice(-5)}
                  </td>

                  <td className="px-4 py-2 text-left">
                    <p className='font-onest text-[16px] capitalize'>Name: {item.name}</p>
                    <p className='font-onest text-[16px] capitalize'>Phone: {item.phone}</p>
                    <p className='font-onest text-[16px] capitalize'>District: {item.district}</p>
                    <p className='font-onest text-[16px] capitalize'>City: {item.city}</p>
                    <p className='font-onest text-[16px] capitalize'>ZipCode: {item.zip}</p>
                  </td>


                  <td class="p-4 text-sm text-black/75 font-oswald font-bold text-center">
                    {item.book?.map((book, index) => (
                      <div key={index}>{book.toUpperCase()}</div>
                    ))}
                  </td>
                  <td class="p-4 text-sm text-slate-500">{item.totalprice}<span className="text-2xl ml-2">৳</span></td>

                  <td className=" py-2">
                    <select
                      onChange={(e) => handleChange(item._id, e)}
                      value={item.status}
                      className="outline-none bg-gray-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
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

export default OrderProduct;
