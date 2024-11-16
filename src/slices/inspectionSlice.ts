import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { formatDate } from 'react-datepicker/dist/date_utils';

interface InspectionState {
    inspections: Array<any>;
    analytics: any;
    inspectionsLoading: boolean;
    analyticsLoading: boolean;
    error: string | null;
    meters: Array<any>;
    loading: boolean;
    inspectionStatus: string | null;
    checkLoading: boolean;
}

const initialState: InspectionState = {
    inspections: [],
    meters: [],
    analytics: null,
    inspectionsLoading: false,
    analyticsLoading: false,
    error: null,
    loading: false,
    inspectionStatus: null,
    checkLoading: false,
};

export const getMyInspections = createAsyncThunk(
    'inspections/getMyInspections',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/getInspections');
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


export const getAnalytics = createAsyncThunk(
    'inspections/getAnalytics',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/analytics/numbers`);
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

export const getMeters = createAsyncThunk(
    'inspections/getMeterList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/meterList');
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

export const checkMeter = createAsyncThunk(
    'inspections/checkMeter',
    async ({ image, master }, { rejectWithValue }) => {
        try {
            const form = new FormData();
            form.append("image", image)
            form.append("master", master)
            const response = await axiosInstance.post('/check', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
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

export const createInspection = createAsyncThunk(
    'inspections/createInspection',
    async (result, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/inspect', result);
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

const inspectionSlice = createSlice({
    name: 'inspection',
    initialState,
    reducers: {
        resetInspectionStatus(state) {
            state.inspectionStatus = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyInspections.pending, (state) => {
                state.inspectionsLoading = true;
                state.error = null;
            })
            .addCase(getMyInspections.fulfilled, (state, action: PayloadAction<Array<any>>) => {
                state.inspectionsLoading = false;
                state.inspections = action.payload;
            })
            .addCase(getMyInspections.rejected, (state, action: PayloadAction<any>) => {
                state.inspectionsLoading = false;
                state.error = action.payload;
            })
            .addCase(getAnalytics.pending, (state) => {
                state.analyticsLoading = true;
                state.error = null;
            })
            .addCase(getAnalytics.fulfilled, (state, action: PayloadAction<any>) => {
                state.analyticsLoading = false;
                state.analytics = action.payload;
            })
            .addCase(getAnalytics.rejected, (state, action: PayloadAction<any>) => {
                state.analyticsLoading = false;
                state.error = action.payload;
            })
            .addCase(getMeters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMeters.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.meters = action.payload;
            })
            .addCase(getMeters.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(checkMeter.pending, (state) => {
                state.checkLoading = true;
                state.error = null;
            })
            .addCase(checkMeter.fulfilled, (state, action: PayloadAction<any>) => {
                state.checkLoading = false;
                state.inspectionStatus = action.payload;
            })
            .addCase(checkMeter.rejected, (state, action: PayloadAction<any>) => {
                state.checkLoading = false;
                state.error = action.payload;
            })
            .addCase(createInspection.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createInspection.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
            })
            .addCase(createInspection.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
            })
    },
});
export const { resetInspectionStatus } = inspectionSlice.actions;
export default inspectionSlice.reducer;