import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

interface AdminState {
    workers: any[];
    meters: any[];
    inspections: any[];
    routines: any[];
    loading: boolean;
    error: string | null;
    meta: {
        total: number;
        limit: number;
        page: number;
    }
}

const initialState: AdminState = {
    workers: [],
    meters: [],
    inspections: [],
    routines: [],
    loading: false,
    error: null,
    meta: {
        total: 1,
        limit: 1,
        page: 1,
    },
};

// Async thunks
interface FetchWorkersParams {
    name: string;
    reg_no: string;
    page: number;
    limit: number;
}

export const fetchWorkers = createAsyncThunk<FetchWorkersParams, { rejectValue: string }>(
    'admin/fetchWorkers',
    async ({ name, reg_no, page, limit }, { rejectWithValue }) => {
        try {
            let url = `/workers?`;
            if (name) url += `name=${name}&`;
            if (reg_no) url += `regno=${reg_no}&`;
            if (page) url += `page=${page}&`;
            if (limit) url += `limit=${limit}&`;
            const response = await axiosInstance.get(url);
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
                state.workers = action.payload.data;
                state.meta = action.payload.meta;
            })
            .addCase(fetchWorkers.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addWorker.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addWorker.fulfilled, (state, action: PayloadAction<Array<any>>) => {
                state.loading = false;
                state.workers = action.payload.data;
                state.meta = action.payload.meta;
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
                state.workers = action.payload.data;
                state.meta = action.payload.meta;
            })
            .addCase(updateWorker.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default adminSlice.reducer;