import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import todoReducer from '../features/todo/todoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    todos: todoReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;