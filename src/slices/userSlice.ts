// src/reducers/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../constant';

interface UserState {
  isAuthenticated: boolean;
  userData: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  userData: null,
  loading: false,
  error: null,
};

// Create an asynchronous thunk for logging in a user
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser(state) {
      state.isAuthenticated = false;
      state.userData = null;
      localStorage.removeItem('access to');
    },
    initializeAuthState(state) {
      const storedUserData = localStorage.getItem('access token');
      if (storedUserData) {
        state.isAuthenticated = true;
        state.userData = JSON.parse(storedUserData);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userData = action.payload;
        state.loading = false;
        localStorage.setItem('userData', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutUser, initializeAuthState } = userSlice.actions;
export default userSlice.reducer;