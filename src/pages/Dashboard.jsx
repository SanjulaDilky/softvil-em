import { useDispatch, useSelector } from "react-redux";
import EventCard from "../components/EventCard";
import { useEffect, useMemo, useState } from "react";
import { fetchUpcomingEvents } from "../features/events/upcomingEventsSlice";
import { fetchAllHosts } from "../features/events/eventHostSlice";
import { isSameDay, parse } from "date-fns";
import { Navigate } from "react-router-dom";
import { XCircleIcon } from "lucide-react";

const Dashboard = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { upcomingevents, loading, error } = useSelector(state => state.upcomingevents);
    const { allHosts } = useSelector(state => state.allhosts);
    const [selectedHost, setSelectedHost] = useState("");
    const [selectedDate, setSelectedDate] = useState("");


    useEffect(() => {
        dispatch(fetchUpcomingEvents());
        dispatch(fetchAllHosts());
    }, [dispatch]);

    const handleHostSelect = (e) => {
        setSelectedHost(e.target.value);
    };

    const handleDateSelect = (e) => {
        setSelectedDate(e.target.value);
    };

    const filteredEvents = useMemo(() => {
        return upcomingevents?.filter(event => {
            const hostMatch = selectedHost ? event.host === selectedHost : true;
            const eventDate = parse(event.date, 'dd-MM-yyyy', new Date());
            const inputDate = selectedDate ? parse(selectedDate, 'yyyy-MM-dd', new Date()) : null;

            const dateMatch = selectedDate ? isSameDay(eventDate, inputDate) : true;

            return hostMatch && dateMatch;
        });
    }, [upcomingevents, selectedHost, selectedDate]);

    if (loading) return <div>Loading events...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <div className="bg-[#222323]">
                <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col">

                    <div>
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-y-4">
                            <h2 className="text-xl font-bold text-white">Upcoming Events</h2>
                            <div>
                                <div className="flex flex-row gap-x-4 md:justify-end">
                                    <div className="flex flex-col gap-y-1">
                                        <label htmlFor="host" className="block text-sm font-medium text-gray-200">Host</label>
                                        <select
                                            id="host"
                                            className="mt-1 block w-full px-3 py-2.5 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2"
                                            onChange={handleHostSelect}
                                            value={selectedHost}
                                        >
                                            <option value="">Select Host</option>
                                            {allHosts.map((host, index) => (
                                                <option key={index} value={host}>{host}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-y-1">
                                        <label htmlFor="date" className="block text-sm font-medium text-gray-200">What is your free date</label>
                                        <input
                                            type="date"
                                            id="date"
                                            onChange={handleDateSelect}
                                            value={selectedDate}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2"
                                        />
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedHost("");
                                            setSelectedDate("");
                                        }}
                                        className="self-end mt-6 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                                        title="Clear Filters"
                                    >
                                        <XCircleIcon className="h-6 w-6" />
                                    </button>
                                </div>


                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                            {filteredEvents.map((event) => (
                                <EventCard event={event} key={event.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
