import { CalendarDaysIcon, ClockIcon } from "lucide-react";
import { formattedDate } from "../utils/dateFormatter";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
    return (

        <Link to={`/events/${event.id}`} key={event.id}>
            <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg transition hover:scale-105">
                    <img alt={event.imageAlt} src={event.imageSrc} className="size-full object-cover" />
                </div>
                <div className="relative mt-4 space-y-2">
                    <h3 className="text-sm font-medium text-white">{event.name}</h3>

                    <div className="flex align-middle justify-between">

                        <div className="flex items-center text-gray-400 text-sm">
                            <CalendarDaysIcon className="w-4 h-4 mr-2 text-gray-400" />
                            <span>
                                {formattedDate(event.date)}
                            </span>
                        </div>

                        <div className="flex items-center text-gray-400 text-sm">
                            <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{event.time}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    )
}
