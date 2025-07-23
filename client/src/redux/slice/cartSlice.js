import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItem: [],
    totalPrice: 0,
    totalQuantity: 0,
  },
  reducers: {
    addToCart: (state, action) => {

      
      const find = state.cartItem.findIndex((item) => item._id === action.payload._id);
  
  
      
      if (find >= 0) {
        state.cartItem[find].quantity += 1;
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        state.cartItem.push(newItem);
      }

  
      state.totalPrice = state.cartItem.reduce((total, item)=>{
        return total+item.price*item.quantity
      },0);
      state.totalQuantity = state.cartItem.reduce((total, item)=>{
        return total+item.quantity
      },0)
    },
    removeElement: (state, action) => {
      state.cartItem = state.cartItem.filter((ele) => ele._id !== action.payload);
      state.totalPrice = state.cartItem.reduce((total, item)=>{
        return total+item.price*item.quantity
      },0);
      state.totalQuantity = state.cartItem.reduce((total, item)=>{
        return total+item.quantity
      },0)
    },
    removeAllCartItem:(state)=>{
      state.cartItem = []

    },
    decressCart: (state, action) => {
      const findIndex = state.cartItem.findIndex((item) => item._id === action.payload._id);
      if (state.cartItem[findIndex].quantity > 1) {
        state.cartItem[findIndex].quantity -= 1;
      }
  
      state.totalPrice = state.cartItem.reduce((total, item)=>{
        return total+item.price*item.quantity
      },0);
      state.totalQuantity = state.cartItem.reduce((total, item)=>{
        return total+item.quantity
      },0)
    },
    incressCart: (state, action) => {
      const findIndex = state.cartItem.findIndex((item) => item._id === action.payload._id);
      if (state.cartItem[findIndex].quantity >= 1) {
        state.cartItem[findIndex].quantity += 1;
      }

      state.totalPrice = state.cartItem.reduce((total, item)=>{
        return total+item.price*item.quantity
      },0);
      state.totalQuantity = state.cartItem.reduce((total, item)=>{
        return total+item.quantity
      },0)
    },
    cartTotalPriceAndQuantity: (state) => {
      state.totalPrice = state.cartItem.reduce((total, item)=>{
        return total+item.price*item.quantity
      },0);
      state.totalQuantity = state.cartItem.reduce((total, item)=>{
        return total+item.quantity
      },0)
    },
  },
});

export const { addToCart,removeAllCartItem, removeElement, decressCart, incressCart, cartTotalPriceAndQuantity } = CartSlice.actions;
export default CartSlice.reducer;