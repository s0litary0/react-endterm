import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { MoviesService } from "../services/MoviesService"


const initialState = {
  favourites: [],
  favouriteMovies: [],
  loading: true,
}

export const fetchFavouritesByIds = createAsyncThunk(
  "favourites/fetchFavouritesByIds",
  async (ids) => {
    const responses = await Promise.all(ids.map((id) => MoviesService.getMovieById(id)))
    return responses
  }
)

const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    setFavourites: (state, action) => {
      state.favourites = action.payload
    },
    addFavourite: (state, action) => {
      state.favourites.push(action.payload)
    },
    removeFavourite: (state, action) => {
      state.favourites = state.favourites.filter((id) => id !== action.payload)
    },
    clearFavourites: (state) => {
      state.favourites = []
    }
  }, 
  extraReducers: (builder) => {
    builder
    .addCase(fetchFavouritesByIds.pending, (state) => {
      state.loading = true
    })
    .addCase(fetchFavouritesByIds.fulfilled, (state, action) => {
      state.favouriteMovies = action.payload
      state.loading = false
    })
  }
})


export const { setFavourites, addFavourite, removeFavourite, clearFavourites } = favouriteSlice.actions
export default favouriteSlice.reducer