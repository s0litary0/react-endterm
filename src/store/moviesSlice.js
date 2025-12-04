import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { MoviesService } from '../services/MoviesService'


export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ limit, search, page }, { rejectWithValue }) => {
    try {
      const movies = await MoviesService.getMovies(limit, search, page)
      return {movies, page}
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async ({ movieId }, { rejectWithValue }) => {
    try {
      console.log(movieId)
      const movie = await MoviesService.getMovieById(movieId) 
      return movie
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const initialState = {
  movies: [],
  selectedMovie: null,
  page: 1,
  loading: true,
  error: null,
}

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false
        state.movies = action.payload.movies
        state.page = action.payload.page
        state.error = null
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.movies = []
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.selectedMovie = action.payload
        state.error = null
        state.loading = false
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.selectedMovie = []
        state.error = action.payload
        state.loading = false
      })
  }
})


export default moviesSlice.reducer