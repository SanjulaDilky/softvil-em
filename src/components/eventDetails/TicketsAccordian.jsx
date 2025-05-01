import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const TicketAccordion = ({ tickets }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mx-auto mt-6 bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between bg-gray-700 text-white font-medium text-sm hover:bg-gray-600 transition"
      >
        <span>View Ticket Prices</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="divide-y divide-gray-700 bg-[#333636]">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="px-4 py-3 flex items-center justify-between text-sm text-gray-200"
            >
              <div className="flex flex-col">
                <span className="font-semibold">{ticket.type}</span>
                <span className="text-xs text-gray-400">{ticket.status}</span>
              </div>
              <span
                className={`font-bold ${
                  ticket.status === 'Sold Out' ? 'text-red-400' : 'text-green-400'
                }`}
              >
                {ticket.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
