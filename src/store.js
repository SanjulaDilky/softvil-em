import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import upcomingEventsReducer from './features/events/upcomingEventsSlice';
import allgEventsReducer from './features/events/allEventsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    upcomingevents: upcomingEventsReducer,
    allevents: allgEventsReducer,
  },
});
