import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

interface AdminState {
    workers: any[];
    meters: any[];
    inspections: any[];
    routines: any[];
    loading: boolean;
    error: string | null;
}

const initialState: AdminState = {
    workers: [],
    meters: [],
    inspections: [],
    routines: [],
    loading: false,
    error: null,
};

// Async thunks
interface FetchWorkersParams {
    name: string;
    regno: string;
}

export const fetchWorkers = createAsyncThunk<FetchWorkersParams, { rejectValue: string }>(
    'admin/fetchWorkers',
    async ({ name, regno }, { rejectWithValue }) => {
        try {
            let url = `/workers?`;
            if (name) url += `name=${name}&`;
            if (regno) url += `regno=${regno}&`;
            const response = await axiosInstance.get(url);
            return response.data.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const addWorker = createAsyncThunk('admin/addWorker', async (worker, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/worker', worker, {
            headers: {
                'Content-Type': 'multipart/form-data',
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
});

export const updateWorker = createAsyncThunk('admin/updateWorker', async ({ id, worker }, { rejectWithValue }) => {
    try {
        const data = new FormData();
        data.append('name', worker.name);
        data.append('reg_no', worker.reg_no);
        data.append('password', worker.password);
        if (worker.photo) {
            data.append('photo', worker.photo);
        }
        const response = await axiosInstance.put(`/worker/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
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
});

export const deleteWorker = createAsyncThunk('admin/deleteWorker', async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/worker/${id}`)
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const fetchMeters = createAsyncThunk('admin/fetchMeters', async () => {
    const response = await axios.get('/api/meters');
    return response.data;
});

export const fetchInspections = createAsyncThunk('admin/fetchInspections', async () => {
    const response = await axios.get('/api/inspections');
    return response.data;
});

export const fetchRoutines = createAsyncThunk('admin/fetchRoutines', async () => {
    const response = await axios.get('/api/routines');
    return response.data;
});

export const removeInspection = createAsyncThunk('admin/removeInspection', async (id: string) => {
    await axios.delete(`/api/inspections/${id}`);
    return id;
});

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWorkers.fulfilled, (state, action: PayloadAction<Array<any>>) => {
                state.loading = false;
                state.workers = action.payload;
            })
            .addCase(fetchWorkers.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addWorker.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addWorker.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addWorker.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteWorker.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteWorker.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
            })
            .addCase(deleteWorker.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateWorker.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateWorker.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
            })
            .addCase(updateWorker.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default adminSlice.reducer;