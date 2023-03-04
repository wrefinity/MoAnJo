import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const API_URL = "customers";

const initialState = {
  users: [],
  status: "idle", //idle, loading, failed and succeeded
  message: "",
};

export const getUsers = createAsyncThunk(
  "users/get_all",
  async (_, ThunkAPI) => {
    try {
      const token =
        ThunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      return await requestHandler.axioGetHeader(`${API_URL}/register`, token);
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

export const updateUser = createAsyncThunk(
  "users/update",
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
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (credentials, ThunkAPI) => {
    try {
      const token =
        ThunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      return requestHandler.axioDeleteHeader(
        `${API_URL}/${credentials.id}`,
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

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.users = payload.data;
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.status = "failed";
        state.message = payload;
      })
      //update case
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.status = "failed";
        state.mesage = payload;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.users.map((s) => (payload.data.id === s.id ? payload.data : s));
      })
      //deletecase
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.status = "failed";
        state.message = payload;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.users.filter((us) => us.id !== payload.data.id);
      });
  },
});
export const fetchUsers = (state) => state.users.users;
export const getUsersById = (state, id) =>
  state.users.users.find((c) => c.id === id);
export const { reseter } = userSlice.actions;
export default userSlice.reducer;
