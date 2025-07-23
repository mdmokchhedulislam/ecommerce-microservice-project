import React from "react";
import { useSelector } from "react-redux";

function OrderSamary({placeOrderHandle}) {
  const { cartItem } = useSelector((state) => state.cart);
  const { totalPrice, totalQuantity } = useSelector((state) => state.cart);

  return (
    <div className="w-[30%]">
      <p>Order Samary</p>
      <div className="flex justify-between border-b-2 pb-3">
        <p>product</p>
        <p>subTotal</p>
      </div>
      <div className="py-[10px]">
        {cartItem &&
          cartItem?.map((item) => (
            <div className="flex justify-between">
              <p>
                {item.bookname}×{item.quantity}
              </p>
              <p>{item.price * item.quantity}৳</p>
            </div>
          ))}

        <div className="flex justify-between border-t-2 mt-[20px]">
          <p>Total:</p>
          <p>{totalPrice}৳</p>
        </div>
      </div>

      <div className="flex flex-col gap-[15px] mt-[20px]">
        <div className="flex items-center gap-5">
            <div className="w-[10px] h-[10px] bg-red-300 rounded-full ">
            </div>
            <p className="text-2xl font-bold ">Cash On Delivery</p>
        </div>
        <button onClick={()=>placeOrderHandle()} className="bg-green-500 text-white font-bold text-2xl w-full text-center rounded-md">Place order</button>

      </div>
    </div>
  );
}

export default OrderSamary;
