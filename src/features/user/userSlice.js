import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  predefinedUsers: [
    {
      id: 24532,
      name: 'Sanjula Dilky',
      email: 'sanjuladilky@gmail.com',
      role: 'Admin',
      image: 'user_1.jpg',
    },
    {
      id: 47532,
      name: 'Test User',
      email: 'testuser@gmail.com',
      role: 'User',
      image: 'user_2.jpg',
    },
    {
      id: 58976,
      name: 'Test Admin',
      email: 'testadmin@gmail.com',
      role: 'Admin',
      image: 'user_3.jpg',
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