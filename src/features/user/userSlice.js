import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utilities'
import { toast } from 'react-toastify'
import {
  loginThunk,
  registerUserThunk,
  updateUserThunk,
  clearStoreThunk,
} from './userThunk'

var initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
}

export var clearStore = createAsyncThunk(
  'user/clearStore',
  (message, thunkAPI) => clearStoreThunk(message, thunkAPI)
)

export var registerUser = createAsyncThunk(
  'user/registerUser',
  (user, thunkAPI) => {
    return registerUserThunk('/auth/register', user, thunkAPI)
  }
)
export var loginUser = createAsyncThunk('user/loginUser', (user, thunkAPI) => {
  return loginThunk('/auth/login', user, thunkAPI)
})
export var updateUser = createAsyncThunk(
  'user/updateUser',
  (user, thunkAPI) => {
    return updateUserThunk('/auth/updateUser', user, thunkAPI)
  }
)

var userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    logoutUser: (state, action) => {
      state.user = null
      state.isSidebarOpen = false
      removeUserFromLocalStorage()
      if (action) {
        toast.success(action.payload)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        var user = action.payload.user
        state.user = user
        addUserToLocalStorage(user)
        toast.success(`Hello There ${user.name}`)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload)
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        var user = action.payload.user
        state.user = user
        addUserToLocalStorage(user)
        toast.success(`Welcome Back ${user.name}`)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload)
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        var user = action.payload.user
        state.user = user
        addUserToLocalStorage(user)
        toast.success(`data updated successfully`)
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload)
      })
      .addCase(clearStore.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload)
      })
  },
})

export var { toggleSidebar, logoutUser } = userSlice.actions

export default userSlice.reducer
