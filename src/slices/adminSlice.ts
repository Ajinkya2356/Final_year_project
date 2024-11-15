import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

interface AdminState {
    workers: any[];
    meters: any[];
    inspections: any[];
    routines: any[];
    loading: boolean;
    error: string | null;
    meta?: {
        page: number;
        limit: number;
        total: number;
    };
}

const initialState: AdminState = {
    workers: [],
    meters: [],
    inspections: [],
    routines: [],
    loading: false,
    error: null,
    meta: {
        page: 1,
        limit: 10,
        total: 0,
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
    async ({ name, reg_no, page, limit, recentlyJoined }, { rejectWithValue }) => {
        try {
            let url = `/workers?`;
            if (name) url += `name=${name}&`;
            if (reg_no) url += `reg_no=${reg_no}&`;
            if (page) url += `page=${page}&`;
            if (limit) url += `limit=${limit}&`;
            if (recentlyJoined) url += `sort_by=created_at&sort_order=desc`;
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
        const response = await axiosInstance.post(`/worker`, worker, {
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
        const response = await axiosInstance.put(`/worker/${id}`, worker, {
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

export const getInspections = createAsyncThunk('admin/getInspections', async (params, { rejectWithValue }) => {
    try {
        let url = `/getInspections?`;
        Object.entries(params).forEach(([key, value]) => {
            if (value && value != 'all') url += `${key}=${value}&`;
        });
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const deleteInspection = createAsyncThunk('admin/deleteInspection', async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/remove_inspection/${id}`);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const getRoutines = createAsyncThunk('admin/getRoutines', async (params, { rejectWithValue }) => {
    try {
        let url = `/getRoutines?`;
        Object.entries(params).forEach(([key, value]) => {
            if (value && value != 'all') url += `${key}=${value}&`;
        });
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const getMeters = createAsyncThunk('admin/getMeters', async (params, { rejectWithValue }) => {
    try {
        let url = `/multimeters?`;
        Object.entries(params).forEach(([key, value]) => {
            if (value) url += `${key}=${value}&`;
        });
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const addMeter = createAsyncThunk('admin/addMeter', async (meter, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/multimeter`, meter, {
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

export const updateExistMeter = createAsyncThunk('admin/updateMeter', async ({ id, meter }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`/multimeter/${id}`, meter, {
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

export const deleteMeter = createAsyncThunk('admin/deleteMeter', async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/multimeter/${id}`);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
})

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
                state.workers = action.payload.data;
                state.meta = action.payload.meta;
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
            .addCase(getInspections.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getInspections.fulfilled, (state, action: PayloadAction<Array<any>>) => {
                state.loading = false;
                state.inspections = action.payload.data;
                state.meta = action.payload.meta;
            })
            .addCase(getInspections.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteInspection.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteInspection.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.inspections = action.payload.data;
                state.meta = action.payload.meta;
            })
            .addCase(deleteInspection.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getRoutines.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRoutines.fulfilled, (state, action: PayloadAction<Array<any>>) => {
                state.loading = false;
                state.routines = action.payload.data;
                state.meta = action.payload.meta;
            })
            .addCase(getRoutines.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getMeters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMeters.fulfilled, (state, action: PayloadAction<Array<any>>) => {
                state.loading = false;
                state.meters = action.payload.data;
                state.meta = action.payload.meta;
            })
            .addCase(getMeters.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addMeter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addMeter.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.meters = action.payload.data;
                state.meta = action.payload.meta;
            })
            .addCase(addMeter.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateExistMeter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateExistMeter.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.meters = action.payload.data;
                state.meta = action.payload.meta;
            })
            .addCase(updateExistMeter.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteMeter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMeter.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.meters = action.payload.data;
                state.meta = action.payload.meta;
            })
            .addCase(deleteMeter.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default adminSlice.reducer;