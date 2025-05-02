
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addEvent } from '../../features/events/allEventsSlice';
import { useState } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';

function AddEventModal({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const [tickets, setTickets] = useState([]);
    const [attendees, setAttendees] = useState([]);
    const [ticketInput, setTicketInput] = useState({ type: '', price: '', status: '' });
    const [attendeeInput, setAttendeeInput] = useState('');

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    if (!isOpen) return null;

    const handleAddTicket = () => {
        if (ticketInput.type && ticketInput.price && ticketInput.status) {
            setTickets([...tickets, { ...ticketInput, id: Date.now() }]);
            setTicketInput({ type: '', price: '', status: '' });
        }
    };

    const handleAddAttendee = () => {
        if (attendeeInput.trim()) {
            setAttendees([...attendees, { id: Date.now(), name: attendeeInput }]);
            setAttendeeInput('');
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };


    const onSubmit = async (data) => {
        try {
            const newEvent = {
                id: Date.now(),
                name: data.name,
                category: data.category,
                description: data.description,
                href: '#',
                attendees: attendees.map((name, idx) => ({ id: idx + 1, name: name.name })),
                host: data.host,
                imageSrc: data.imageSrc,
                imageAlt: data.name,
                date: data.date,
                time: data.time,
                venuse: data.venue,
                status: data.status,
                tickets: tickets.map((ticket, idx) => ({ id: idx + 1, ...ticket })),
            };

            const response = await axios.post('/api/events', newEvent);

            dispatch(addEvent(response.data));
            handleClose();
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur  min-w-1/2">
            <div className="relative bg-[#222323] rounded-lg p-6 w-full max-w-md text-black shadow-lg overflow-y-auto max-h-[90vh]">
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 text-white hover:text-red-400 text-xl font-bold"
                    aria-label="Close"
                >
                    &times;
                </button>
                <h2 className="text-xl font-semibold mb-4 text-white">Add New Event</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Event Name</label>
                            <input
                                type="text"
                                id="name"
                                {...register('name', { required: 'Event name is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-300"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="imageSrc" className="block text-sm font-medium text-gray-300">Image URL</label>
                            <input
                                type="url"
                                id="imageSrc"
                                {...register('imageSrc', { required: 'Image URL is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-300"
                                placeholder="https://example.com/image.jpg"
                            />
                            {errors.imageSrc && <p className="text-red-500 text-xs mt-1">{errors.imageSrc.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-300">Category</label>
                            <input
                                type="text"
                                id="category"
                                {...register('category', { required: 'Category is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-300"
                            />
                            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                            <textarea
                                id="description"
                                {...register('description', { required: 'Description is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-500 placeholder:text-gray-500"
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-300">Date</label>
                            <input
                                type="date"
                                id="date"
                                {...register('date', { required: 'Date is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-500 placeholder:text-gray-500"
                            />
                            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-300">Time</label>
                            <input
                                type="time"
                                id="time"
                                {...register('time', { required: 'Time is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-300"
                            />
                            {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="venue" className="block text-sm font-medium text-gray-300">Venue</label>
                            <input
                                type="text"
                                id="venue"
                                {...register('venue', { required: 'Venue is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-300"
                            />
                            {errors.venue && <p className="text-red-500 text-xs mt-1">{errors.venue.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="host" className="block text-sm font-medium text-gray-300">Event Host</label>
                            <input
                                type="text"
                                id="host"
                                {...register('host', { required: 'Event host is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-300"
                            />
                            {errors.host && <p className="text-red-500 text-xs mt-1">{errors.host.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-300">Status</label>
                            <select
                                id="status"
                                {...register('status', { required: 'Status is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-300"
                            >
                                <option value="upcoming">Upcoming</option>
                                <option value="completed">Completed</option>
                            </select>
                            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
                        </div>
                        <div className="mt-6">
                            <h4 className="font-semibold text-white mb-2">Tickets</h4>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 items-center">
                                <div>
                                    <label htmlFor="ticketType" className="block text-sm font-medium text-gray-300">Type</label>
                                    <input
                                        id="ticketType"
                                        type="text"
                                        value={ticketInput.type}
                                        onChange={e => setTicketInput({ ...ticketInput, type: e.target.value })}
                                        placeholder="e.g., Gold"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-300 placeholder:text-gray-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-300">Price</label>
                                    <input
                                        id="ticketPrice"
                                        type="text"
                                        value={ticketInput.price}
                                        onChange={e => setTicketInput({ ...ticketInput, price: e.target.value })}
                                        placeholder="e.g., 2500 LKR"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-300 placeholder:text-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-1">Status</label>
                                    <div
                                        onClick={() =>
                                            setTicketInput({
                                                ...ticketInput,
                                                status: ticketInput.status === 'Available' ? 'Sold Out' : 'Available',
                                            })
                                        }
                                        className={`w-14 h-7 flex items-center bg-gray-400 rounded-full p-1 cursor-pointer transition-colors ${ticketInput.status === 'Available' ? 'bg-green-500' : 'bg-red-500'
                                            }`}
                                    >
                                        <div
                                            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform  text-gray-300 ${ticketInput.status === 'Available' ? 'translate-x-7' : ''
                                                }`}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-300 mt-1 block">
                                        {ticketInput.status}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleAddTicket}
                                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 underline text-sm font-medium transition"
                            >
                                <Plus className="w-4 h-4" />
                                Add
                            </button>
                            <ul className="mt-3 text-sm text-gray-300 space-y-1">
                                {tickets.map(ticket => (
                                    <li key={ticket.id}>🎟️ {ticket.type} - {ticket.price} ({ticket.status})</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h4 className="font-semibold text-white mb-2">Attendees</h4>

                        <div className="flex items-end gap-2 mb-2">
                            <div className="w-full">
                                <label htmlFor="attendee" className="block text-sm font-medium text-gray-300">Attendee Name</label>
                                <input
                                    type="text"
                                    id="attendee"
                                    value={attendeeInput}
                                    onChange={e => setAttendeeInput(e.target.value)}
                                    placeholder="Enter name"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-400  text-gray-400 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] placeholder-gray-400"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleAddAttendee}
                                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 underline text-sm font-medium transition"
                            >
                                <Plus className="w-4 h-4" />Add
                            </button>

                        </div>

                        <ul className="text-sm text-gray-300 space-y-1">
                            {attendees.map(att => (
                                <li key={att.id}>👤 {att.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#3f5373]"
                        >
                            Save Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEventModal;
