import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const API_URL = "customers";
export const getUserState = () => {
  try {
    const user = localStorage.getItem("user");
    if (user === null) return undefined;
    return JSON.parse(user);
  } catch (error) {
    return undefined;
  }
};
const initialState = {
  user: getUserState(),
  status: "idle", //succeeded|| idle || failed || loading
  message: "",
};

// Register user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      console.log(credentials);
      return await requestHandler.axioPost(`${API_URL}`, credentials);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      return await requestHandler.axioPost(`${API_URL}/login`, credentials);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, ThunkAPI) => {
  try {
    return await requestHandler.axioGet(`${API_URL}/logout`);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return ThunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.user = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = "failed";
        state.message = payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        localStorage.setItem("user", "");
      });
  },
});
export const { reseter, setLogout } = authSlice.actions;
export const getUser = (state) => state.auth;
export default authSlice.reducer;
