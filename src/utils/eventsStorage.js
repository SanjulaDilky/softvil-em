const STORAGE_KEY = 'mock_events';

export const loadEvents = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultEvents;
};

export const saveEvents = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};


const defaultEvents = [
    {
        id: 1674,
        name: 'Timeless Classics',
        category: 'Musical',
        description: 'Sri Lankan Evergreens Concerts',
        href: '#',
        attendees: [{ id: 1, name: 'Chandimal Fernando' }],
        host: 'Kelum Srimal',
        imageSrc: '/events/timeless-classic.jpeg',
        imageAlt: 'Timeless Classics',
        date: '04-05-2025',
        time: '07.00 PM',
        venuse: 'Bishops College Auditorium',
        status: 'upcoming',
        tickets: [
            { id: 1, type: 'Gold', price: '2500 LKR', status: 'Sold Out' },
            { id: 2, type: 'Platinum', price: '5000 LKR', status: 'Available' },
        ]
    },
    {
        id: 2234,
        name: 'Ahasin Eha - අහසින් එහා ',
        category: 'Musical',
        description: 'Get ready for an unforgettable evening...',
        href: '#',
        attendees: [
            { id: 1, name: 'Suneera Sumanga' },
            { id: 2, name: 'Danith Sri' },
            { id: 3, name: 'Sashika Nisansala' },
            { id: 4, name: 'Kasun Kalhara' },
        ],
        host: 'Kelum Srimal',
        imageSrc: '/events/ahasin-eha.jfif',
        imageAlt: 'Timeless Classics',
        date: '2025-06-07',
        time: '07.00 PM',
        venuse: 'BBMICH - COLOMBO',
        status: 'upcoming',
        tickets: [
            { id: 1, type: 'Gold', price: '3500 LKR', status: 'Sold Out' },
            { id: 2, type: 'Platinum', price: '5000 LKR', status: 'Available' },
        ]
    },
    {
        id: 3155,
        name: 'Naadhagama 360°',
        category: 'Musical',
        description: 'සිත් සනසන...',
        href: '#',
        attendees: [
            { id: 1, name: 'Ridma Weerawardhana' },
            { id: 2, name: 'Danith Sri' },
            { id: 3, name: 'Supun Perera' },
            { id: 4, name: 'Dinesh Gamage' },
            { id: 5, name: 'Kanchana Anuradhi' },
        ],
        host: 'manuranga wijesekara',
        imageSrc: '/events/naadha-gama.png',
        imageAlt: 'Timeless Classics',
        date: '2025-06-14',
        time: '06.00 PM',
        venuse: 'Sugathadasa Indoor Stadium',
        status: 'upcoming',
        tickets: [
            { id: 1, type: 'Platinum', price: '6500 LKR', status: 'Sold Out' },
        ]
    },
    {
        id: 3542,
        name: 'Boyce Avenue Live in Sri Lanka',
        category: 'Musical',
        description: 'Boyce Avenue live!',
        href: '#',
        attendees: [
            { id: 1, name: 'Boyce Avenue' },
        ],
        host: 'Clifford Richards',
        imageSrc: '/events/naadha-gama.png',
        imageAlt: 'Boyce Avenue Live in Sri Lanka',
        date: '2025-04-14',
        time: '07.00 PM',
        venuse: 'The Hilton Colombo',
        status: 'completed',
        tickets: [
            { id: 1, type: 'Gold', price: '2500 LKR', status: 'Sold Out' },
            { id: 2, type: 'Platinum', price: '5000 LKR', status: 'Sold Out' },
        ]
    },
];
