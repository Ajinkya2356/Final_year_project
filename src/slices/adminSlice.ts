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
            .addCase(fetchMeters.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMeters.fulfilled, (state, action) => {
                state.loading = false;
                state.meters = action.payload;
            })
            .addCase(fetchMeters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch meters';
            })
            .addCase(fetchInspections.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchInspections.fulfilled, (state, action) => {
                state.loading = false;
                state.inspections = action.payload;
            })
            .addCase(fetchInspections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch inspections';
            })
            .addCase(fetchRoutines.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRoutines.fulfilled, (state, action) => {
                state.loading = false;
                state.routines = action.payload;
            })
            .addCase(fetchRoutines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch routines';
            })
            .addCase(removeInspection.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeInspection.fulfilled, (state, action) => {
                state.loading = false;
                state.inspections = state.inspections.filter(inspection => inspection.id !== action.payload);
            })
            .addCase(removeInspection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to remove inspection';
            });
    },
});

export default adminSlice.reducer;