import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllEvents = createAsyncThunk('events/fetchAllEvents', async () => {
    try {
        const response = await axios.get('/api/events/all');
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error('Failed to fetch events:', error);
        throw error;
    }
});

const allEventsSlice = createSlice({
    name: 'allevents',
    initialState: {
        allevents: [],
        loading: false,
        error: null,
    },
    reducers: {
        addEvent: (state, action) => {
            state.allevents.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllEvents.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllEvents.fulfilled, (state, action) => {
                state.allevents = action.payload;
                state.loading = false;
            })
            .addCase(fetchAllEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});
export const { addEvent } = allEventsSlice.actions;
export default allEventsSlice.reducer;
