
# 🎉 Event-Media (Event Manager)

**Developed by Sanjula Biyanwila**

Event-Media is a simple and clean event management admin panel built using **React.js + Vite**. It allows users to log in, manage events, and track their attendance in a user-friendly interface.

---

## 🚀 Features

- 🔐 Login system with admin and user roles
- 📅 Upcoming event view with filters (host & date)
- 📝 Add/Edit/Delete/View events
- 👤 User profile with event attendance tracking
- ⚙️ State management using Redux
- 🧪 Mock backend using MSW (Mock Service Worker)

---

## ⚙️ Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/SanjulaDilky/softvil-em.git
   cd event-media
   ```

2. **Open the project in VS Code**  
   *(or any preferred IDE)*

3. **Install dependencies**  
   ```bash
   npm install
   ```

4. **Start the development server**  
   ```bash
   npm run dev
   ```
---

## 🔑 Login Credentials

Use one of the following predefined emails to log in:

### Admin Access
- `sanjuladilky@gmail.com`
- `testadmin@gmail.com`

### User Access
- `testuser@gmail.com`

> No password is required. Login is based on predefined users stored in Redux.

---

## 🧠 How It Works

### User Authentication
- Users are predefined in the Redux state.
- On login, the selected user is saved to `localStorage` for session persistence.

### Events
- Three sample events are predefined and stored in `localStorage`.
- Events are managed through a mocked API using **MSW**.

### Dashboard
- Shows **upcoming events**.
- Events can be filtered by **host** and **event date**.
- Clicking on an event card displays full event details.

### Event Management
- Admins can **view**, **add**, **edit**, and **delete** events.
- All event operations are performed through Redux and MSW API mocks.

### Profile
- Users can:
  - View their personal information.
  - See the list of events they’re attending.
  - Add more events to their attendee list.

---

## 🎨 Styling

- **Login** and **navigation components** are styled using **pure CSS**.
- All other components are styled using **Tailwind CSS** for modern utility-based design.

---

## 📦 Tech Stack

- **React 18+**
- **Vite**
- **Redux Toolkit**
- **React Router DOM**
- **Tailwind CSS**
- **Mock Service Worker (MSW)**

---

## ✅ License

This project is for educational and demonstration purposes.

