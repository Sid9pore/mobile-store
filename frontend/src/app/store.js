import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
export const store = configureStore({ reducer: { auth: authReducer } });
```

### 🎡 `/frontend/src/features/authSlice.js`
```js
import { createSlice } from '@reduxjs/toolkit';
const initialState = { token: localStorage.getItem('token'), role: localStorage.getItem('role') };
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.role = action.payload.role;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role);
    },
    logout(state) {
      state.token = null;
      state.role = null;
      localStorage.clear();
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
