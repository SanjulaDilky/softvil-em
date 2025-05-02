import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllHosts = createAsyncThunk('events/fetchAllEventsHosts', async () => {
    try {
        const response = await axios.get('/api/upcoming-events/hosts');
        
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error('Failed to fetch events hosts:', error);
        throw error;
    }
});

const eventHostSlice = createSlice({
    name: 'allhosts',
    initialState: {
        allHosts: [],
        loadingHosts: false,
        errorHost: null,
    },
    reducers: {
        addHosts: (state, action) => {
            state.allHosts=action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllHosts.pending, (state) => {
                state.loadingHosts = true;
            })
            .addCase(fetchAllHosts.fulfilled, (state, action) => {
                state.allHosts = action.payload;
                state.loadingHosts = false;
            })
            .addCase(fetchAllHosts.rejected, (state) => {
                state.loadingHosts = false; 
            });
    },
});
export const { addHosts } = eventHostSlice.actions;
export default eventHostSlice.reducer;
