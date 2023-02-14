import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const API_URL = "cart";

const initialState = {
  cart: [],
  status: "idle", //succeeded|| idle || failed || loading
  message: "",
};

export const createCart = createAsyncThunk(
  "cart/create",
  async (credentials, ThunkAPI) => {
    try {
      const token =
        ThunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      return await requestHandler.axioPostHeader(
        `${API_URL}/add`,
        credentials,
        token
      );
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

export const getCart = createAsyncThunk(
  "cart/get_all",
  async (credentials, ThunkAPI) => {
    try {
      const token =
        ThunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      return await requestHandler.axioGetHeader(
        `${API_URL}/${credentials}`,
        token
      );
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

export const updateCart = createAsyncThunk(
  "cart/update",
  async (credentials, ThunkAPI) => {
    try {
      const token =
        ThunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      requestHandler.axioPostHeader(
        `${API_URL}/add/${credentials?.user_id}/${credentials.product._id}`,
        credentials?.product,
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
export const deleteCart = createAsyncThunk(
  "cart/delete",
  async (credentials, ThunkAPI) => {
    const { userId, productId } = credentials;
    try {
      const token =
        ThunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      return requestHandler.axioDeleteHeader(
        `${API_URL}/delete/${userId}/${productId}`,
        {},
        token
      );
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

export const removeCart = createAsyncThunk(
  "cart/delete",
  async (credentials, ThunkAPI) => {
    try {
      const token =
        ThunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      return requestHandler.axioDelete(`${API_URL}/delete/${credentials}`);
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

const Cartlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCart.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.Cart.push(payload);
      })
      .addCase(createCart.rejected, (state, { payload }) => {
        state.status = "failed";
        state.message = payload;
      })
      .addCase(getCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        console.log("from slice");
        console.log(payload.data.cart.products);
        state.cart = payload.data.cart.products;
      })
      .addCase(getCart.rejected, (state, { payload }) => {
        state.status = "failed";
        state.message = payload;
      })
      //update case
      .addCase(updateCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCart.rejected, (state, { payload }) => {
        state.status = "failed";
        state.mesage = payload;
      })
      .addCase(updateCart.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.cart.map((s) => (payload._id === s._id ? payload : s));
      })
      //deletecase
      .addCase(deleteCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCart.rejected, (state, { payload }) => {
        state.status = "failed";
        state.message = payload;
      })
      .addCase(deleteCart.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        // state.Cart.filter((s) => s._id !== payload._id);
      });
  },
});
export const fetchCart = (state) => state.cart.cart;
export const getCartById = (state, id) =>
  state.cart.cart.find((c) => c.id === id);
export const { reseter } = Cartlice.actions;
export default Cartlice.reducer;
