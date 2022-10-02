import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import postReducer from './features/postSlice'
const store = configureStore({
  reducer: {
    posts:postReducer,
    auth:authReducer
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store