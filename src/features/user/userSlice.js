import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  predefinedUsers: [
    {
      name: 'Sanjula Dilky',
      email: 'sanjuladilky@gmail.com',
      role: 'Admin',
      image: 'user_1.jpg',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      image: 'jane.png',
    },
  ],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload))

    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    }
  }
});
export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;