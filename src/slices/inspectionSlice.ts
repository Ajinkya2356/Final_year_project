import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { keyframes } from '@emotion/react';

interface InspectionState {
    inspections: Array<any>;
    analytics: any;
    inspectionsLoading: boolean;
    analyticsLoading: boolean;
    error: string | null;
}

const initialState: InspectionState = {
    inspections: [],
    analytics: null,
    inspectionsLoading: false,
    analyticsLoading: false,
    error: null,
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
    async ({ meterType, startDate, endDate }: { meterType: string; startDate: Date | null; endDate: Date | null }, { rejectWithValue }) => {
        try {
            console.log(startDate,endDate)
            const params: any = {};
            if (meterType) params.meter_type = meterType;
            if (startDate) params['start_date'] = new Intl.DateTimeFormat('en-GB').format(startDate);
            if (endDate) params['end_date'] = new Intl.DateTimeFormat('en-GB').format(endDate);

            const queryString = new URLSearchParams(params).toString();
            console.log(params)
            const url = `/analytics/numbers?${queryString}`;

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

const inspectionSlice = createSlice({
    name: 'inspection',
    initialState,
    reducers: {},
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
            });
    },
});

export default inspectionSlice.reducer;