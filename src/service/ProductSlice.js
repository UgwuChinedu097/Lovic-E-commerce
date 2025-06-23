import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedProduct: null,
  categoryFilter: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
  },
});

export const { setSelectedProduct, setCategoryFilter } = productSlice.actions;
export default productSlice.reducer;
