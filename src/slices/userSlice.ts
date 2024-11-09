// src/reducers/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
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
        withCredentials: true,
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


export const loadUser = createAsyncThunk(
  'user/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      // Check if token is in localStorage first
      const token = localStorage.getItem('access_token');

      // Define request options
      let requestOptions = {
        url: `${BASE_URL}/me`,
        method: 'GET',
        withCredentials: true, // Allows HTTP-only cookies to be sent automatically
      };

      // If token exists in localStorage, add Authorization header
      if (token) {
        requestOptions.headers = { Authorization: `Bearer ${token}` };
      } else {
        console.log('Using cookies for authentication');
      }

      // Make the API request
      const response = await axios(requestOptions);

      // Return user data if request succeeds
      return response.data;
    } catch (error) {
      // Handle both network and server errors gracefully
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
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
