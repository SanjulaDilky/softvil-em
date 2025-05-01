import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEvents } from "../features/events/allEventsSlice";
import { Link } from "react-router-dom";
import { CalendarDaysIcon, ClockIcon, MapIcon } from "lucide-react";
import AddEventModal from "../components/eventManager/AddEventModal";


export default function EventManagement() {
    const dispatch = useDispatch();
    const { allevents, loading, error } = useSelector(state => state.allevents);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(fetchAllEvents());
    }, [dispatch]);

    if (loading) return <div>Loading events...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8 py-6 bg-transparent rounded-lg">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold text-white">Manage Events</h1>
                        <p className="mt-2 text-sm text-gray-300">
                            A list of all the users in your account including their name, title, email and role.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            onClick={() => setShowModal(true)}
                            type="button"
                            className="block cursor-pointer rounded-lg bg-[#3b82f6] hover:opacity-90 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add Event
                        </button>
                    </div>
                </div>
                <div className="-mx-4 mt-8 sm:-mx-0 bg-[#363939]">
                    <table className="min-w-full divide-y divide-gray-100 bg-transparent text-gray-400 border-separate border-spacing-y-4 rounded-lg">
                        <thead className="hidden md:table-header-group">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Event Name</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Location</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold"><span className="sr-only">Action</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {allevents.map((event) => (
                                <tr key={event.id} className="flex flex-col md:table-row md:flex-row md:items-center  rounded-lg">
                                    <td className="flex flex-col md:table-cell px-4 py-4">
                                        {/* Desktop */}
                                        <div className="hidden md:flex gap-2 items-center">
                                            <img
                                                src={event.imageSrc}
                                                alt={event.imageAlt}
                                                className="w-10 h-10 rounded object-cover"
                                            />
                                            <div className="text-white">{event.name}</div>
                                        </div>

                                        {/* Mobile */}
                                        <div className="md:hidden flex flex-col gap-2">
                                            <div className="flex justify-between w-full">
                                                {/* Left side: image + text */}
                                                <div className="flex gap-4">
                                                    <img
                                                        src={event.imageSrc}
                                                        alt={event.imageAlt}
                                                        className="w-10 h-10 rounded object-cover"
                                                    />
                                                    <div className="flex flex-col justify-center">
                                                        <div className="text-white text-sm">{event.name}</div>
                                                        <div className="text-sm text-gray-400">{event.category}</div>
                                                    </div>
                                                </div>

                                                {/* Right side: status badge */}
                                                <div className="self-start">
                                                    <span
                                                        className={`inline-block rounded-full px-2 py-0.5 pb-1 text-xs font-medium ${event.status === 'completed'
                                                            ? 'bg-green-800 text-green-200'
                                                            : 'bg-yellow-700 text-yellow-100'
                                                            }`}
                                                    >
                                                        {event.status}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Edit/View buttons (mobile only) */}
                                            <div className="flex gap-4 pl-14 pt-2">
                                                <Link className="text-[#6ee7b7] hover:text-indigo-200 text-sm">Edit</Link>
                                                <Link
                                                    to={`/events/${event.id}`}
                                                    className="text-[#3b82f6] hover:text-indigo-200 text-sm"
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        </div>
                                    </td>


                                    <td className="hidden md:table-cell px-4 py-4 text-sm text-white">{event.category}</td>

                                    <td className="hidden md:table-cell px-4 py-4 text-sm">
                                        <div className="flex items-center text-white text-sm">
                                            <CalendarDaysIcon className="w-4 h-4 mr-2 text-white" />
                                            <span>
                                                {event.date}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="hidden md:table-cell px-4 py-4 text-sm">
                                        <div className="flex items-center text-white text-sm">
                                            <MapIcon className="w-4 h-4 mr-2 text-white" />
                                            <span>
                                                {event.venuse}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="hidden md:table-cell px-4 py-4 text-sm">
                                        <span
                                            className={`inline-block rounded-full px-2 py-0.5 pb-1 text-xs font-medium ${event.status === 'completed'
                                                ? 'bg-green-800 text-green-200'
                                                : 'bg-yellow-700 text-yellow-100'
                                                }`}
                                        >
                                            {event.status}
                                        </span>
                                    </td>

                                    <td className="hidden md:table-cell px-4 py-0 pb-4 lg:pb-0 lg:py-4 text-sm space-x-2">
                                        <Link className="text-[#6ee7b7] hover:text-indigo-200">Edit</Link>
                                        <Link to={`/events/${event.id}`} className="text-[#3b82f6] hover:text-indigo-200">View</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
            <AddEventModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </>
    )
}
