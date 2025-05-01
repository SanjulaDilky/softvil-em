import { useDispatch, useSelector } from "react-redux";
import EventCard from "../components/EventCard";
import { useEffect } from "react";
import { fetchUpcomingEvents } from "../features/events/upcomingEventsSlice";

const Dashboard = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { upcomingevents, loading, error } = useSelector(state => state.upcomingevents);
    
    useEffect(() => {
        dispatch(fetchUpcomingEvents());
    }, [dispatch]);

    if (loading) return <div>Loading events...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!user) {
        return <Navigate to="/login" />;
    }
    return (
        <>
            <div className="bg-[#222323]">
                <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-bold text-white">Upcoming Events</h2>

                    <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                        {upcomingevents.map((event) => (
                            <EventCard event={event} key={event?.id}/>
                        ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
export default Dashboard;