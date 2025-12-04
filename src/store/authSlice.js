import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { auth } from '../firebase/firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'


export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    return user
  }
)

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return user
  }
)

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async () => {
    return await signOut(auth)
  }
)

const initialState = {
  user: null,
  loggedIn: false,
  loading: true,
}


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload
      state.loggedIn = action.payload ? true : false
      state.loading = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.loggedIn = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.loggedIn = true

      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.loggedIn = false

      })
  }
})

export const { setCurrentUser } = authSlice.actions

export default authSlice.reducer
