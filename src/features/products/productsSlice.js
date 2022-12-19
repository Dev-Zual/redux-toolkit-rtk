import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProductApi, deleteProductApi, fetchProducts } from "./productsAPI";

const initialState = {
  products: [],
  isLoading: false,
  postSuccess: false,
  isDelete: false,
  isError: false,
  error: "",
};

export const getProducts = createAsyncThunk("products/getProduct", async () => {
  const products = fetchProducts();
  return products;
});

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData) => {
    const product = addProductApi(productData);
    return product;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    const product = await deleteProductApi(id);
    thunkAPI.dispatch(removeFromList(id));
    return product;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    togglePostSuccess: (state) => {
      state.postSuccess = false;
    },
    toggleDeleteSuccess: (state) => {
      state.isDelete = false;
    },
    removeFromList: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.products = [];
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.postSuccess = false;
        state.isError = false;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.postSuccess = true;
        state.isLoading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.products = [];
        state.isLoading = false;
        state.postSuccess = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.isDelete = false;
        state.isError = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isDelete = true;
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.products = [];
        state.isLoading = false;
        state.isDelete = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { togglePostSuccess, toggleDeleteSuccess, removeFromList } =
  productsSlice.actions;

export default productsSlice.reducer;
