
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addEvent } from '../../features/events/allEventsSlice';

function AddEventModal({ isOpen, onClose }) {
    const dispatch = useDispatch(); 

    const { register, handleSubmit, formState: { errors } } = useForm();
    if (!isOpen) return null;

    const onSubmit = (data) => {
        // Dispatching the event data to the Redux store
        dispatch(addEvent(data));

        // Close the modal after submission
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md text-black shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Add New Event</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        {/* Event Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Event Name</label>
                            <input
                                type="text"
                                id="name"
                                {...register('name', { required: 'Event name is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Event Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                            <input
                                type="text"
                                id="category"
                                {...register('category', { required: 'Category is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                        </div>

                        {/* Event Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                id="description"
                                {...register('description', { required: 'Description is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                        </div>

                        {/* Event Date */}
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                id="date"
                                {...register('date', { required: 'Date is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                        </div>

                        {/* Event Time */}
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                            <input
                                type="time"
                                id="time"
                                {...register('time', { required: 'Time is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                        </div>

                        {/* Event Venue */}
                        <div>
                            <label htmlFor="venue" className="block text-sm font-medium text-gray-700">Venue</label>
                            <input
                                type="text"
                                id="venue"
                                {...register('venue', { required: 'Venue is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            {errors.venue && <p className="text-red-500 text-xs mt-1">{errors.venue.message}</p>}
                        </div>

                        {/* Event Status */}
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                id="status"
                                {...register('status', { required: 'Status is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                                <option value="upcoming">Upcoming</option>
                                <option value="completed">Completed</option>
                            </select>
                            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
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
