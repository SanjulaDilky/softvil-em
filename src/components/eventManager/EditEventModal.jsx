import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateEvent } from '../../features/events/allEventsSlice';

export default function EditEventModal({ isOpen, event, onClose }) {
    const dispatch=useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [ticketInput, setTicketInput] = useState({ type: '', price: '', status: 'Available' });
    const [tickets, setTickets] = useState([]);
    const [attendeeInput, setAttendeeInput] = useState('');
    const [attendees, setAttendees] = useState([]);

    useEffect(() => {
        if (event) {
            const normalizedDate = (() => {
                if (!event.date) return '';
                if (/^\d{4}-\d{2}-\d{2}$/.test(event.date)) {
                    return event.date; 
                }
                if (/^\d{2}-\d{2}-\d{4}$/.test(event.date)) {
                    const [day, month, year] = event.date.split('-');
                    return `${year}-${month}-${day}`; 
                }
                return ''; 
            })();

            const normalizedTime = (() => {
                if (!event.time) return '';
                if (/^\d{2}:\d{2}$/.test(event.time)) {
                    return event.time; 
                }
                if (/^\d{1,2}\.\d{2} ?(AM|PM)$/i.test(event.time)) {
                    const [hourStr, minuteStrWithPeriod] = event.time.split('.');
                    const [minuteStr, period] = minuteStrWithPeriod.split(/ (AM|PM)/i).filter(Boolean);
                    let hour = parseInt(hourStr);
                    const minute = minuteStr;
                    if (period.toUpperCase() === 'PM' && hour !== 12) hour += 12;
                    if (period.toUpperCase() === 'AM' && hour === 12) hour = 0;
                    return `${String(hour).padStart(2, '0')}:${minute}`;
                }
                return ''; 
            })();

            reset({
                name: event.name,
                imageSrc: event.imageSrc,
                category: event.category,
                description: event.description,
                date: normalizedDate,
                time: normalizedTime,
                venue: event.venuse,
                host: event.host,
                status: event.status,
            });

            setTickets(event.tickets || []);
            setAttendees(event.attendees || []);
        }
    }, [event, reset]);


    const handleAddTicket = () => {
        if (ticketInput.type && ticketInput.price) {
            const newTicket = {
                id: Date.now(),
                ...ticketInput,
            };
            setTickets([...tickets, newTicket]);
            setTicketInput({ type: '', price: '', status: 'Available' });
        }
    };

    const handleAddAttendee = () => {
        if (attendeeInput.trim()) {
            const newAttendee = {
                id: Date.now(),
                name: attendeeInput,
            };
            setAttendees([...attendees, newAttendee]);
            setAttendeeInput('');
        }
    };

    const handleFormSubmit = async (data) => {
        const updatedEvent = {
            ...event,
            ...data,
            date: data.date?.split('-').reverse().join('-'), 
            venuse: data.venue,
            tickets,
            attendees,
        };
        const response=await axios.put(`/api/events/manage/${event?.id}`, updatedEvent);
        dispatch(updateEvent(response));
        reset();
        onClose();

    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur min-w-1/2">
            <div className="relative bg-[#222323] rounded-lg p-6 w-full max-w-md text-black shadow-lg overflow-y-auto max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-white hover:text-red-400 text-xl font-bold"
                    aria-label="Close"
                >
                    &times;
                </button>
                <h2 className="text-xl font-semibold mb-4 text-white">Edit Event</h2>

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    {console.log(event)
                    }
                    <div className="space-y-4">
                        <InputField label="Event Name" id="name" register={register} error={errors.name} />
                        <InputField label="Image URL" id="imageSrc" register={register} error={errors.imageSrc} />
                        <InputField label="Category" id="category" register={register} error={errors.category} />
                        <TextareaField label="Description" id="description" register={register} error={errors.description} />
                        <InputField label="Date" id="date" type="date" register={register} error={errors.date} />
                        <InputField label="Time" id="time" type="time" register={register} error={errors.time} />
                        <InputField label="Venue" id="venue" register={register} error={errors.venue} />
                        <InputField label="Host" id="host" register={register} error={errors.host} />

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
                                <InputField label="Type" id="ticketType" value={ticketInput.type} onChange={e => setTicketInput({ ...ticketInput, type: e.target.value })} />
                                <InputField label="Price" id="ticketPrice" value={ticketInput.price} onChange={e => setTicketInput({ ...ticketInput, price: e.target.value })} />
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-1">Status</label>
                                    <div
                                        onClick={() => setTicketInput({
                                            ...ticketInput,
                                            status: ticketInput.status === 'Available' ? 'Sold Out' : 'Available',
                                        })}
                                        className={`w-14 h-7 flex items-center bg-gray-400 rounded-full p-1 cursor-pointer transition-colors ${ticketInput.status === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}
                                    >
                                        <div
                                            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${ticketInput.status === 'Available' ? 'translate-x-7' : ''}`}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-300 mt-1 block">{ticketInput.status}</span>
                                </div>
                            </div>
                            <button type="button" onClick={handleAddTicket} className="flex items-center gap-1 text-blue-400 hover:text-blue-300 underline text-sm font-medium transition">
                                <Plus className="w-4 h-4" /> Add
                            </button>
                            <ul className="mt-3 text-sm text-gray-300 space-y-1">
                                {tickets.map(ticket => (
                                    <li key={ticket.id} className="flex justify-between items-center">
                                        🎟️ {ticket.type} - {ticket.price} ({ticket.status})
                                        <button
                                            type="button"
                                            onClick={() => setTickets(prev => prev.filter(t => t.id !== ticket.id))}
                                            className="text-red-400 hover:text-red-300 ml-2"
                                            title="Remove"
                                        >
                                            🗑️
                                        </button>
                                    </li>
                                ))}
                            </ul>
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
                                        className="mt-1 block w-full px-3 py-2 border border-gray-400 text-gray-400 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] placeholder-gray-400"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAddAttendee}
                                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 underline text-sm font-medium transition"
                                >
                                    <Plus className="w-4 h-4" /> Add
                                </button>
                            </div>
                            <ul className="text-sm text-gray-300 space-y-1">
                                {attendees.map(att => (
                                    <li key={att.id} className="flex justify-between items-center">
                                        👤 {att.name}
                                        <button
                                            type="button"
                                            onClick={() => setAttendees(prev => prev.filter(a => a.id !== att.id))}
                                            className="text-red-400 hover:text-red-300 ml-2"
                                            title="Remove"
                                        >
                                            🗑️
                                        </button>
                                    </li>
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
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

function InputField({ label, id, register, error, type = 'text', value, onChange }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-300">{label}</label>
            <input
                type={type}
                id={id}
                {...(register ? register(id, { required: `${label} is required` }) : {})}
                value={register ? undefined : value}
                onChange={register ? undefined : onChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-300"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
        </div>
    );
}

function TextareaField({ label, id, register, error }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-300">{label}</label>
            <textarea
                id={id}
                {...register(id, { required: `${label} is required` })}
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-300 placeholder:text-gray-500"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
        </div>
    );
}
