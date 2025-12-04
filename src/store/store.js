import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './moviesSlice'
import authReducer from './authSlice'
import favouritesReducer from "./favouritesSlice"


export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
    favourites: favouritesReducer,
  },
  middleware: (getDefault) => 
    getDefault({
      serializableCheck: false
    }),
})