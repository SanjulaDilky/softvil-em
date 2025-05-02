import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "../components/userProfile/Modal";
import { Calendar, MapPin } from "lucide-react";


const UserProfile = () => {
    const { user } = useSelector(state => state.user);
    const [attendingEvents, setAttendingEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEventIds, setSelectedEventIds] = useState([]);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const fetchUserEvents = useCallback(async () => {
        try {
            const res = await axios.get(`/api/user/${user.id}/events`);
            setAttendingEvents(res.data);
        } catch (error) {
            console.error("Failed to fetch attending events", error);
            toast.error("Failed to load your attending events.");
        }
    }, [user.id]);

    useEffect(() => {
        fetchUserEvents();
    }, [fetchUserEvents]);

    const fetchAllEvents = async () => {
        try {
            const res = await axios.get("/api/events/all");
            setAllEvents(res.data);
        } catch (error) {
            console.error("Failed to fetch all events", error);
            toast.error("Failed to load all events.");
        }
    };

    const handleCheckboxChange = (eventId) => {
        setSelectedEventIds(prev =>
            prev.includes(eventId)
                ? prev.filter(id => id !== eventId)
                : [...prev, eventId]
        );
    };

    const handleSubmit = async () => {
        setLoadingSubmit(true);
        try {
            const eventsToAdd = allEvents.filter(event =>
                selectedEventIds.includes(event.id)
            );
            for (const event of eventsToAdd) {
                await axios.post(`/api/user/${user.id}/events`, event);
            }
            toast.success("Events added successfully!");
            setIsModalOpen(false);
            setSelectedEventIds([]);
            fetchUserEvents();
        } catch (error) {
            console.error("Failed to add events", error);
            toast.error("Failed to add selected events.");
        } finally {
            setLoadingSubmit(false);
        }
    };

    useEffect(() => {
        fetchUserEvents();
        fetchAllEvents();
    }, [fetchUserEvents]);

    const remainingEvents = allEvents.filter(
        event => !attendingEvents.some(e => e.id === event.id)
    );

    return (
        <div className="bg-[#222323]">
            <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-x-8">
                    <div className="flex-1 bg-[#363939] p-6 rounded-lg">
                        <h2 className="text-white text-lg font-semibold">My Profile</h2>
                        <div className="flex flex-col items-center justify-center h-full">
                            <img alt="" src={`/users/${user.image}`} className="size-28 rounded-full" />
                            <h3 className="mt-6 text-white font-semibold">{user.name}</h3>
                            <p className="text-gray-300 text-sm">{user.role}</p>
                            <p className="text-gray-300 text-sm">{user.email}</p>
                        </div>
                    </div>

                    <div className="flex-1 bg-[#363939] p-6 rounded-lg mt-6 lg:mt-0">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-white text-lg font-semibold">Attending Events</h2>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-[#3b82f6] text-white px-4 py-2 rounded-lg hover:bg-[#3f5373] cursor-pointer"
                            >
                                Add Events
                            </button>
                        </div>
                        {attendingEvents.length === 0 ? (
                            <p className="text-gray-400">You are not attending any events yet.</p>
                        ) : (
                            <table className="w-full text-left text-sm text-gray-300">
                               
                                <tbody>
                                    {attendingEvents.map(event => (
                                        <tr key={event.id} className="border-b border-gray-600 hover:bg-[#2a2c2c]">
                                            <td className="hidden lg:block p-2 lg:w-auto">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={event.imageSrc}
                                                        alt={event.imageAlt}
                                                        className="w-10 h-10 object-cover rounded-md"
                                                    />
                                                    <span className="text-white">{event.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-2 lg:w-auto">
                                                <div className="hidden lg:flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                    <span className="text-xs lg:text-sm">{event.date}</span>
                                                </div>
                                                <div className="hidden lg:flex items-center gap-2 mt-2">
                                                    <MapPin className="w-4 h-4 text-gray-400" />
                                                    <span className="text-xs lg:text-sm">{event.venuse}</span>
                                                </div>

                                                {/* Mobile view: Stack content in one column */}
                                                <div className="lg:hidden mt-3">
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={event.imageSrc}
                                                            alt={event.imageAlt}
                                                            className="w-10 h-10 object-cover rounded-md"
                                                        />
                                                        <span className="text-white">{event.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Calendar className="w-4 h-4 text-gray-400" />
                                                        <span>{event.date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <MapPin className="w-4 h-4 text-gray-400" />
                                                        <span>{event.venuse}</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <h3 className="text-lg font-semibold mb-4 text-white">Select Events to Attend</h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                        {remainingEvents.length === 0 ? (
                            <p className="text-gray-400">No more events available to attend.</p>
                        ) : (
                            remainingEvents?.map(event => (
                                <label
                                    key={event.id}
                                    className="flex items-start gap-4 p-3 bg-[#2c2c2e] rounded-lg mb-3 hover:bg-[#3a3a3d] transition cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedEventIds.includes(event.id)}
                                        onChange={() => handleCheckboxChange(event.id)}
                                        className="mt-2 accent-[#3b82f6]"
                                    />
                                    <img
                                        src={event.imageSrc}
                                        alt={event.imageAlt}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <div className="text-white text-sm flex-1">
                                        <div className="font-semibold">{event.name}</div>
                                        <div className="flex items-center gap-2 mt-1 text-gray-300">
                                            <Calendar size={14} /> <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <MapPin size={14} /> <span>{event.venuse}</span>
                                        </div>
                                    </div>
                                </label>
                            ))
                        )}
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={loadingSubmit || selectedEventIds.length === 0}
                        className={`mt-4 px-4 py-2 rounded text-white ${loadingSubmit
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-500"
                            }`}
                    >
                        {loadingSubmit ? "Submitting..." : "Confirm Selection"}
                    </button>
                </Modal>
            )}
        </div>
    );
};

export default UserProfile;
