// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import inspectionReducer from './slices/inspectionSlice'
const store = configureStore({
  reducer: {
    user: userReducer,
    inspection: inspectionReducer
  },
});

export default store;