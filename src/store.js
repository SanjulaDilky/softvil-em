import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import upcomingEventsReducer from './features/events/upcomingEventsSlice';
import allgEventsReducer from './features/events/allEventsSlice';
import allEventsHostReducer from './features/events/eventHostSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    upcomingevents: upcomingEventsReducer,
    allevents: allgEventsReducer,
    allhosts: allEventsHostReducer,
  },
});
