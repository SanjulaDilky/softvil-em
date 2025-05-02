const STORAGE_KEY = "attendingEventsByUser";

export const getAllAttendingEvents = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

export const getUserAttendingEvents = (userId) => {
  const data = getAllAttendingEvents();
  return data[userId] || [];
};

export const addEventForUser = (userId, event) => {
  const data = getAllAttendingEvents();
  if (!data[userId]) data[userId] = [];

  const exists = data[userId].some(e => e.id === event.id);
  if (!exists) {
    data[userId].push(event);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

export const removeEventForUser = (userId, eventId) => {
  const data = getAllAttendingEvents();
  if (data[userId]) {
    data[userId] = data[userId].filter(e => e.id !== eventId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};
