import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    orders: [],
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
  },
});

export const { setCartItems, clearCart, setOrders, addOrder } = cartSlice.actions;
export default cartSlice.reducer;
