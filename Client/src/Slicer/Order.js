import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const API_URL = "orders";

const initialState = {
   orders: [],
   status: "idle", //succeeded|| idle || failed || loading
   message: "",
};

export const createOrder = createAsyncThunk(
   "orders/create",
   async (credentials, ThunkAPI) => {
      try {
         const token =
            ThunkAPI.getState().auth.user.token ??
            JSON.parse(localStorage.getItem("user")).token;
         return await requestHandler.axioPostHeader(
            API_URL,
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

export const getOrder = createAsyncThunk(
   "orders/get_all",
   async (_, ThunkAPI) => {
      try {
         const token =
            ThunkAPI.getState().auth.user.token ??
            JSON.parse(localStorage.getItem("user")).token;
         return await requestHandler.axioGetHeader(API_URL, token);
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

export const updateOrder = createAsyncThunk(
   "orders/update",
   async (credentials, ThunkAPI) => {
      try {
         const { _id, ...rest } = credentials;
         const token =
            ThunkAPI.getState().auth.user.token ??
            JSON.parse(localStorage.getItem("user")).token;
         return requestHandler.axioPostHeader(`${API_URL}/${_id}`, rest, token);
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
export const deleteOrder = createAsyncThunk(
   "orders/delete",
   async (credentials, ThunkAPI) => {
      try {
         const token =
            ThunkAPI.getState().auth.user.token ??
            JSON.parse(localStorage.getItem("user")).token;
         return requestHandler.axioDeleteHeader(
            `${API_URL}/${credentials._id}`,
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

const orderslice = createSlice({
   name: "orders",
   initialState,
   reducers: {
      reseter: (state) => {
         state.status = "idle";
         state.message = "";
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(createOrder.pending, (state) => {
            state.status = "loading";
         })
         .addCase(createOrder.fulfilled, (state, { payload }) => {
            state.status = "succeeded";
            // state.orders.push(payload);
         })
         .addCase(createOrder.rejected, (state, { payload }) => {
            state.status = "failed";
            state.message = payload;
         })
         .addCase(getOrder.pending, (state) => {
            state.status = "loading";
         })
         .addCase(getOrder.fulfilled, (state, { payload }) => {
            state.status = "succeeded";
            state.orders = payload.data;
         })
         .addCase(getOrder.rejected, (state, { payload }) => {
            state.status = "failed";
            state.message = payload;
         })
         //update case
         .addCase(updateOrder.pending, (state) => {
            state.status = "loading";
         })
         .addCase(updateOrder.rejected, (state, { payload }) => {
            state.status = "failed";
            state.mesage = payload;
         })
         .addCase(updateOrder.fulfilled, (state, { payload }) => {
            state.status = "succeeded";
            // state.orders.map((s) => (payload._id === s._id ? payload : s));
         })
         //deletecase
         .addCase(deleteOrder.pending, (state) => {
            state.status = "loading";
         })
         .addCase(deleteOrder.rejected, (state, { payload }) => {
            state.status = "failed";
            state.message = payload;
         })
         .addCase(deleteOrder.fulfilled, (state, { payload }) => {
            state.status = "succeeded";
            state.orders.filter((s) => s._id !== payload._id);
         });
   },
});
export const fetchOrder = (state) => state.orders.orders;
export const getOrderById = (state, id) =>
   state.orders.orders.find((c) => c.id === id);
export const { reseter } = orderslice.actions;
export default orderslice.reducer;
