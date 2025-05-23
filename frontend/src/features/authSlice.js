// features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminId: null,
  token: null,// { id, email, role, token, ... }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      //const { id, role, token } = action.payload;
      // Save only if the user is admin
      if (action.payload.role === 'admin') {
        state.token=action.payload.token;
        state.adminId = action.payload.id;
        console.log(action);
        sessionStorage.setItem('adminId', action.payload.id);
        sessionStorage.setItem('token', action.payload.token);// Persist adminId
      }
    },
    logout: (state) => {
      state.adminId = null;
      state.token=null;
      sessionStorage.removeItem('adminId');
    },
  },
});


export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
