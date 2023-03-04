import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const API_URL = "products";

const initialState = {
  products: [],
  status: "idle", //succeeded|| idle || failed || loading
  message: "",
};

export const createProduct = createAsyncThunk(
  "products/create",
  async (credentials, ThunkAPI) => {
    try {
      const token = ThunkAPI.getState().auth.user.token
        ? ThunkAPI.getState().auth.user.token
        : JSON.parse(localStorage.getItem("user")).token;
      await requestHandler.axioPostHeader(API_URL, credentials, token);
      return { success: true };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message.toString() ||
        error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/get_all",
  async (_, ThunkAPI) => {
    try {
      return await requestHandler.axioGet(API_URL);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message.toString() ||
        error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (credentials, ThunkAPI) => {
    try {
      const { id, ...rest } = credentials;
      const token =
        ThunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      return requestHandler.axioPatchHeader(`${API_URL}/${id}`, rest, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message.toString() ||
        error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (credentials, ThunkAPI) => {
    try {
      const token =
        ThunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      await requestHandler.axioPostHeader(
        `${API_URL}/${credentials.id}`,
        credentials,
        token
      );
      return { success: true };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message.toString() ||
        error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.products.push(payload);
      })
      .addCase(createProduct.rejected, (state, { payload }) => {
        state.status = "failed";
        state.message = payload;
      })
      .addCase(getProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.products = payload.data;
        state.status = "idle";
      })
      .addCase(getProduct.rejected, (state, { payload }) => {
        state.status = "failed";
        state.message = payload;
      })
      //update case
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.status = "failed";
        state.mesage = payload;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.products.map((s) => (payload.id === s.id ? payload : s));
      })
      //deletecase
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.status = "failed";
        state.message = payload;
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.products.filter((s) => s.id !== payload.id);
      });
  },
});
export const fetchProduct = (state) => state.products.products;
export const getProductById = (state, id) =>
  state.products.products.find((c) => c.id === id);
export const { reseter } = productSlice.actions;
export default productSlice.reducer;
