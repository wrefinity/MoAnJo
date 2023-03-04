import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const API_URL = "categories";

const initialState = {
  categories: [],
  status: "idle", //succeeded|| idle || failed || loading
  message: "",
};

export const createCategories = createAsyncThunk(
  "category/create",
  async (credentials, ThunkAPI) => {
    try {
      const token =
        ThunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      return await requestHandler.axioPostHeader(API_URL, credentials, token);
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

export const getCategories = createAsyncThunk(
  "category/get_all",
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

export const updateCategories = createAsyncThunk(
  "category/update",
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
export const deleteCategories = createAsyncThunk(
  "category/delete",
  async (credentials, ThunkAPI) => {
    try {
      const token =
        ThunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      return requestHandler.axioDeleteHeader(
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

const categorieslice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategories.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.categories.push(payload);
      })
      .addCase(createCategories.rejected, (state, { payload }) => {
        state.status = "failed";
        state.message = payload;
      })
      .addCase(getCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.categories = payload.data?.categories;
        state.status = "idle";
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.status = "failed";
        state.message = payload;
      })
      //update case
      .addCase(updateCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCategories.rejected, (state, { payload }) => {
        state.status = "failed";
        state.mesage = payload;
      })
      .addCase(updateCategories.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.categories.map((s) => (payload.id === s.id ? payload : s));
      })
      //deletecase
      .addCase(deleteCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategories.rejected, (state, { payload }) => {
        state.status = "failed";
        state.message = payload;
      })
      .addCase(deleteCategories.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.categories.filter((s) => s.id !== payload.id);
      });
  },
});
export const fetchcategories = (state) => state.categories.categories;
export const getCategoriesById = (state, id) =>
  state.categories.categories.find((c) => c.id === id);
export const { reseter } = categorieslice.actions;
export default categorieslice.reducer;
