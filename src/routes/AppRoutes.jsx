import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import UserProfile from "../pages/UserProfile";
import Login from "../pages/Login";
import EventDetails from "../pages/EventDetails";
import EventManagement from "../pages/EventManagement";
import { useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
    const { user } = useSelector((state) => state.user);

    return (
        <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/" element={<PrivateRoute element={<MainLayout />} />}>
                <Route index element={<Dashboard />} />
                <Route path="events/:eventId" element={<EventDetails />} />
                <Route path="events/manage" element={<EventManagement />} />
                <Route path="profile/:userId" element={<UserProfile />} />
            </Route>
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>
    );
};

export default AppRoutes;