import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUpcomingEvents = createAsyncThunk('events/fetchUpcomingEvents', async () => {
    try {
        const response = await axios.get('/api/events/upcoming');
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error('Failed to fetch events:', error);
        throw error; 
    }
});

const upcomingEventsSlice = createSlice({
    name: 'upcomingevents',
    initialState: {
        upcomingevents: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUpcomingEvents.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
                state.upcomingevents = action.payload;
                state.loading = false;
            })
            .addCase(fetchUpcomingEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default upcomingEventsSlice.reducer;
