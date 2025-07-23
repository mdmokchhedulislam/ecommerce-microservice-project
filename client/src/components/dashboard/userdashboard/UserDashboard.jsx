import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../../pages/Loading";

function UserDashboard() {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const findOrderByUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://bookcycle-qdl4.onrender.com/api/order/find", {
          withCredentials: true,
        });
        setOrder(res.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
        setLoading(false);
      }
    };
    findOrderByUser();
  }, []);

  console.log(order);


  if (loading) {
    return <Loading />;
  }
  console.log(order);


  const handleOrderDelete = async (id) => {
    console.log(id);


    try {
      const res = await axios.delete(
        `https://bookcycle-qdl4.onrender.com/api/order/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      window.location.reload();
      console.log("Delete successful:", res.data);
      toast.success("order delete successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };


  // http://localhost:5050/api/order/delete


    if (order.length==0) {
      return <p className="text-center mt-[40px]">No order Yet</p>
      
    }

  return (
    <div class="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
      <table class="w-full text-left border-collapse table-auto">
        <thead>
          <tr>
            <th class="p-4 border-b border-slate-200 bg-slate-50">
              <p class="text-sm font-semibold text-slate-500">BookId</p>
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
            <th class="p-4 border-b border-slate-200 bg-slate-50">
              <p class="text-sm font-semibold text-slate-500">Actions</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {order?.reverse().map((item) => (
              <tr key={item._id} class="hover:bg-slate-50 border-b border-slate-200">
                <td class="p-4 text-sm font-semibold text-slate-800">
                  {item._id.slice(-5)}
                </td>
                <td class="p-4 text-sm text-slate-500">
                  {item.book?.map((book, index) => (
                    <div key={index}>{book.toUpperCase()}</div>
                  ))}
                </td>
                <td class="p-4 text-sm text-slate-500">{item.totalprice}<span className="text-2xl ml-2">৳</span></td>
                <td class="p-4 text-sm text-slate-500">{item.status}</td>
                <td class="p-4">
                  {
                    item.status === "delivered"?<button  className="w-[120px] bg-green-500 text-white rounded-md px-3 py-1">completed</button>:
                    <button
                    onClick={() => handleOrderDelete(item._id)}
                    class="bg-red-500 text-white rounded-md px-3 py-1 w-[120px] "
                  >
                    Cancel Order
                  </button>
                  }
       
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <div class="flex justify-between items-center px-4 py-3">
      </div>
    </div>

  );
}

export default UserDashboard;
