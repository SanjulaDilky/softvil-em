import { http, HttpResponse } from 'msw';
import { addEventForUser, getAllAttendingEvents, getUserAttendingEvents, removeEventForUser } from '../utils/userAttendingStorage';
import { loadEvents, saveEvents } from '../utils/eventsStorage';


export const handlers = [
    //events APIs
    http.get('/api/events/upcoming', () => {
        const events = loadEvents();
        const upcoming = events.filter(event => event.status === 'upcoming');
        return HttpResponse.json(upcoming);
    }),

    http.get('/api/events/all', () => {
        return HttpResponse.json(loadEvents());
    }),

    http.get('/api/events/:eventId', ({ params }) => {
        const { eventId } = params;
        const events = loadEvents();
        const found = events.find(e => String(e.id) === eventId);
        return found
            ? HttpResponse.json(found)
            : HttpResponse.json({ message: 'Not found' }, { status: 404 });
    }),

    http.post('/api/events', async ({ request }) => {
        const newEvent = await request.json();
        const events = loadEvents();
        events.push(newEvent);
        saveEvents(events);
        return HttpResponse.json(newEvent, { status: 201 });
    }),

    http.put('/api/events/manage/:id', async ({ request, params }) => {
        const updatedEvent = await request.json();
        const events = loadEvents();
        const index = events.findIndex(event => event.id === Number(params.id));

        if (index === -1) {
            return new Response('Event not found', { status: 404 });
        }

        events[index] = { ...events[index], ...updatedEvent };
        saveEvents(events);

        return HttpResponse.json(events[index]);
    }),

    //hosts APIs
    http.get('/api/upcoming-events/hosts', () => {
        const events = loadEvents();
        const upcoming = events.filter(event => event.status === 'upcoming');

        const hosts = [...new Set(upcoming.map(event => event.host))];

        return HttpResponse.json(hosts);
    }),

    //user attending events APIs
    http.get("/api/user/all-events", () => {
        const data = Object.values(getAllAttendingEvents()).flat();
        return HttpResponse.json(data);
      }),
      
    http.get("/api/user/:userId/events", ({ params }) => {
        const { userId } = params;
        const events = getUserAttendingEvents(userId);
        return HttpResponse.json(events);
    }),

    http.post("/api/user/:userId/events", async ({ request, params }) => {
        const { userId } = params;
        const event = await request.json(); 
        addEventForUser(userId, event);
        return HttpResponse.json({ success: true });
    }),

    http.delete("/api/user/:userId/events/:eventId", ({ params }) => {
        const { userId, eventId } = params;
        removeEventForUser(userId, parseInt(eventId));
        return HttpResponse.json({ success: true });
    }),
];
