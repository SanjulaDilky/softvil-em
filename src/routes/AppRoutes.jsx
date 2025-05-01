import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import UserProfile from "../pages/UserProfile";
import Login from "../pages/Login";
import EventDetails from "../pages/EventDetails";
import EventManagement from "../pages/EventManagement";

const AppRoutes = () => (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />} >
            <Route index element={<Dashboard />} />
            <Route path="events/:eventId" element={<EventDetails />} />
            <Route path="events/manage" element={<EventManagement />} />
            <Route path="profile/:userId" element={<UserProfile />} />
        </Route>
    </Routes>
);
export default AppRoutes;