// features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // { id, email, role, token, ... }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      // Save only if the user is admin
      if (action.payload.role === 'admin') {
        state.adminId = action.payload.id;
        console.log(action);
        sessionStorage.setItem('adminId', action.payload.id); // Persist adminId
      }
    },
    logout: (state) => {
      state.adminId = null;
      sessionStorage.removeItem('adminId');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
